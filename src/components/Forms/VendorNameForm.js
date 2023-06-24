import { useState } from "react";
import styles from "./VendorNameForm.module.css";
import { useDispatch } from "react-redux";
import { updateVendorAsync, updatePhoneAsync } from "../../store/slices/vendorSlice";

const VendorNameForm = props => {
    const {
        vendorName, 
        primaryPhone, 
        setVendorName, 
        setPrimaryPhone, 
        completeVendor, 
        toggleEditView, 
        limitedVendor, 
        numberToPhone,
        phoneNumbers
    } = props;
    const dispatch = useDispatch();

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

        // find phone Id
        // use contact number and id from limited, find the associated id
        let primaryPhoneIndex = phoneNumbers.findIndex(phoneNumber => {
            // phoneNumbers is an array of phone number objects.
            // each phone number object has a variable called phone number.
            // this variable is the actual phone number as a string.
            return phoneNumber.phoneNumber === limitedVendor.contactPhone;
        });

        let primaryPhoneObj = phoneNumbers[primaryPhoneIndex];

        // update primary phone number
        let phoneData = {
            businessEntityId: limitedVendor.contactBusinessEntityId,
            newPhoneNumber: numberToPhone(primaryPhone),
            originalPhoneNumber: limitedVendor.contactPhone,
            newPhoneNumberTypeId: primaryPhoneObj.phoneNumberTypeId,
            originalPhoneNumberTypeId: primaryPhoneObj.phoneNumberTypeId
        }
        dispatch(updatePhoneAsync(phoneData));

		// exit the editing UI
		toggleEditView();
    }

    return (
        <form onSubmit={handleInputChanges}>
            <input type="text" defaultValue={vendorName} onChange={evt => setVendorName(evt.target.value)} className={styles.formInput} />
            <input type="number" defaultValue={primaryPhone} onChange={evt => setPrimaryPhone(evt.target.value)} className={styles.formInput} />
            <input type="submit" className={styles.saveBtn} />
        </form>
    );
};

export default VendorNameForm;