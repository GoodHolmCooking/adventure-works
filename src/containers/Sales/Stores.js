import { useEffect } from "react";
import Store from "../../components/Sales/Store";
import { useDispatch, useSelector } from "react-redux";
import { applyStoreFilter, loadStoresAsync} from "../../store/slices/storeSlice";
import SalesHeader from "../../components/Sales/SalesHeader";
import styles from "./Stores.module.css";
import { useState } from "react";
import SalesModal from "../../components/Sales/SalesModal";
function Stores() {
    const {stores, displayStores, provinces} = useSelector(state => state.stores);
    const [loading, setLoading] = useState(true);
    const [expandedStore, setExpandedStore] = useState({});
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
                        <h3 className={styles.storeNameHeading}>Store/Business</h3>
                        <h3 className={styles.orderDateHeading}>Order Date</h3>
                        <h3 className={styles.combinedNameHeading}>Contact Name</h3>
                        <h3 className={styles.orderNumberHeading}>Order Number</h3>
                        <h3 className={styles.productNameHeading}>Product Name</h3>
                        <h3 className={styles.unitPriceHeading}>Unit Price</h3>
                        <h3 className={styles.totalDueHeading}>Total Due</h3>           
                    </div>
                }

                {!loading && displayStores.map(store => {
                    return (
                        <Store 
                            key={store.orderNumber}
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