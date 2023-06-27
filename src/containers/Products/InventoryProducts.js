import styles from "./InventoryProducts.module.css"
import { useEffect, useState } from "react";
import Inventory from "../../components/Products/Inventory";
import { useDispatch, useSelector } from "react-redux";
import { applyInventoryFilter, loadInventoryAsync } from "../../store/slices/inventorySlice";
import ProductsToolbar from "../../components/Products/productsToolbar";
import ProductModal from "../../components/Products/ProductModal";

const InventoryProducts = props => {
    const {inventory, displayInventory} = useSelector(state => state.inventory);
    const [loading, setLoading] = useState(true);
    const [expandedInventory, setExpandedInventory] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        if (!inventory.length) {
            dispatch(loadInventoryAsync())
                .then(() => {
                    dispatch(applyInventoryFilter());
                });
        };
    }, [dispatch]);

    useEffect(() => {
        if (displayInventory.length) {
            setLoading(false);
        }
    }, [displayInventory])

    return (
        <div>
            <ProductsToolbar area="inventory" />
            <section className={styles.inventorySpacing}>
                {loading}
                {!loading && 
                    <div className={styles.desktopView}>
                        <h3 className={styles.name}>Product Name</h3>
                        <h3 className={styles.quantity}>Qty</h3>
                        <h3 className={styles.id}>Product ID</h3>
                        <h3 className={styles.location}>Location</h3>
                        <h3 className={styles.shelf}>Shelf</h3>
                        <h3 className={styles.bin}>Bin</h3>
                        <h3 className={styles.options}>Options</h3>
                    </div>
                }

                {!loading && displayInventory.map(inventory => {

                    let compKey = inventory.productId.toString() + "-" + inventory.locationId.toString();

                    return (
                        <Inventory 
                            key={compKey}
                            inventory={inventory}
                            setExpandedInventory={setExpandedInventory}
                        />
                    );
                })}

                {Object.keys(expandedInventory).length !== 0 && 
                    <ProductModal model={expandedInventory} expandFunction={setExpandedInventory} area="inventory" />
                }
            </section>
        </div>
    );
}

export default InventoryProducts;