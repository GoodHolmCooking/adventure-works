import { useState } from "react";
import formBuilder from "../../formBuilder";
import styles from "./VendorForm.module.css";
import axios from "axios";

function phoneToNumber(combo) {
	// 859-555-0100
	let area = combo.substring(0, 3);
	let firstSet = combo.substring(4, 7);
	let secondSet = combo.substring(8);
	let combinedNumber = area + firstSet + secondSet;

	return +combinedNumber;
}

function numberToPhone(providedNumber) {
	// 8595550100
	let convertedString = providedNumber.toString();
	let area = convertedString.substring(0, 3);
	let firstSet = convertedString.substring(3, 6);
	let secondSet = convertedString.substring(6);
	let combo = area + "-" + firstSet + "-" + secondSet;
	return combo;
}

// kind, type, label, placeholder, validation = {}, value = ""
const VendorForm = props => {
    const vendor = props.vendor;
	const importedPhoneNumber = vendor.contacts[0].phoneNumbers[0].phoneNumber;

	// 123 456 789(10)
    const form = {
        name: formBuilder.configInput("input", "text", "Vendor Name", "", {required: true}, vendor.vendorName),
        phone: formBuilder.configInput("input", "number", "Phone Number", "", {required: true, exactLength: 10}, phoneToNumber(importedPhoneNumber)),
        id: formBuilder.configInput("input", "number", "Business Entity ID", "", {required: true}, vendor.businessEntityId)
    };

    const [formData, setFormData] = useState(form);
    const [error, setError] = useState(false);

    const handlePostData = evt => {
        evt.preventDefault();

		let hasError = false;

		for (let element in formData) {
			formBuilder.checkValidity(formData[element]);
			if (!formData[element].valid) {
				hasError = true;
			}
		}

		if (hasError) {
			alert('You must properly fill out the form.');
			setError(true);
			return;
		}

        let contacts = vendor.contacts;
        contacts[0].phoneNumbers[0].phoneNumber = numberToPhone(formData.phone.value);

		const data = {
            ...vendor,
			vendorName: formData.name.value,
			businessEntityId: formData.id.value,
            contacts: [...contacts]
		};

		console.log(data);

		// Need to implement a store to carry state between form and details
		axios.put(`https://api.bootcampcentral.com/api/Vendor/${data.businessEntityId}`, data, {crossDomain: true})
		.then(resp => {
			console.log(resp);
		});
	};

    const handleInputChanges = (evt, id) => {
		const updatedForm = {...formData};
		const updatedElement = {...updatedForm[id]};
		updatedElement.value = evt.target.value;
		formBuilder.checkValidity(updatedElement);
		updatedForm[id] = updatedElement;
		setFormData(updatedForm);
	}

    const formContent = formBuilder.buildForm(formData, handleInputChanges);

    return (
        <form onSubmit={handlePostData}>
            {formContent}
            <button>Save Changes</button>
        </form>
    );
};

export default VendorForm;