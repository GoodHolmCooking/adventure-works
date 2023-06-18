import { useEffect, useState } from "react";

import Purchase from "../../components/Purchasing/Purchase";
import { useDispatch, useSelector } from "react-redux";
import { applyPurchasingFilter, loadPurchasesAsync } from "../../store/slices/purchaseSlice";
import PurchasingHeader from "../../components/Purchasing/PurchasingHeader";
import styles from "./Purchases.module.css"

const Purchases = props => {
    const {purchases, displayPurchases} = useSelector(state => state.purchases);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!purchases.length) {
            dispatch(loadPurchasesAsync())
                .then(() => {
                    dispatch(applyPurchasingFilter());
                });
        }
    }, [dispatch]);

    return (
        <div className={styles.purchasingPage}>
            <PurchasingHeader area="orders" />
            <section>
                {!displayPurchases.length && <h3>Loading...</h3>}
                {displayPurchases && displayPurchases.map(purchase => {

                    return (
                        <Purchase 
                            key={purchase.purchaseOrderDetailId}
                            purchase={purchase}
                        />
                    );
                })}
            </section>
        </div>
    );
}

export default Purchases;