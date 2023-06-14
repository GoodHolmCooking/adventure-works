import { useEffect, useState } from "react";
import PhoneOption from "./PhoneOption";

const ContactFieldset = props => {
    const {contactTypes, contact, titles, phoneToNumber, phoneTypes, saving, numberToPhone, updatedContacts, setUpdatedContacts} = props;
    const [firstName, setFirstName] = useState(contact.firstName);
    const [middleName, setMiddleName] = useState(contact.middleName);
    const [lastName, setLastName] = useState(contact.lastName);
    const [contactType, setContactType] = useState(contact.contactTypeName);
    const [cellPhone, setCellPhone] = useState(null);
    const [homePhone, setHomePhone] = useState(null);
    const [workPhone, setWorkPhone] = useState(null);
    const [emailAddresses, setEmailAddresses] = useState(contact.emailAddresses);
    const [personalTitle, setPersonalTitle] = useState(contact.personalTitle);

    useEffect(() => {


        if (saving) {
            let phoneNumbers = [];
            if (cellPhone) {
                phoneNumbers.push(numberToPhone(cellPhone));
            }
            if (homePhone) {
                phoneNumbers.push(numberToPhone(homePhone));
            }
            if (workPhone) {
                phoneNumbers.push(numberToPhone(workPhone));
            }

            let newContact = {
                ...contact,
                personalTitle: personalTitle,
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                contactType: contactType,
                emailAddresses: emailAddresses,
                phoneNumbers: phoneNumbers
            };


        }
    }, [saving]);

    const handleEmailChange = (evt, id) => {
        let tempEmailAddresses = [...emailAddresses];
        let updateEmailAdressIndex = tempEmailAddresses.findIndex(email => {
            return email.emailAddressId === id;
        });
        tempEmailAddresses[updateEmailAdressIndex] = evt.target.value;
        setEmailAddresses(tempEmailAddresses);
    };


    // update phone type
    // as it stands if someone has a cell phone, updates this to their work phone, and then changes back. This will record
    // they have both a cell phone and a work phone. Nothing exists to wipe out the changed state as the information is stored.
    // the on change needs to record the previous type. If a value exists for the previous type, it must be reset to null.

    return (
        <fieldset key={contact.personId}>
            <select defaultValue={contact.personalTitle} onChange={evt => setPersonalTitle(evt.target.value)}>
                {titles.map(title => {
                    return <option value={title.name} key={title.id}>{title.name}</option>
                })}
            </select>
            <input type="text" defaultValue={contact.firstName} onChange={evt => setFirstName(evt.target.value)} />
            <input type="text" defaultValue={contact.middleName} onChange={evt => setMiddleName(evt.target.value)} />
            <input type="text" defaultValue={contact.lastName} onChange={evt => setLastName(evt.target.value)} />
            <select defaultValue={contact.contactTypeName} onChange={evt => setContactType(evt.target.value)}>
                {contactTypes.map(contactType => {
                    return (
                        <option value={contactType.contactTypeName} key={contactType.contactTypeId}>
                            {contactType.contactTypeName}
                        </option>
                    );
                })}
            </select>
            {contact.phoneNumbers.map(phoneEntry => {
                switch (phoneEntry.phoneNumberTypeId) {
                    case 1: // cell
                        return (
                            <input 
                                type="number" 
                                defaultValue={phoneToNumber(phoneEntry.phoneNumber)} 
                                key={phoneEntry.phoneNumberTypeId} 
                                onChange={evt => setCellPhone(evt.target.value)} 
                            />
                        );
                    case 2: // home
                        return (
                            <input 
                                type="number" 
                                defaultValue={phoneToNumber(phoneEntry.phoneNumber)} 
                                key={phoneEntry.phoneNumberTypeId} 
                                onChange={evt => setHomePhone(evt.target.value)} 
                            />
                        );
                    case 3: // work
                        return (
                            <input 
                                type="number" 
                                defaultValue={phoneToNumber(phoneEntry.phoneNumber)} 
                                key={phoneEntry.phoneNumberTypeId} 
                                onChange={evt => setWorkPhone(evt.target.value)} 
                            />
                        );
                    default: // should not be reached.
                        return <div></div>;
                }
            })}

            {contact.emailAddresses.map(emailEntry => {
                return <input type="text" defaultValue={emailEntry.emailAddress} key={emailEntry.emailAddressId} onChange={evt => handleEmailChange(evt, emailEntry.emailAddressId)} />
            })}
        </fieldset>
    );
};

export default ContactFieldset;