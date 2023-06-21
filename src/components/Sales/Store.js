import { useState } from "react";
import styles from "./Store.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCallback } from "react";

const Store = props => {
    const {store, provinces, setExpandedStore} = props;
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
        let address1 = store.addressLine1;
        let address2 = store.addressLine2 == null ? "" : store.addressLine2;
        let city = store.city;
        let province = truncateProvince(store.stateProvinceName);
        let postal = store.postalCode;

        let combinedAddress = `${address1}\n${address2}\n${city}, ${province}\n${postal}`;

        setBillingAddress(combinedAddress);
    }, [truncateProvince, store])

    useEffect(() => {
        let firstName = store.contactFirstName;
        let middleName = store.contactMiddleName == null ? "" : store.contactMiddleName;
        let lastName = store.contactLastName == null ? "" : store.contactLastName;
        let combinedName = `${firstName} ${middleName} ${lastName}`;
        setPrimaryContact(combinedName);
    }, [store]);

    const handleNavigate = () => {
        navigate(`/stores/${store.businessEntityId}`);
    }

    const handleModal = () => {
        setExpandedStore(store);
    }

    return (
        <div>
            <div className={styles.storeBlockMobile}>
                <div className={styles.storeContent}>
                    <div>{store.storeName}</div>
                    <div>{store.contactPhone}</div>
                </div>
                <button className={styles.btn} onClick={handleNavigate}>
                    <img src="./images/ArrowRight.png" alt="expand product" />
                </button>
            </div>

            <div className={styles.store}>
                <p>{store.store}</p>
                <p>{store.contactPhone}</p>
                <p>{store.businessEntityId}</p>
                <p>{primaryContact}</p>
                <p>{store.contactEmail}</p>
                <p>{billingAddress}</p>
                <button className={styles.btn} onClick={handleModal}>
                    <img src="./images/ArrowRight.png" alt="expand product" />
                </button>
            </div>
        </div>

);
}

export default Store;