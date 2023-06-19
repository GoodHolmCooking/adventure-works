import { useState } from "react";
import styles from "./Vendor.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCallback } from "react";
import VendorModal from "./PurchasingModal";

const Vendor = props => {
    const {vendor, provinces, setExpandedVendor} = props;
    const [primaryContact, setPrimaryContact] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const navigate = useNavigate();

    const truncateProvince = useCallback(
        (searchValue) => {
            let foundProvinceArray = provinces.filter(province => {
                return province.stateProvinceName === searchValue;
            });

            if (foundProvinceArray.length === 0) {
                return searchValue;
            }

            return foundProvinceArray[0].stateProvinceCode;
        },
    [provinces]
    );

    useEffect(() => {
        let address1 = vendor.addressLine1;
        let address2 = vendor.addressLine2 == null ? "" : vendor.addressLine2;
        let city = vendor.city;
        let province = truncateProvince(vendor.stateProvinceName);
        let postal = vendor.postalCode;

        let combinedAddress = `${address1}\n${address2}\n${city}, ${province}\n${postal}`;

        setBillingAddress(combinedAddress);
    }, [truncateProvince, vendor])

    useEffect(() => {
        let firstName = vendor.contactFirstName;
        let middleName = vendor.contactMiddleName == null ? "" : vendor.contactMiddleName;
        let lastName = vendor.contactLastName == null ? "" : vendor.contactLastName;
        let combinedName = `${firstName} ${middleName} ${lastName}`;
        setPrimaryContact(combinedName);
    }, [vendor]);

    const handleNavigate = () => {
        navigate(`/vendors/${vendor.businessEntityId}`);
    }

    const handleModal = () => {
        setExpandedVendor(vendor);
    }

    return (
        <div>
            <div className={styles.vendorBlockMobile}>
                <div className={styles.vendorContent}>
                    <div>{vendor.vendorName}</div>
                    <div>{vendor.contactPhone}</div>
                </div>
                <button className={styles.btn} onClick={handleNavigate}>
                    <img src="./images/ArrowRight.png" alt="expand product" />
                </button>
            </div>

            <div className={styles.vendorBlockDesktop}>
                <p>{vendor.vendorName}</p>
                <p>{vendor.contactPhone}</p>
                <p>{vendor.businessEntityId}</p>
                <p>{primaryContact}</p>
                <p>{vendor.contactEmail}</p>
                <p>{billingAddress}</p>
                <button className={styles.btn} onClick={handleModal}>
                    <img src="./images/ArrowRight.png" alt="expand product" />
                </button>
            </div>
        </div>

);
}

export default Vendor;