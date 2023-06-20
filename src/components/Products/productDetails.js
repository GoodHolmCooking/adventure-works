import styles from "./productDetails.module.css";

const productDetails = props => {
    return (
        <ul className={styles.productDetails} key={props.productId}>
            <li>{props.productName}</li>
            <li>{props.productId}</li>
            <li>{props.productNumber}</li>
            <li>{props.safetyStockLevel}</li>
            <li>{props.reorderPoint}</li>
        </ul>
    );
};

export default productDetails;