import styles from "./Contact.module.css";

const Contact = props => {
    return (
    <li className={styles.contentBlock} key={props.personId}>
        <p>{props.personalTitle} {props.firstName} {props.middleName} {props.lastName}</p>
        <p>{props.typeName}</p>
        <ul>
        {props.phoneNumbers.map(phoneNumber => {
            return (<li key={phoneNumber.phoneNumberTypeId}>{phoneNumber.phoneNumberTypeName}: {phoneNumber.phoneNumber}</li>);
        })}
        </ul>

        <ul>
        {props.emailAddresses.map(email => {
            return (<li key={email.emailAddressId}>Email: {email.emailAddress}</li>);
        })}
        </ul>
    </li>
    );
};

export default Contact;