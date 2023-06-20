import styles from "./manufacturing.module.css";

//not sure productModelId is correct here, it is surely either wrong here or wrong in summary
const manufacturing = props => {
    return (
        <ul className={styles.productDetails} key={props.productId}>
            <li>{props.manufacturer}</li>
            <li>{props.productModelName}</li>
            <li>{props.productModelId}</li>
            <li>{props.numberOfSteps}</li>
            <li>{props.setupHours}</li>
            <li>{props.machineHours}</li>
            <li>{props.laborHours}</li>
            <li>{props.lotSize}</li>
            {/* <li>{props.instructions}</li> */}
            {/* there doesn't seem to be an instructions prop for the manufacturing details ? */}
        </ul>
    );
};

export default manufacturing;