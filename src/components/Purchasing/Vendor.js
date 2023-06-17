import styles from "./Vendor.module.css";
import { Link } from "react-router-dom";

const Vendor = props => {
    return (
        <Link to={`/vendors/${props.id}`} className={styles.vendorLink}>
            <div className={styles.vendorBlock}>
                <div>
                    <div>{props.name}</div>
                    <div>{props.phone}</div>
                </div>
                <img src="./images/ArrowRight.png" alt="expand product" />
            </div>
        </Link>
    );
}

export default Vendor;