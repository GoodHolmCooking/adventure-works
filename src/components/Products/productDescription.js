import styles from "./productDescription.module.css";

const productDescription = props => {
    return (
        <ul className={styles.productDetails} key={props.productId}>
            <li>{props.wheelDescription}</li>
            <li>{props.saddleDescription}</li>
            <li>{props.pedalDescription}</li>
            <li>{props.riderExperience}</li>
        </ul>
    );
};

export default productDescription;