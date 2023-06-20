import styles from "./location.module.css";

const location = props => {
    return (
        <ul className={styles.location} key={props.locationId}>
            <li>{props.locationName}</li>
            <li>{props.locationId}</li>
            <li>{props.shelf}</li>
            <li>{props.bin}</li>
        </ul>
    );
};

export default location;