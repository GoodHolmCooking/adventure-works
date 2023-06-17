import { useEffect, useState } from "react";

import Purchase from "../../components/Purchasing/Purchase";
import { useDispatch, useSelector } from "react-redux";
import { loadPurchasesAsync } from "../../store/slices/purchaseSlice";
import PurchasingHeader from "../../components/Purchasing/PurchasingHeader";

function Purchases() {
    const {purchases} = useSelector(state => state.purchases);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!purchases.length) {
            dispatch(loadPurchasesAsync());
        }
    }, [dispatch]);

    return (
        <div>
            <PurchasingHeader />
            <section>
                {!purchases.length && <h3>Loading...</h3>}
                {purchases && purchases.map(purchase => {

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