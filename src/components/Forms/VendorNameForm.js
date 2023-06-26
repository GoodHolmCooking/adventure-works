import { useState } from "react";
import styles from "./VendorNameForm.module.css";
import { useDispatch } from "react-redux";
import { updateVendorAsync, updatePhoneAsync } from "../../store/slices/vendorSlice";
import { useEffect } from "react";

const VendorNameForm = props => {
    const {
        vendorName, 
        primaryPhone, 
        setVendorName, 
        setPrimaryPhone, 
        completeVendor, 
        toggleEditView, 
        limitedVendor,
        phoneNumbers,
        id,
        phoneValid
    } = props;
    const dispatch = useDispatch();
    const [validPhoneNumber, setValidPhoneNumber] = useState(true);

    useEffect(() => {
        setValidPhoneNumber(phoneValid(primaryPhone));
    }, [phoneValid, primaryPhone]);

    const handleInputChanges = evt => {
        evt.preventDefault();

        // update vendor name
        let data = {
            businessEntityId: completeVendor.businessEntityId,
            accountNumber: completeVendor.accountNumber,
            vendorName: vendorName,
            creditRating: completeVendor.creditRating
        }
        dispatch(updateVendorAsync(data));

        if (validPhoneNumber) {
            // find phone Id
            // use contact number and id from limited, find the associated id
            let primaryPhoneIndex = phoneNumbers.findIndex(phoneNumber => {
                return phoneNumber.businessEntityId === limitedVendor.contactBusinessEntityId;
            });

            let primaryPhoneObj = phoneNumbers[primaryPhoneIndex];

            // update primary phone number
            let phoneData = {
                businessEntityId: limitedVendor.contactBusinessEntityId,
                newPhoneNumber: primaryPhone,
                originalPhoneNumber: limitedVendor.contactPhone,
                newPhoneNumberTypeId: primaryPhoneObj.phoneNumberTypeId,
                originalPhoneNumberTypeId: primaryPhoneObj.phoneNumberTypeId
            }
            dispatch(updatePhoneAsync(phoneData));

            // exit the editing UI
		    toggleEditView();
        }
    }

    return (
        <form onSubmit={handleInputChanges} className={styles.nameForm}>
            <input type="text" defaultValue={vendorName} onChange={evt => setVendorName(evt.target.value)} className={styles.nameInput} />
            <input type="text" defaultValue={primaryPhone} onChange={evt => setPrimaryPhone(evt.target.value)} className={styles.phoneInput} />
            {!validPhoneNumber &&
                <div className={styles.phoneError}>Phone number must be in the format ###-###-####.</div>
            }
            <div className={styles.idContainer}>
                <div className={styles.vendorId}>{id}</div>
            </div>  
            <input type="submit" className={styles.vendorNameSaveBtn} />
        </form>
    );
};

export default VendorNameForm;