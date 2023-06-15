import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadContactTypesAsync, updateContactAsync, updateEmailAsync } from "../../store/slices/vendorSlice";
import ContactFieldset from "./ContactFieldset";
import { updateVendorAsync } from "../../store/slices/vendorSlice";

function phoneToNumber(phone) {
	// phone should be a string field in a format of 859-555-0100
    if (typeof phone == "string") {
        let area = phone.substring(0, 3);
        let firstSet = phone.substring(4, 7);
        let secondSet = phone.substring(8);
        let combinedNumber = area + firstSet + secondSet;
    
        return +combinedNumber;
    }

    // the phone number is already in a number format, so send it back
    else {
        return phone;
    }
};

function numberToPhone(providedNumber) {
	// providedNumber should be a phone number without any additional characters such as 8595550100
	let convertedString = providedNumber.toString();

    // this function could be run every time a character is removed.
    // characters should only be added when the phone is a complete number.
    if (convertedString.length === 10) {
        let area = convertedString.substring(0, 3);
        let firstSet = convertedString.substring(3, 6);
        let secondSet = convertedString.substring(6);
        let phone = area + "-" + firstSet + "-" + secondSet;
        return phone;
    }

    // if the phone is not a complete number, just apply a conversion from a number to a string
    else {
        return convertedString;
    }
}

const VendorContactForm = props => {
    const {vendor, toggleEditView, contacts, setContacts, emails, setEmails} = props;
    const {contactTypes} = useSelector(state => state.vendors);
    // const [contacts, setContacts] = useState([]);
    // const [phoneNumbers, setPhoneNumbers] = useState([]);
    // const [emailAddresses, setEmailAddresses] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        // if there are no contact types loaded into the state, load them
        if (!contactTypes.length) {
            dispatch(loadContactTypesAsync());
        }
    }, [contactTypes, dispatch]);

    useEffect(() => {
        // if there are no contacts loaded into the state, load them
        if (!contacts.length) {
            setContacts(vendor.contacts.map(contact => {
                return {
                    businessEntityId: contact.businessEntityId,
                    personId: contact.businessEntityId,
                    personalTitle: contact.personalTitle,
                    firstName: contact.firstName,
                    middleName: contact.middleName,
                    lastName: contact.lastName,
                    suffix: contact.suffix,
                    contactTypeId: contact.contactTypeId
                }
            }));
        }
    }, []);

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

        // update contacts
        console.log("submitting contacts...")
        contacts.forEach(contact => {
            // dispatch(updateContactAsync(contact));
            console.log(contact);
        });

        // update phone numbers (Blocked until Drew fixes API)

        // update emaila addresses
        console.log("submitting emails...")
        emails.forEach(email => {
            dispatch(updateEmailAsync(email));
        });

		// exit the editing UI
		toggleEditView();
    }

    return (
        <form onSubmit={handleInputChanges}>
            {contacts.map(contact => {
                return (
                   <ContactFieldset 
                        key={contact.personId}
                        contact={contact}
                        titles={titles}
                        contactTypes={contactTypes}
                        contacts={contacts}
                        setContacts={setContacts}
                        emails={emails}
                        setEmails={setEmails}
                        // phoneTypes={phoneTypes}
                        // phoneToNumber={phoneToNumber}
                        // numberToPhone={numberToPhone}
                        // phoneNumbers={phoneNumbers}
                        // setPhoneNumbers={setPhoneNumbers} 
                   />
                );
            })}
            <input type="submit" />
        </form>
    );
};

export default VendorContactForm;