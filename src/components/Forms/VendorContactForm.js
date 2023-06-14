import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadContactTypesAsync } from "../../store/slices/vendorSlice";
import ContactFieldset from "./ContactFieldset";
import { updateVendorAsync } from "../../store/slices/vendorSlice";

function phoneToNumber(phone) {
	// 859-555-0100
    if (typeof phone == "string") {
        let area = phone.substring(0, 3);
        let firstSet = phone.substring(4, 7);
        let secondSet = phone.substring(8);
        let combinedNumber = area + firstSet + secondSet;
    
        return +combinedNumber;
    }
    else {
        return phone;
    }
};

function numberToPhone(providedNumber) {
	// 8595550100
	let convertedString = providedNumber.toString();
    if (convertedString.length === 10) {
        let area = convertedString.substring(0, 3);
        let firstSet = convertedString.substring(3, 6);
        let secondSet = convertedString.substring(6);
        let phone = area + "-" + firstSet + "-" + secondSet;
        return phone;
    }
    else {
        return;
    }
}

const VendorContactFormRedo = props => {
    const {vendor, contacts, toggleEditView} = props;
    const {contactTypes} = useSelector(state => state.vendors);
    const [updatedContacts, setUpdatedContacts] = useState(contacts);
    const [saving, setSaving] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!contactTypes.length) {
            dispatch(loadContactTypesAsync);
        }
    }, [contactTypes, dispatch]);

    const titles = [
        {name: "Mr.", id: 1},
        {name: "Mrs.", id: 2},
        {name: "Ms.", id: 3}
    ];
    const phoneTypes = [
        {name: "Cell", id: 1},
        {name: "Home", id: 2},
        {name: "Work", id: 3}
    ];

    const handleInputChanges = evt => {
        evt.preventDefault();

        setSaving(true);

        let data = {
            ...vendor,
			contacts: contacts
		};

        // update the database
		dispatch(updateVendorAsync(data));

		// exit the editing UI
		toggleEditView();
    }

    return (
        <form onSubmit={handleInputChanges}>
            {contacts.map(contact => {
                return (
                   <ContactFieldset 
                        contact={contact}
                        phoneTypes={phoneTypes}
                        titles={titles}
                        phoneToNumber={phoneToNumber}
                        numberToPhone={numberToPhone}
                        contactTypes={contactTypes}
                        saving={saving}
                        updatedContacts={updatedContacts}
                        setUpdatedContacts={setUpdatedContacts}
                   />
                );
            })}
            <input type="submit" />
        </form>
    );
};

export default VendorContactFormRedo;