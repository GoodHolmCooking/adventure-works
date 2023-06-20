import { useEffect, useState } from "react";
import Catalog from "../../components/Products/catalog";
import axios from "axios";

function CatalogProducts() {
    const [products, setProducts] = useState([]);
    const [productsLoaded, setLoading] = useState(false);

    useEffect(() => {
            axios.get("https://api.bootcampcentral.com/api/product")
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
            {products && products.map(product => {

                return (
                    <Catalog 
                        key={product.productId}
                        id={product.productId}
                        name={product.name}
                        number={product.productNumber}
                    />
                );
            })}
        </section>
    );
}

export default CatalogProducts;