import SaleDetailsModal from "../../containers/Purchasing/PurchaseDetailsModal";
import StoreDetailsModal from "../../containers/Purchasing/VendorDetailsModal";
import styles from "./SalesModal.module.css";

const SalesModal = props => {
    const {model, expandFunction, area} = props;

    const handleClose = () => {
        expandFunction({});
    };

    return (
        <>
        <div className={styles.whiteOut}></div>
        {area === "stores" && 
            <StoreDetailsModal 
                id={model.businessEntityId}
                expandFunction={expandFunction}
            />
        }
        {area === "customers" &&
            <SaleDetailsModal 
                id={model.saleOrderDetailId}
                expandFunction={expandFunction}
            />
        }
        </>

    );
};

export default SalesModal;