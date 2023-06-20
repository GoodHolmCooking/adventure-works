import styles from "./warranty.module.css";

const warranty = props => {
    return (
        <ul className={styles.productDetails} key={props.productId}>
            <li>{props.warrantyPeriod}</li>
            <li>{props.warrantyDescription}</li>
            <li>{props.maintenanceDescription}</li>
        </ul>
    );
};

export default warranty;