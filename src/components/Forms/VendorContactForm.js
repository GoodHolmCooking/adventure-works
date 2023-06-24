import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadContactTypesAsync, updateContactAsync, updateEmailAsync } from "../../store/slices/vendorSlice";
import ContactFieldset from "./ContactFieldset";
import { updateVendorAsync } from "../../store/slices/vendorSlice";
import styles from "./VendorContactForm.module.css";

const VendorContactForm = props => {
    const {vendor, toggleEditView, contacts, setContacts, emails, setEmails} = props;
    const {contactTypes} = useSelector(state => state.vendors);
    // const [phoneNumbers, setPhoneNumbers] = useState([]);

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
    const phoneTypes = [
        {name: "Cell", id: 1},
        {name: "Home", id: 2},
        {name: "Work", id: 3}
    ];

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
                        vendor={vendor}
                        // phoneTypes={phoneTypes}
                        // phoneToNumber={phoneToNumber}
                        // numberToPhone={numberToPhone}
                        // phoneNumbers={phoneNumbers}
                        // setPhoneNumbers={setPhoneNumbers} 
                   />
                );
            })}
            <input type="submit" className={styles.saveBtn} />
        </form>
    );
};

export default VendorContactForm;