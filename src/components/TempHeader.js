// This component is used for testing and is not meant to be used in the final product
import { Link } from "react-router-dom";

import styles from "./TempHeader.module.css";

function TempHeader() {
    return (
        <div className={styles.header}>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/vendors">Vendors</Link></li>
            </ul>
        </div>
    );
}

export default TempHeader;