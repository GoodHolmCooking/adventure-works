import { useNavigate } from "react-router-dom";
import styles from "./inventory.module.css";

const Inventory = props => {
    const {inventory, setExpandedInventory} = props;
    const navigate = useNavigate();

    const handleModal = () => {
        setExpandedInventory(inventory);
    };

    const handleNavigate = () => {
        navigate(`/inventory/${inventory.productId}`);
    };

    return (
    <>
        <div className={styles.mobileInventory}>
            <div className={styles.inventoryContent}>
                <div className={styles.contentContainer}>
                    <p>{inventory.productName}</p>
                    <p>{inventory.locationName}</p>
                </div>
                <div>Qty {inventory.quantity}</div>
            </div>
            <button className={styles.button} onClick={handleNavigate}>
                <img src="./images/ArrowRight.png" alt="expand inventory" />
            </button>
        </div>

        <div className={styles.desktopInventory}>
            <p>{inventory.productName}</p>
            <p>{inventory.quantity}</p>
            <p>{inventory.productId}</p>
            <p>{inventory.locationName}</p>
            <p>{inventory.shelf}</p>
            <p>{inventory.bin}</p>
            <button  className={styles.button} onClick={handleModal}>
                <img src="./images/ArrowRight.png" alt="expand purchase order" />
            </button>
        </div>
    </>
    );
};

export default Inventory;