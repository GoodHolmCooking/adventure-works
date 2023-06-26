import { useEffect } from "react";
import { useState } from "react";

const ContactEmailInput = props => {
    const {emailEntry, styles, handleEmailChange, emailValid} = props;

    const [validEmail, setValidEmail] = useState(true);

    useEffect(() => {
        setValidEmail(emailValid(emailEntry.emailAddress));
    });

    return (
        <>
            <input 
                type="text" 
                defaultValue={emailEntry.emailAddress} 
                key={emailEntry.emailAddressId} 
                onChange={evt => handleEmailChange(evt, emailEntry.emailAddressId)} 
                className={styles.formInput}
            />
            {!validEmail &&
                <div className={styles.contactError}>You must enter a valid email.</div>
            } 
        </>

    );
};

export default ContactEmailInput;