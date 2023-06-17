import styles from "./Adress.module.css";

const Address = props => {
    return (
    <li className={styles.contentBlock} key={props.addressId}>
        <p>{props.addressTypeName}</p>
        <p>{props.addressLine1}</p>
        <p>{props.addressLine2}</p>
        <p>{props.city}, {props.stateProvinceCode}</p>
        <p>{props.postalCode}</p>
        <p>{props.countryRegionCode}</p>
    </li>
    );
};

export default Address;