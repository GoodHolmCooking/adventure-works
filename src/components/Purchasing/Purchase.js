import { Link } from "react-router-dom";
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
    const {purchase} = props;

    return (
    <Link to={`/purchases/${purchase.purchaseOrderId}`} className={styles.purchaseLink}>
        <div className={styles.purchaseBlockMobile}>
            <div>
                <p className={styles.productName}>{purchase.productName}</p>
                <p>{convertDate(purchase.orderDate)}</p>
            </div>
            <div>{purchase.quantity}</div>
            <div>
                <img src="./images/ArrowRight.png" alt="expand product" />
            </div>
            
        </div>

        <div className={styles.purchaseBlockDesktop}>
                <p>{purchase.productName}</p>
                <p>{purchase.vendorName}</p>
                <p>{convertDate(purchase.orderDate)}</p>
                <p>${purchase.totalDue}</p>
                <p>{convertDate(purchase.shipDate)}</p>
                <div>
                    <img src="./images/ArrowRight.png" alt="expand product" />
                </div>
            </div>
    </Link>
    );
};

export default Purchase;