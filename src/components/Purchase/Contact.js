import { useEffect, useState } from "react";
import styles from "./Contact.module.css";

const Contact = props => {
    const {contact, emails} = props;
    const [contactEmails, setContactEmails] = useState([]);

    useEffect(() => {
        setContactEmails(emails.filter(email => {
            return email.businessEntityId === contact.personId;
        }));
    }, [contact, emails]);

    return (
    <li className={styles.contentBlock} key={contact.personId}>
        <p>{contact.personalTitle} {contact.firstName} {contact.middleName} {contact.lastName}</p>
        <p>{contact.typeName}</p>
        {/* <ul>
            {props.phoneNumbers.map(phoneNumber => {
                return (<li key={phoneNumber.phoneNumberTypeId}>{phoneNumber.phoneNumberTypeName}: {phoneNumber.phoneNumber}</li>);
            })}
        </ul> */}

        <ul>
            {contactEmails.map(email => {
                return (<li key={email.emailAddressId}>Email: {email.emailAddress}</li>);
            })}
        </ul>
    </li>
    );
};

export default Contact;