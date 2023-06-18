
import VendorDetailsModal from "../../containers/Purchasing/VendorDetailsModal";
import styles from "./PurchasingModal.module.css";

const PurchasingModal = props => {
    const {vendor, setExpandedVendor, area} = props;

    const handleClose = () => {
        setExpandedVendor({});
    };

    return (
        <div className={styles.whiteOut}>
            {area === "vendors" && 
                <VendorDetailsModal 
                    id={vendor.businessEntityId}
                    setExpandedVendor={setExpandedVendor}
                />
            }
            {area === "purchases" &&
                <div>Purchase Details Modal</div>
            }
            
        </div>
    );
};

export default PurchasingModal;