import { useEffect } from "react";
import Vendor from "../../components/Purchasing/Vendor";
import { useDispatch, useSelector } from "react-redux";
import { loadVendorsAsync} from "../../store/slices/vendorSlice";
import PurchasingHeader from "../../components/Purchasing/PurchasingHeader";
import styles from "./Vendors.module.css";

function Vendors() {
    const {vendors} = useSelector(state => state.vendors);
    const dispatch = useDispatch();

    // Load vendors
    useEffect(() => {
        if (!vendors.length) {
            dispatch(loadVendorsAsync());
        };
    }, [dispatch, vendors]);

    return (
        <div className={styles.purchasingPage}>
            <PurchasingHeader area="vendors" />
            <section>
                {!vendors.length && <h3>Loading...</h3>}
                {vendors && vendors.map(vendor => {

                    return (
                        <Vendor 
                            key={vendor.businessEntityId}
                            id={vendor.businessEntityId}
                            name={vendor.vendorName}
                            phone={vendor.contactPhone}
                        />
                    );
                })}
            </section>
        </div>
    );
}

export default Vendors;