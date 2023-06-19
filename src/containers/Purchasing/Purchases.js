import { useEffect, useState } from "react";

import Purchase from "../../components/Purchasing/Purchase";
import { useDispatch, useSelector } from "react-redux";
import { applyPurchasingFilter, loadPurchasesAsync } from "../../store/slices/purchaseSlice";
import PurchasingHeader from "../../components/Purchasing/PurchasingHeader";
import styles from "./Purchases.module.css"
import PurchasingModal from "../../components/Purchasing/PurchasingModal";

const Purchases = props => {
    const {purchases, displayPurchases} = useSelector(state => state.purchases);
    const [loading, setLoading] = useState(true);
    const [expandedPurchase, setExpandedPurchase] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        if (!purchases.length) {
            console.log("Did not crash. Authentically loading...")
            dispatch(loadPurchasesAsync())
                .then(() => {
                    dispatch(applyPurchasingFilter());
                });
        }
    }, [dispatch]);

    useEffect(() => {
        if (displayPurchases.length) {
            setLoading(false);
        }
    }, [displayPurchases])

    return (
        <div>
            <PurchasingHeader area="orders" />
            <section className={styles.purchasingPage}>
                {loading && <h3>Loading...</h3>}
                {!loading && 
                    <div className={styles.desktopHeader}>
                        <h3 className={styles.productNameHeading}>Product Name</h3>
                        <h3 className={styles.vendorNameHeading}>Vendor Name</h3>
                        <h3 className={styles.orderDateHeading}>Order Date</h3>
                        <h3 className={styles.orderQtyHeading}>Order Qty</h3>
                        <h3 className={styles.totalHeading}>Total Due</h3>
                        <h3 className={styles.shipDateHeading}>Ship Date</h3>  
                    </div>
                }
                {!loading && displayPurchases.map(purchase => {

                    return (
                        <Purchase 
                            key={purchase.purchaseOrderDetailId}
                            purchase={purchase}
                            setExpandedPurchase={setExpandedPurchase}
                        />
                    );
                })}

                {Object.keys(expandedPurchase).length !== 0 && 
                    <PurchasingModal model={expandedPurchase} expandFunction={setExpandedPurchase} area="orders" />
                }
            </section>
        </div>
    );
}

export default Purchases;