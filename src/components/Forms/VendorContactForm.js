

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadContactTypesAsync, updateContactAsync, updateEmailAsync, updatePhoneAsync } from "../../store/slices/vendorSlice";
import ContactFieldset from "./ContactFieldset";
import { updateVendorAsync } from "../../store/slices/vendorSlice";
import styles from "./VendorContactForm.module.css";

const VendorContactForm = props => {
    const {
        vendor, 
        toggleEditView, 
        contacts, 
        setContacts, 
        emails, 
        setEmails,
        phoneNumbers,
        setPhoneNumbers,
        originalPhoneNumbers,
        setOriginalPhoneNumbers,
        phoneToNumber,
        numberToPhone
    } = props;
    const {contactTypes} = useSelector(state => state.vendors);
    const [phoneUpdates, setPhoneUpdates] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        // if there are no contact types loaded into the state, load them
        if (!contactTypes.length) {
            dispatch(loadContactTypesAsync());
        }
    }, [contactTypes, dispatch]);

    const titles = [
        {name: "Mr.", id: 1},
        {name: "Mrs.", id: 2},
        {name: "Ms.", id: 3}
    ];

    // There is a fundamental flaw in the database. A phone number uses a composite key of contact + type.
    // The type can be changed. If this is the case, the original phone number can no longer be found.
    // We must go with the assumption that each contact only has one phone or this won't work at all.
    const getOriginalPhoneNumber = phoneObj => {
        let originalIndex = originalPhoneNumbers.findIndex(originalPhoneNumber => {
            return originalPhoneNumber.businessEntityId === phoneObj.businessEntityId;
        });

        return originalPhoneNumbers[originalIndex];
    };

    const handleInputChanges = evt => {
        evt.preventDefault();

        // update contacts
        contacts.forEach(contact => {
            let contactData = {
                contactInfo: contact,
                vendorId: vendor.businessEntityId
            }
            dispatch(updateContactAsync(contactData));
        });

        let formattedPhoneUpdates = phoneNumbers.map(phoneNumber => {
            let originalNumber = getOriginalPhoneNumber(phoneNumber);

            return {
                businessEntityId: phoneNumber.businessEntityId,
                newPhoneNumber: phoneNumber.phoneNumber,
                originalPhoneNumber: originalNumber.phoneNumberTypeId,
                newPhoneNumberTypeId: phoneNumber.phoneNumberTypeId,
                originalPhoneNumberTypeId: originalNumber.phoneNumberTypeId
            };
        });

        // update phone numbers
        formattedPhoneUpdates.forEach(phoneNumber => {
            dispatch(updatePhoneAsync(phoneNumber));
        })

        // update email addresses
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
                        vendor={vendor}
                        phoneToNumber={phoneToNumber}
                        numberToPhone={numberToPhone}
                        phoneNumbers={phoneNumbers}
                        setPhoneNumbers={setPhoneNumbers}
                        originalPhoneNumbers={originalPhoneNumbers}
                        setOriginalPhoneNumbers={setOriginalPhoneNumbers} 
                        phoneUpdates={phoneUpdates}
                        setPhoneUpdates={setPhoneUpdates}
                   />
                );
            })}
            <input type="submit" className={styles.saveBtn} />
        </form>
    );
};

export default VendorContactForm;