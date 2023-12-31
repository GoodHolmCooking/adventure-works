import PurchaseDetailsModal from "../../containers/Purchasing/PurchaseDetailsModal";
import VendorDetailsModal from "../../containers/Purchasing/VendorDetailsModal";
import styles from "./PurchasingModal.module.css";

const PurchasingModal = props => {
    const {model, expandFunction, area} = props;

    return (
        <>
        <div className={styles.whiteOut}></div>
        {area === "vendors" && 
            <VendorDetailsModal 
                id={model.businessEntityId}
                expandFunction={expandFunction}
                limitedVendor={model}
            />
        }
        {area === "orders" &&
            <PurchaseDetailsModal 
                id={model.purchaseOrderDetailId}
                expandFunction={expandFunction}
            />
        }
        </>

    );
};

export default PurchasingModal;