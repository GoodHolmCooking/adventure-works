import styles from "./ProductModal.module.css";
import CatalogDetailsModal from "../../containers/Products/CatalogDetailsModal";
import InventoryDetailsModal from "../../containers/Products/InventoryDetailsModal";

const ProductModal = props => {
    const {model, expandFunction, area} = props;

    const handleClose = () => {
        expandFunction({});
    };

    return (
        <>
        <div className={styles.whiteOut}></div>
        {area === "catalog" && 
            <CatalogDetailsModal 
                id={model.productId}
                expandFunction={expandFunction}
            />
        }
        {area === "inventory" &&
            <InventoryDetailsModal 
                inventory={model}
                id={model.productId}
                expandFunction={expandFunction}
            />
        }
        </>
    );
};

export default ProductModal;