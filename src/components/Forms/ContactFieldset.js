import { useEffect, useState } from "react";
import styles from "./ContactFieldset.module.css";

const ContactFieldset = props => {
    const {
        contact, 
        emails, 
        setEmails, 
        titles,
        contactTypes, 
        contacts, 
        setContacts,
        vendor,
        phoneNumbers,
        setPhoneNumbers,
        phoneToNumber,
        numberToPhone,
        phoneUpdates,
        setPhoneUpdates
    } = props;
    const [firstName, setFirstName] = useState(contact.firstName);
    const [middleName, setMiddleName] = useState(contact.middleName);
    const [lastName, setLastName] = useState(contact.lastName);
    const [contactTypeId, setContactTypeId] = useState(contact.contactTypeId);
    const [personalTitle, setPersonalTitle] = useState(contact.personalTitle);
    const [contactEmails, setContactEmails] = useState([]);
    const [contactPhoneNumbers, setContactPhoneNumbers] = useState([]);
    const [contactTypeOptions, setContactTypeOptions] = useState([]);

    const phoneTypes = [
        {id: 1, name: "Cell"},
        {id: 2, name: "Home"},
        {id: 3, name: "Work"}
    ];

    const findTypeName = typeId => {
        let typeIndex = phoneTypes.findIndex(typeObj => {
            return typeObj.id === typeId;
        });

        return phoneTypes[typeIndex].name;
    };

    // creates the options for the contact type select in the fieldset
    useEffect(() => {
        setContactTypeOptions(contactTypes.map(contactType => {
            return <option value={contactType.contactTypeId} key={contactType.contactTypeId}>{contactType.contactTypeName}</option>;
        }));
    }, [contactTypes]);

    useEffect(() => {
        setContactEmails(emails.filter(email => {
            return email.businessEntityId === contact.personId;
        }));
    }, [emails, contact]);

    useEffect(() => {
        setContactPhoneNumbers(phoneNumbers.filter(phoneNumber => {
            return phoneNumber.businessEntityId === contact.personId;
        }));
    }, [phoneNumbers, contact]);

    // Contacts are saved as an object.
    // This effect handles the logic for changes to the contact object.
    useEffect(() => {
        let tempContacts = [...contacts];
        let updateContactIndex = tempContacts.findIndex(tempContact => {
            return tempContact.personId === contact.personId;
        });

        tempContacts[updateContactIndex] = {
            businessEntityId: vendor.businessEntityId,
            personId: contact.personId,
            personalTitle: personalTitle,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            suffix: null,
            contactTypeId: contactTypeId
        };
        setContacts(tempContacts);
    }, [personalTitle, firstName, middleName, lastName, contactTypeId]);


    const handleEmailChange = (evt, id) => {
        // emails are stored in a temporary value until change can be applied
        let tempEmailAddresses = [...emails];
        let updateEmailAdressIndex = tempEmailAddresses.findIndex(email => {
            return email.emailAddressId === id;
        });
        tempEmailAddresses[updateEmailAdressIndex] = {
            businessEntityId: contact.personId,
            emailAddressId: id,
            emailAddress: evt.target.value
        };
        setEmails(tempEmailAddresses);
    };

    // This breaks if the contact has more than one phone type; however, no entries have been found with multiple types
    const handlePhoneTypeChange = (evt, originalTypeId) => {
        let tempPhoneNumbers = [...phoneNumbers];

        let updatePhoneNumberIndex = tempPhoneNumbers.findIndex(phoneNumber => {
            return phoneNumber.businessEntityId === contact.personId && phoneNumber.phoneNumberTypeId === originalTypeId;
        });

        tempPhoneNumbers[updatePhoneNumberIndex] = {
            businessEntityId: contact.personId,
            phoneNumber: phoneNumbers[updatePhoneNumberIndex].phoneNumber,
            phoneNumberTypeId: evt.target.value,
            phoneNumberTypeName: findTypeName(evt.target.value)
        };
        setPhoneNumbers(tempPhoneNumbers);
    };

    const handlePhoneChange = (evt, originalTypeId) => {
        // phone numbers are stored in a temporary value until change can be applied
        let tempPhoneNumbers = [...phoneNumbers];


        let updatePhoneNumberIndex = tempPhoneNumbers.findIndex(phoneNumber => {
            return phoneNumber.businessEntityId === contact.personId && phoneNumber.phoneNumberTypeId === originalTypeId;
        });

        tempPhoneNumbers[updatePhoneNumberIndex] = {
            businessEntityId: contact.personId,
            phoneNumber: evt.target.value,
            phoneNumberTypeId: phoneNumbers[updatePhoneNumberIndex].phoneNumberTypeId,
            phoneNumberTypeName: phoneNumbers[updatePhoneNumberIndex].phoneNumberTypeName
        };
        setPhoneNumbers(tempPhoneNumbers);
    };

    return (
        <fieldset key={contact.personId}>
            {/* Mr. / Mrs. / Ms. */}
            <select value={contact.personalTitle} onChange={evt => setPersonalTitle(evt.target.value)}>
                {titles.map(title => {
                    return <option value={title.name} key={title.id}>{title.name}</option>
                })}
            </select>

            {/* First name */}
            <input type="text" defaultValue={contact.firstName} onChange={evt => setFirstName(evt.target.value)} className={styles.formInput}/>

            {/* Middle name */}
            <input type="text" defaultValue={contact.middleName} onChange={evt => setMiddleName(evt.target.value)} className={styles.formInput} />

            {/* Last Name */}
            <input type="text" defaultValue={contact.lastName} onChange={evt => setLastName(evt.target.value)} className={styles.formInput} />

            {/* Job Title */}
            <select value={contact.contactTypeId} onChange={evt => setContactTypeId(evt.target.value)} className={styles.formInput}>{contactTypeOptions}</select>

            {/* Phone numbers */}
            {contactPhoneNumbers.map(phoneEntry => {
                let phoneKey = `${phoneEntry.businessEntityId}-${phoneEntry.phoneNumberTypeId}`;

                return (
                    <fieldset key={phoneKey}>
                        <select 
                            value={phoneEntry.phoneNumberTypeId} 
                            onChange={evt => handlePhoneTypeChange(evt, phoneEntry.phoneNumberTypeId)}
                            className={styles.formInput}
                        >
                            <option value={1} key={1}>Cell</option>
                            <option value={2} key={2}>Home</option>
                            <option value={3} key={3}>Work</option>
                        </select>
                        <input 
                            type="text"
                            defaultValue={phoneEntry.phoneNumber}
                            key={phoneEntry.phoneNumberTypeId}
                            onChange={evt => handlePhoneChange(evt, phoneEntry.phoneNumberTypeId)}
                            className={styles.formInput}
                        />
                    </fieldset>

                );
            })}

            {contactEmails.map(emailEntry => {
                return (
                    <input 
                        type="text" 
                        defaultValue={emailEntry.emailAddress} 
                        key={emailEntry.emailAddressId} 
                        onChange={evt => handleEmailChange(evt, emailEntry.emailAddressId)} 
                        className={styles.formInput}
                    />
                );
            })}
        </fieldset>
    );
};

export default ContactFieldset;