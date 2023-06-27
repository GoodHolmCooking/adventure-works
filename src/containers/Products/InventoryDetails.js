import styles from "./inventoryDetails.module.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductsToolbar from "../../components/Products/productsToolbar";
import { useSelector } from "react-redux";


const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

function InventoryDetails() {

    const { id } = useParams();
    const [inventory, setInventory] = useState({});

    const [editInventory, setEditInventory] = useState(false);

    const {inventoryItem} = useSelector(state => state.inventory);

    useEffect(() => {
        setInventory(inventoryItem);
    }, [inventoryItem]);


    useEffect(() => {
        toggleEditProduct();
    }, [inventory]);

    const toggleEditProduct = () => {
        setEditInventory(!editInventory);
    };

    return (
        <div>
            <ProductsToolbar area="inventory" />
            <section className={styles.details}>

                {Object.keys(inventory).length === 0 }
                {Object.keys(inventory).length !== 0 &&
                    <div>
                        <Link to="/inventory" className={styles.row}>
                            <img src="../../images/ArrowLeft.png" alt="navigate back" />
                            <p className={styles.button}>Back</p>
                        </Link>         

                        <div className={styles.detailsContent}>
                            <div>
                                <h1>{inventory.productName}</h1>
                                <p>Quantity</p>
                            </div>
                            <div>
                                <p>{inventory.locationName}</p>
                                <div className={styles.flex}>
                                    <img src="../../images/Minus.png" alt="minus icon" />
                                    <p>{inventory.quantity}</p>
                                    <img src="../../images/Plus.png" alt="plus icon" />
                                </div>
                                
                            </div>
                            <div>
                                <p>{inventory.shelf}</p>
                            </div>
                            <div>
                                <p>{inventory.bin}</p>
                                <div className={styles.deleteFlex}>
                                    <img src="../../images/delete.png" alt="trash icon"/>
                                    <p>Delete</p>
                                </div>
                                
                            </div>
                        </div>
                        

                        <div className={styles.detailsContent}>
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

                        <div className={styles.detailsContent}>
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

                        
                        <div className={styles.scroll}>
                            <button className={styles.scrollButton} onClick={scrollToTop}>
                                <img src="../../images/ArrowUp.png" alt="scroll to top" />
                                <p>Back to Top</p>
                            </button>
                        </div>
                        
                    </div>
                
                }

            </section>
        </div>
    );
};

export default InventoryDetails;