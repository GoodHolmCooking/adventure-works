// import { useEffect, useState } from "react";
// import Inventory from "../../components/Products/Inventory";
// import axios from "axios";

// function InventoryProducts() {
//     const [products, setProducts] = useState([]);
//     const [productsLoaded, setLoading] = useState(false);

//     useEffect(() => {
//             axios.get("https://api.bootcampcentral.com/api/inventory")
//                 .then(resp => {
//                     setProducts(resp.data);
//                     setLoading(true);
//                 })
//                 .catch(err => {
//                     console.log(`Error: ${err}`);
//                 });
//     }, []);

//     return (
//         <section>
//             {!productsLoaded}
//             {products && products.map(inventory => {

//                 return (
//                     <Inventory 
//                         key={inventory.productId}
//                         // id={inventory.productId}
//                         name={inventory.productName}
//                         quantity={inventory.quantity}
//                         location={inventory.locationName}
//                     />
//                 );
//             })}
//         </section>
//     );
// }

// export default InventoryProducts;

import { useEffect, useState } from "react";
import Inventory from "../../components/Products/Inventory";
import { useDispatch, useSelector } from "react-redux";
import { applyInventoryFilter, loadInventoryAsync } from "../../store/slices/inventorySlice";
import ProductsToolbar from "../../components/Products/productsToolbar";
import styles from "./InventoryProducts.module.css"
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
            <section>
                {loading}
                {!loading && 
                    <div>
                        <h3>Product Name</h3>
                        <h3>Qty</h3>
                        <h3>Product ID</h3>
                        <h3>Location</h3>
                        <h3>Shelf</h3>
                        <h3>Bin</h3>
                        <h3>Options</h3>
                    </div>
                }
                {!loading && displayInventory.map(inventory => {

                    return (
                        <Inventory 
                            key={inventory.productId}
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