import { useState } from "react";
import styles from "./Store.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const convertDate = date => {
    let tempDate = new Date(date);
    let month = tempDate.getMonth();
    let day = tempDate.getDay();
    let year = tempDate.getFullYear();
    let formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
};

const Store = props => {
    const {store, setExpandedStore} = props;
    const [primaryContact, setPrimaryContact] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        let firstName = store.contactFirstName;
        let middleName = store.contactMiddleName == null ? "" : store.contactMiddleName;
        let lastName = store.contactLastName == null ? "" : store.contactLastName;
        let combinedName = `${firstName} ${middleName} ${lastName}`;
        setPrimaryContact(combinedName);
    }, [store]);

    const handleNavigate = () => {
        navigate(`/stores/${store.id}`);
    }

    const handleModal = () => {
        setExpandedStore(store);
    }

    return (
        <div key={store.id}>
            <div className={styles.storeBlockMobile}>
                <div className={styles.storeContent}>
                    <div>{store.storeName}</div>
                    <div>{convertDate(store.orderDate)}</div>
                </div>
                <button className={styles.btn} onClick={handleNavigate}>
                    <img src="./images/ArrowRight.png" alt="expand store" />
                </button>
            </div>

            <div className={styles.storeBlockDesktop}>
                <p>{store.storeName}</p>
                <p>{convertDate(store.orderDate)}</p>
                <p>{store.contactFirstName + " " + store.contactLastName}</p>
                <p>{store.orderNumber}</p>
                <p>{store.productName}</p>
                <p>${store.unitPrice.toFixed(2)}</p>
                <p>${store.lineTotal.toFixed(2)}</p>
                <button className={styles.btn} onClick={handleModal}>
                    <img src="./images/ArrowRight.png" alt="expand store" />
                </button>
            </div>
        </div>

);
}

export default Store;