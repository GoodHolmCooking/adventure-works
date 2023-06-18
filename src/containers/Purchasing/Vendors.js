import { useEffect } from "react";
import Vendor from "../../components/Purchasing/Vendor";
import { useDispatch, useSelector } from "react-redux";
import { applyVendorFilter, loadProvincesAsync, loadVendorsAsync} from "../../store/slices/vendorSlice";
import PurchasingHeader from "../../components/Purchasing/PurchasingHeader";
import styles from "./Vendors.module.css";
import { useState } from "react";

function Vendors() {
    const {vendors, displayVendors, provinces} = useSelector(state => state.vendors);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    // Load vendors
    useEffect(() => {
        if (!vendors.length) {
            dispatch(loadVendorsAsync())
                .then(() => {
                    dispatch(applyVendorFilter());
                }
            );
        };
    }, [dispatch, vendors]);

    useEffect(() => {
        if (!provinces.length) {
            dispatch(loadProvincesAsync());
        }
    }, [dispatch, provinces]);

    useEffect(() => {
        if (displayVendors.length) {
            setLoading(false);
        }
    }, [displayVendors])

    return (
        <div>
            <PurchasingHeader area="vendors" />
            <section className={styles.purchasingPage}>
                {loading && <h3>Loading...</h3>}
                {!loading && 
                    <div className={styles.desktopHeader}>
                        <h3>Vendor Name</h3>
                        <h3>Phone</h3>
                        <h3>Business ID</h3>
                        <h3>Primary Contact</h3>
                        <h3>Email</h3>
                        <h3>Billing Address</h3>
                        <h3>Options</h3>           
                    </div>
                }

                {!loading && displayVendors.map(vendor => {
                    return (
                        <Vendor 
                            key={vendor.businessEntityId}
                            vendor={vendor}
                            provinces={provinces}
                        />
                    );
                })}

            </section>
        </div>
    );
}

export default Vendors;