import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./PurchasingHeader.module.css"

const PurchasingHeader = props => {
    const {area} = props;
    const [selection, setSelection] = useState(area);

    const handleSearch = evt => {
        console.log(evt.target.value);
    };

    return (
        <section>
            <div className={styles.linkRow}>
                <Link to="/vendors" className={styles.purchasingLink}>
                    {selection === 'vendors' && <img src="../../images/RadialIcon.png" alt="vendors are selected" /> }
                    <div>Vendors</div>
                </Link>
                <Link to="/purchases" className={styles.purchasingLink}>
                    {selection === 'orders' && <img src="../../images/RadialIcon.png" alt="purchase orders are selected" /> }
                    <div>Orders</div>
                </Link>
            </div>

            <div className={styles.searchBlock}>
                <input onChange={evt => handleSearch(evt)} />
                <div className={styles.searchImgContainer}>
                    <img src="../../images/SearchIcon.png" alt="search" />
                </div> 
            </div>
        </section>
    );
};

export default PurchasingHeader;