import { useNavigate } from "react-router-dom";
import styles from "./Customer.module.css";

const convertDate = date => {
    let tempDate = new Date(date);
    let month = tempDate.getMonth();
    let day = tempDate.getDay();
    let year = tempDate.getFullYear();
    let formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
};

const Customer = props => {
    const {customer, setExpandedCustomer} = props;
    const navigate = useNavigate();

    const handleModal = () => {
        setExpandedCustomer(customer);
    };

    const handleNavigate = () => {
        navigate(`/customers/${customer.id}`);
    };

    return (
    <>
        <div className={styles.customerBlockMobile}>
            <div className={styles.customerContentContainer}>
                <div className={styles.customerContainer}>
                    <p className={styles.firstName + " " + styles.lastName}>{customer.firstName + " " + customer.lastName}</p>
                    <p>{convertDate(customer.orderDate)}</p>
                </div>
            </div>
            <button className={styles.btn} onClick={handleNavigate}>
                <img src="./images/ArrowRight.png" alt="expand customer order" />
            </button> 
        </div>

        <div className={styles.customerBlockDesktop}>
            <p>{customer.firstName + " " + customer.lastName}</p>
            <p>{convertDate(customer.orderDate)}</p>
            <p>{customer.orderNumber}</p>
            <p>{customer.orderQty}</p>
            <p>{convertDate(customer.shipDate)}</p>
            <p>{customer.unitPrice}</p>
            <p>${customer.lineTotal.toFixed(2)}</p> 
            <button className={styles.btn} onClick={handleModal}>
                <img src="./images/ArrowRight.png" alt="expand customer order" />
            </button>
        </div>
    </>
    );
};

export default Customer;