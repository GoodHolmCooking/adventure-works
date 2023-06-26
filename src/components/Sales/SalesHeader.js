import { Link } from "react-router-dom";
import styles from "./SalesHeader.module.css"
import { useDispatch } from "react-redux";
import { applySalesFilter, setSalesFilter } from "../../store/slices/customerSlice";
import { applyStoreFilter, setStoreFilter } from "../../store/slices/storeSlice";

const SalesHeader = props => {
    const {area} = props;
    const dispatch = useDispatch();

    const handleSearch = () => {
        if (area === 'stores') dispatch(applyStoreFilter());
        else dispatch(applySalesFilter());
    };

    return (
        <section>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Sales</h1>
            </div>
            <div className={styles.headerSection}>
                <div className={styles.linkRow}>
                    <Link to="/stores" className={styles.salesLink}>
                        {area === 'stores' && <img src="\images\Vector.png" alt="stores are selected" /> }
                        <div>Stores</div>
                    </Link>
                    <Link to="/customers" className={styles.salesLink}>
                        {area === 'customers' && <img src="\images\Vector.png" alt="customer orders are selected" /> }
                        <div>Customers</div>
                    </Link>
                </div>

                <div className={styles.searchBlock}>
                    {area === 'stores' && 
                        <input 
                            type="text"
                            onChange={evt => dispatch(setStoreFilter(evt.target.value))}
                            onKeyUp={e => {
                            if (e.key === "Enter")
                            {
                                dispatch(applyStoreFilter());
                            }
                        }}
                        />
                    }

                    {area === 'customers' && 
                        <input 
                            type="text"
                            onChange={evt => dispatch(setSalesFilter(evt.target.value))}
                            onKeyUp={e => {
                            if (e.key === "Enter")
                            {
                                dispatch(applySalesFilter());
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

export default SalesHeader;