import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadContactTypesAsync, updateContactAsync, updateEmailAsync } from "../../store/slices/storeSlice";
import StoreContact from "./StoreContact";
import { updateStoreAsync } from "../../store/slices/storeSlice";
import styles from "./StoreContactForm.module.css";

const StoreContactForm = props => {
    const {store, toggleEditView, contacts, setContacts, emails, setEmails} = props;

    const dispatch = useDispatch();


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
                storeId: store.storeEntityId
            }
            dispatch(updateContactAsync(contactData));
        });

        // update email addresses
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
                   <StoreContact
                        key={contact.personId}
                        contact={contact}
                        titles={titles}
                        contacts={contacts}
                        setContacts={setContacts}
                        emails={emails}
                        setEmails={setEmails}
                        store={store}
                   />
                );
            })}
            <input type="submit" className={styles.saveBtn} />
        </form>
    );
};

export default StoreContactForm;