import { useNavigate } from "react-router-dom";
import styles from "./Purchase.module.css";

const convertDate = date => {
    let tempDate = new Date(date);
    let month = tempDate.getMonth();
    let day = tempDate.getDay();
    let year = tempDate.getFullYear();
    let formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
};

const Purchase = props => {
    const {purchase, setExpandedPurchase} = props;
    const navigate = useNavigate();

    const handleModal = () => {
        setExpandedPurchase(purchase);
    };

    const handleNavigate = () => {
        navigate(`/purchases/${purchase.purchaseOrderDetailId}`);
    };

    return (
    <>
        <div className={styles.purchaseBlockMobile}>
            <div className={styles.productContentContainer}>
                <div className={styles.productNameContainer}>
                    <p className={styles.productName}>{purchase.productName}</p>
                    <p>{convertDate(purchase.orderDate)}</p>
                </div>
                <div> {purchase.quantity}</div>
            </div>
            <button className={styles.btn} onClick={handleNavigate}>
                <img src="./images/ArrowRight.png" alt="expand purchase order" />
            </button>
        </div>

        <div className={styles.purchaseBlockDesktop}>
            <p>{purchase.productName}</p>
            <p>{purchase.vendorName}</p>
            <p>{convertDate(purchase.orderDate)}</p>
            <p>{purchase.quantity}</p>
            <p>${purchase.totalDue.toFixed(2)}</p>
            <p>{convertDate(purchase.shipDate)}</p>
            <button className={styles.btn} onClick={handleModal}>
                <img src="./images/ArrowRight.png" alt="expand purchase order" />
            </button>
        </div>
    </>
    );
};

export default Purchase;