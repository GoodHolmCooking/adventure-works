import styles from "./summary.module.css";

const summary = props => {
    return (
        <ul className={styles.productDetails} key={props.productId}>
            <li>{props.summary}</li>
            <li>{props.productModelId}</li>
            <li>{props.manufacturer}</li>
            <li>{props.bikeFrame}</li>
            <li>{props.crankset}</li>
            <li>{props.material}</li>
            <li>{props.productLine}</li>
            <li>{props.style}</li>
        </ul>
    );
};

export default summary;