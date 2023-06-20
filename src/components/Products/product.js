import styles from "./product.module.css";

const product = props => {
    return (
        <ul className={styles.product} key={props.productId}>
            <li>{props.productName}</li>
            <li>{props.quantity}</li>
            <li>{props.locationName}</li>
            <li>{props.shelf}</li>
            <li>{props.bin}</li>
            {/* delete? not sure where the button goes. May also split this into two divs for the 2 columns */}
        </ul>
    );
};

export default product;