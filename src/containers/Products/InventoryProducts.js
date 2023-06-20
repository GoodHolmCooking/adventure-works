import { useEffect, useState } from "react";
import Inventory from "../../components/Products/Inventory";
import axios from "axios";

function InventoryProducts() {
    const [products, setProducts] = useState([]);
    const [productsLoaded, setLoading] = useState(false);

    useEffect(() => {
            axios.get("https://api.bootcampcentral.com/api/inventory")
                .then(resp => {
                    setProducts(resp.data);
                    setLoading(true);
                })
                .catch(err => {
                    console.log(`Error: ${err}`);
                });
    }, []);

    return (
        <section>
            {!productsLoaded}
            {products && products.map(inventory => {

                return (
                    <Inventory 
                        key={inventory.productId}
                        id={inventory.productId}
                        name={inventory.productName}
                        quantity={inventory.quantity}
                        location={inventory.locationName}
                    />
                );
            })}
        </section>
    );
}

export default InventoryProducts;