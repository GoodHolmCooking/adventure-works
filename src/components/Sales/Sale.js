import { useNavigate } from "react-router-dom";
import styles from "./Sale.module.css";

const convertDate = date => {
    let tempDate = new Date(date);
    let month = tempDate.getMonth();
    let day = tempDate.getDay();
    let year = tempDate.getFullYear();
    let formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
};

const Sale = props => {
    const {sale, setExpandedSale} = props;
    const navigate = useNavigate();

    const handleModal = () => {
        setExpandedSale(sale);
    };

    const handleNavigate = () => {
        navigate(`/customers/${sale.saleOrderDetailId}`);
    };

    return (
    <>
        <div className={styles.saleBlockMobile}>
            <div className={styles.productContentContainer}>
                <div className={styles.customerContainer}>
                    <p className={styles.customer}>{sale.customer}</p>
                    <p>{convertDate(sale.orderDate)}</p>
                </div>
                <div>x {sale.quantity}</div>
            </div>
            <button className={styles.btn} onClick={handleNavigate}>
                <img src="./images/ArrowRight.png" alt="expand sale order" />
            </button>
        </div>

        <div className={styles.saleBlockDesktop}>
            <p>{sale.customer}</p>
            <p>{sale.orderDate}</p>
            <p>{convertDate(sale.orderNumber)}</p>
            <p>{sale.quantity}</p>
            <p>{convertDate(sale.shipDate)}</p>
            <p>{sale.unitPrice}</p>
            <p>${sale.totalDue.toFixed(2)}</p>
            <button className={styles.btn} onClick={handleModal}>
                <img src="./images/ArrowRight.png" alt="expand sale order" />
            </button>
        </div>
    </>
    );
};

export default Sale;