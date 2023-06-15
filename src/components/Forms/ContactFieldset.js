import { useEffect, useState } from "react";
import PhoneOption from "./PhoneOption";

const ContactFieldset = props => {
    const {
        contact, 
        emailAddresses, 
        setEmailAddresses, 
        titles, 
        phoneToNumber, 
        numberToPhone, 
        phoneNumbers,
        setPhoneNumbers,
        contactTypes, 
        contacts, 
        setContacts
    } = props;
    const [firstName, setFirstName] = useState(contact.firstName);
    const [middleName, setMiddleName] = useState(contact.middleName);
    const [lastName, setLastName] = useState(contact.lastName);
    const [contactTypeId, setContactTypeId] = useState(contact.contactTypeName);
    const [personalTitle, setPersonalTitle] = useState(contact.personalTitle);

    // Contacts are saved as an object.
    // This effect handles the logic for changes to the contact object.
    useEffect(() => {
        let tempContacts = [...contacts];
        let updateContactIndex = tempContacts.findIndex(tempContact => {
            return tempContact.personId === contact.personId;
        });

        tempContacts[updateContactIndex] = {
            ...contact,
            personalTitle: personalTitle,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            suffix: null,
            contactTypeId: contactTypeId
        };
        setContacts(tempContacts);
    }, [contactTypeId, firstName, lastName, middleName, personalTitle]);


    const handleEmailChange = (evt, id) => {
        // emails are stored in a temporary value until change can be applied
        let tempEmailAddresses = [...emailAddresses];
        let updateEmailAdressIndex = tempEmailAddresses.findIndex(email => {
            return email.emailAddressId === id;
        });
        tempEmailAddresses[updateEmailAdressIndex] = {
            businessEntityId: contact.businessEntityId,
            emailAddressId: id,
            emailAddress: evt.target.value
        };
        setEmailAddresses(tempEmailAddresses);
    };

    // Blocked until Drew updates API
    // const handlePhoneChange = (evt, id) => {
    //     // phone numbers are stored in a temporary value until change can be applied
    //     let tempPhoneNumbers = [...phoneNumbers];
    //     let updatePhoneNumberIndex = tempPhoneNumbers.findIndex(phoneNumber => {
    //         return phoneNumber.phoneNumberTypeId === id;
    //     });

    //     tempPhoneNumbers[updatePhoneNumberIndex] = evt.target.value;
    //     setPhoneNumbers(tempPhoneNumbers);
    // }

    return (
        <fieldset key={contact.personId}>
            {/* Mr. / Mrs. / Ms. */}
            <select defaultValue={contact.personalTitle} onChange={evt => setPersonalTitle(evt.target.value)}>
                {titles.map(title => {
                    return <option value={title.name} key={title.id}>{title.name}</option>
                })}
            </select>

            {/* First name */}
            <input type="text" defaultValue={contact.firstName} onChange={evt => setFirstName(evt.target.value)} />

            {/* Middle name */}
            <input type="text" defaultValue={contact.middleName} onChange={evt => setMiddleName(evt.target.value)} />

            {/* Last Name */}
            <input type="text" defaultValue={contact.lastName} onChange={evt => setLastName(evt.target.value)} />

            {/* Job Title */}
            <select defaultValue={contact.contactTypeName} onChange={evt => setContactTypeId(evt.target.value)}>
                {contactTypes.map(contactType => {
                    return (
                        <option value={contactType.contactTypeId} key={contactType.contactTypeId}>
                            {contactType.contactTypeName}
                        </option>
                    );
                })}
            </select>

            {/* Phone numbers */}
            {/* {contact.phoneNumbers.map(phoneEntry => {
                return (
                    <input 
                        type="number"
                        defaultValue={phoneEntry.phoneNumber}
                        key={phoneEntry.phoneNumberTypeId}
                        onChange={evt => handlePhoneChange(evt, phoneEntry.phoneNumberTypeId)}
                    />
                );
            })} */}

            {contact.emailAddresses.map(emailEntry => {
                return (
                    <input 
                        type="text" 
                        defaultValue={emailEntry.emailAddress} 
                        key={emailEntry.emailAddressId} 
                        onChange={evt => handleEmailChange(evt, emailEntry.emailAddressId)} 
                    />
                );
            })}
        </fieldset>
    );
};

export default ContactFieldset;