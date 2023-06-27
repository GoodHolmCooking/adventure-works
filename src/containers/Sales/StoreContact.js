import { useEffect, useState } from "react";
import styles from "./StoreContact.module.css";

const StoreContact = props => {
    const {contact, emails, phoneNumbers} = props;
    const [contactPhoneNumbers, setContactPhoneNumbers] = useState([]);
    const [contactEmails, setContactEmails] = useState([]);

    useEffect(() => {
        setContactEmails(emails.filter(email => {
            return email.businessEntityId === contact.businessEntityId;
        }));
    }, [contact, emails]);

    useEffect(() => {
        setContactPhoneNumbers(phoneNumbers.filter(phoneNumber => {
            return phoneNumber.businessEntityId === contact.businessEntityId;
        }))
    }, [contact, phoneNumbers]);

    return (
        <li className={styles.contentBlock} key={contact.businessEntityId}>
            <p>{contact.personalTitle} {contact.firstName} {contact.middleName} {contact.lastName}</p>
            <p>{contact.typeName}</p>
            <ul>
                {contactPhoneNumbers.map(phoneNumber => {
                    return (<li key={phoneNumber.phoneNumberTypeId}>{phoneNumber.phoneNumberTypeName}: {phoneNumber.phoneNumber}</li>);
                })}
            </ul>

            <ul>
                {contactEmails.map(email => {
                    return (<li key={email.emailAddressId}>Email: {email.emailAddress}</li>);
                })}
            </ul>
        </li>
    );
};

export default StoreContact;