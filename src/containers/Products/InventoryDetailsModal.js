import styles from "./inventoryDetailsModal.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const InventoryDetailsModal = props => {
    const { id, expandFunction } = props;

    const [inventory, setInventory] = useState({});

    // initial load
    useEffect(() => {
        axios.get(`https://api.bootcampcentral.com/api/Inventory/${id}`)
            .then(resp => {
                setInventory({
                    productId: resp.data.productId,
                    productName: resp.data.productName,
                    productNumber: resp.data.productNumber,
                    safetyStockLevel: resp.data.safetyStockLevel,
                    reorderPoint: resp.data.reorderPoint,
                    locationId: resp.data.locationId,
                    locationName: resp.data.locationName,
                    shelf: resp.data.shelf,
                    bin: resp.data.bin,
                    quantity: resp.data.quantity
                });
            });
    }, [id]);

    const handleClose = () => {
        expandFunction({});
    }

    return (
        <div className={styles.modalArea}>
            <section className={styles.modalDetails}>
                {Object.keys(inventory).length === 0 }
                {Object.keys(inventory).length !== 0 && 
                    <div>
                        <div className={styles.nameBlock}>
                            <div className={styles.header}>
                                <h1>{inventory.productName}</h1>
                                <p>Quantity</p>
                            </div>
                            {/* May not actually need subContent on each section */}
                            <div className={styles.subContent}>
                                <p>{inventory.locationName}</p>
                                <p>{inventory.quantity}</p>
                            </div>
                            <div className={styles.subContent}>
                                <p>{inventory.shelf}</p>
                            </div>
                            <div className={styles.subContent}>
                                <p>{inventory.bin}</p>
                                <img src="../../images/delete.png" alt="trash icon" /> {/* I don't think this is actually meant to function, just for looks */}
                                <p>Delete Item</p>
                            </div>
                        </div>
                        
                        <div className={styles.main}>
                            <div className={styles.columnsRow}>
                                <div className={styles.content}>
                                    <div>
                                        <h4>Product Details</h4>
                                    </div>
                                    <div>
                                        <p>Product Name</p>
                                        <p>{inventory.productName}</p>
                                    </div>
                                    <div>
                                        <p>Product ID</p>
                                        <p>{inventory.productId}</p>
                                    </div>
                                    <div>
                                        <p>Product Number</p>
                                        <p>{inventory.productNumber}</p>
                                    </div>
                                    <div>
                                        <p>Safety Stock Level</p>
                                        <p>{inventory.safetyStockLevel}</p>
                                    </div>
                                    <div>
                                        <p>Reorder Point</p>
                                        <p>{inventory.reorderPoint}</p>
                                    </div>
                                </div>
                            </div>
                        
                        

                            <div className={styles.columnsRow}>
                                <div className={styles.content}>
                                    <div>
                                        <h4>Location Details</h4>
                                    </div>
                                    <div>
                                        <p>Location</p>
                                        <p>{inventory.locationName}</p>
                                    </div>
                                    <div>
                                        <p>Location ID</p>
                                        <p>{inventory.locationId}</p>
                                    </div>
                                    <div>
                                        <p>Shelf</p>
                                        <p>{inventory.shelf}</p>
                                    </div>
                                    <div>
                                        <p>Bin</p>
                                        <p>{inventory.bin}</p>
                                    </div>
                                    <div>
                                        <p>Reorder Point</p>
                                        <p>{inventory.reorderPoint}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        

                        
                        <button className={styles.closeButton} onClick={handleClose}>
                            <img src="../../images/XIcon.png" alt="close modal"/>
                        </button>

                    </div>   
                }         
            </section>
        </div>
    );
}

export default InventoryDetailsModal;