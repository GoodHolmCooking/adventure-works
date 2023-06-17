import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./PurchasingHeader.module.css"
import { useDispatch } from "react-redux";
import { applyPurchasingFilter, setPurchasingFilter } from "../../store/slices/purchaseSlice";
import { applyVendorFilter, setVendorFilter } from "../../store/slices/vendorSlice";

const PurchasingHeader = props => {
    const {area} = props;
    const [selection, setSelection] = useState(area);
    const dispatch = useDispatch();

    const handleSearch = () => {
        if (selection === 'vendors') dispatch(applyVendorFilter());
        else dispatch(applyPurchasingFilter());
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
                {selection === 'vendors' && 
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

                {selection === 'orders' && 
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
        </section>
    );
};

export default PurchasingHeader;