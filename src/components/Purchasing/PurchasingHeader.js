import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./PurchasingHeader.module.css"
import { useDispatch } from "react-redux";
import { applyPurchasingFilter, setPurchasingFilter } from "../../store/slices/purchaseSlice";
import { applyVendorFilter, setVendorFilter } from "../../store/slices/vendorSlice";

const PurchasingHeader = props => {
    const {area} = props;
    const dispatch = useDispatch();

    const handleSearch = () => {
        if (area === 'vendors') dispatch(applyVendorFilter());
        else dispatch(applyPurchasingFilter());
    };

    return (
        <section>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Purchasing</h1>
            </div>
            <div className={styles.headerSection}>
                <div className={styles.linkRow}>
                    <Link to="/vendors" className={styles.purchasingLink}>
                        {area === 'vendors' && <img src="../../images/RadialIcon.png" alt="vendors are selected" /> }
                        <div>Vendors</div>
                    </Link>
                    <Link to="/purchases" className={styles.purchasingLink}>
                        {area === 'orders' && <img src="../../images/RadialIcon.png" alt="purchase orders are selected" /> }
                        <div>Orders</div>
                    </Link>
                </div>

                <div className={styles.searchBlock}>
                    {area === 'vendors' && 
                        <input 
                            type="text"
                            onChange={evt => dispatch(setVendorFilter(evt.target.value))}
                            onKeyUp={e => {
                            if (e.key === "Enter")
                            {
                                dispatch(applyVendorFilter());
                            }
                        }}
                        />
                    }

                    {area === 'orders' && 
                        <input 
                            type="text"
                            onChange={evt => dispatch(setPurchasingFilter(evt.target.value))}
                            onKeyUp={e => {
                            if (e.key === "Enter")
                            {
                                dispatch(applyPurchasingFilter());
                            }
                        }}
                        />
                    }

                    <div className={styles.searchImgContainer}>
                        <button className={styles.searchBtn} onClick={handleSearch}>
                            <img src="../../images/SearchIcon.png" alt="search" />
                        </button>         
                    </div> 
                </div>
            </div>
        </section>
    );
};

export default PurchasingHeader;