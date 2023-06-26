import { useEffect } from "react";
import { useState } from "react";

const ContactPhoneInput = props => {
    const {phoneEntry, handlePhoneTypeChange, handlePhoneChange, styles, phoneValid} = props;

    const [validPhone, setValidPhone] = useState(true);

    useEffect(() => {
        setValidPhone(phoneValid(phoneEntry.phoneNumber));
    }, [phoneEntry, phoneValid]);

    return (
        <fieldset>
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
            {!validPhone &&
                <div className={styles.contactError}>Phone number must be in the format ###-###-####.</div>
            }
        </fieldset>
    );
};

export default ContactPhoneInput;