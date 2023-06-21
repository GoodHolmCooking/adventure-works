import { useEffect } from "react";
import Store from "../../components/Sales/Store";
import { useDispatch, useSelector } from "react-redux";
import { applyStoreFilter, loadProvincesAsync, loadStoresAsync} from "../../store/slices/storeSlice";
import SalesHeader from "../../components/Sales/SalesHeader";
import styles from "./Stores.module.css";
import { useState } from "react";
import SalesModal from "../../components/Sales/SalesModal";
function Stores() {
    const {stores, displayStores, provinces} = useSelector(state => state.stores);
    const [loading, setLoading] = useState(true);
    const [expandedStore, setExpandedStore] = useState({});
    // const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();

    // Load stores
    useEffect(() => {
        if (!stores.length) {
            dispatch(loadStoresAsync())
                .then(() => {
                    dispatch(applyStoreFilter());
                }
            );
        };
    }, [dispatch, stores]);

    useEffect(() => {
        if (!provinces.length) {
            dispatch(loadProvincesAsync());
        }
    }, [dispatch, provinces]);

    useEffect(() => {
        if (displayStores.length) {
            setLoading(false);
        }
    }, [displayStores]);

    return (
        <div className={styles.overhead}>
            <SalesHeader area="stores" />
            <section className={styles.salesPage}>
                {loading && <h3>Loading...</h3>}
                {!loading && 
                    <div className={styles.desktopHeader}>
                        <h3 className={styles.nameHeading}>Store/Business</h3>
                        <h3 className={styles.orderDate}>Order Date</h3>
                        <h3 className={styles.contactName}>Contact Name</h3>
                        <h3 className={styles.orderNumber}>Order Number</h3>
                        <h3 className={styles.productName}>Product Name</h3>
                        <h3 className={styles.unitPrice}>Unit Price</h3>
                        <h3 className={styles.totalDue}>Total Due</h3>           
                    </div>
                }

                {!loading && displayStores.map(store => {
                    return (
                        <Store 
                            key={store.businessEntityId}
                            store={store}
                            setExpandedStore={setExpandedStore}
                            provinces={provinces}
                        />
                    );
                })}

                {Object.keys(expandedStore).length !== 0 && 
                    <SalesModal model={expandedStore} expandFunction={setExpandedStore} area="stores" />
                }

            </section>
        </div>
    );
}

export default Stores;