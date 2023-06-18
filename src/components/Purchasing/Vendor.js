import { useState } from "react";
import styles from "./Vendor.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCallback } from "react";

const Vendor = props => {
    const {vendor, provinces} = props;
    const [primaryContact, setPrimaryContact] = useState("");
    const [billingAddress, setBillingAddress] = useState("");

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

    return (
        <Link to={`/vendors/${vendor.businessEntityId}`} className={styles.vendorLink}>
            <div className={styles.vendorBlockMobile}>
                <div>
                    <div>{vendor.vendorName}</div>
                    <div>{vendor.contactPhone}</div>
                </div>
                <img src="./images/ArrowRight.png" alt="expand product" />
            </div>

            <div className={styles.vendorBlockDesktop}>
                <p>{vendor.vendorName}</p>
                <p>{vendor.contactPhone}</p>
                <p>{vendor.businessEntityId}</p>
                <p>{primaryContact}</p>
                <p>{vendor.contactEmail}</p>
                <p>{billingAddress}</p>
                <div>
                    <img src="./images/ArrowRight.png" alt="expand product" />
                </div>
            </div>
        </Link>
    );
}

export default Vendor;