import CustomerDetailsModal from "../../containers/Sales/CustomerDetailsModal";
import StoreDetailsModal from "../../containers/Sales/StoreDetailsModal";
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
                id={model.id}
                expandFunction={expandFunction}
            />
        }
        {area === "customers" &&
            <CustomerDetailsModal 
                id={model.id}
                expandFunction={expandFunction}
            />
        }
        </>

    );
};

export default SalesModal;