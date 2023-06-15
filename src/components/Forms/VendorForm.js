import { useState } from "react";
import formBuilder from "../../formBuilder";
import styles from "./VendorForm.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toggleNameEdit, updatePhoneAsync, updateVendorAsync } from "../../store/slices/vendorSlice";
import { useNavigate } from "react-router";

function phoneToNumber(phone) {
	// 859-555-0100 -> 8595550100
	let area = phone.substring(0, 3);
	let firstSet = phone.substring(4, 7);
	let secondSet = phone.substring(8);
	let combinedNumber = area + firstSet + secondSet;

	return +combinedNumber;
}

function numberToPhone(providedNumber) {
	// 8595550100 -> 859-555-0100
	let convertedString = providedNumber.toString();
	let area = convertedString.substring(0, 3);
	let firstSet = convertedString.substring(3, 6);
	let secondSet = convertedString.substring(6);
	let phone = area + "-" + firstSet + "-" + secondSet;
	return phone;
}

// kind, type, label, placeholder, validation = {}, value = ""
const VendorForm = props => {
	const {setVendor, vendor} = props;
	const name = vendor.vendorName;
	const contacts = vendor.contacts;
	// const phoneNumbers = contacts[0].phoneNumbers
	// const phone = phoneNumbers[0].phoneNumber;
	const id = vendor.businessEntityId;
	const dispatch = useDispatch();

	// 123 456 789(10)
    const form = {
        name: formBuilder.configInput("input", "text", "", "", {required: true}, name),
        // phone: formBuilder.configInput("input", "number", "", "", {required: true, exactLength: 10}, phoneToNumber(phone)),
    };

    const [formData, setFormData] = useState(form);
    const [error, setError] = useState(false);

    const handlePostData = evt => {
		console.log("Running handle post data.");
        evt.preventDefault();

		let hasError = false;

		// each element is a field. Check the validity of each form field.
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

		// updated vendor data
		let data = {
			vendorUpdate: {
				...vendor,
				vendorName: formData.name.value
			},
			callbacks: {
				setVendor: setVendor
			}
		};

		// update the database
		dispatch(updateVendorAsync(data));
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