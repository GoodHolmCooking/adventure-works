// import { useEffect, useState } from "react";
// import Catalog from "../../components/Products/catalog";
// import axios from "axios";

import styles from "./catalogProducts.module.css";
import { useEffect, useState  } from "react";
import Catalog from "../../components/Products/catalog";
import { useDispatch, useSelector } from "react-redux";
import { applyProductFilter, loadProductsAsync} from "../../store/slices/productSlice";
import ProductsToolbar from "../../components/Products/productsToolbar";
import ProductModal from "../../components/Products/ProductModal";

// function CatalogProducts() {
//     const [products, setProducts] = useState([]);
//     const [productsLoaded, setLoading] = useState(false);

//     useEffect(() => {
//             axios.get("https://api.bootcampcentral.com/api/product")
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
//             {products && products.map(product => {

//                 return (
//                     <Catalog 
//                         key={product.productId}
//                         id={product.productId}
//                         name={product.name}
//                         number={product.productNumber}
//                     />
//                 );
//             })}
//         </section>
//     );
// }

// export default CatalogProducts;

function CatalogProducts() {
    const {products, displayProducts} = useSelector(state => state.products);
    const [loading, setLoading] = useState(true);
    const [expandedProduct, setExpandedProduct] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        if (!products.length) {
            dispatch(loadProductsAsync())
                .then(() => {
                    dispatch(applyProductFilter());
                });
        };
    }, [dispatch, products]);

    useEffect(() => {
        if (displayProducts.length) {
            setLoading(false);
        }
    }, [displayProducts]);

    return (
        <div>
            <ProductsToolbar area="catalog" />
            <section>
                {loading}
                {!loading && 
                    <div>
                        <h3>Image</h3>
                        <h3>Product Name</h3>
                        <h3>Number</h3>
                        <h3>Color</h3>
                        <h3>List Price</h3>    
                        <h3>Warranty Period</h3>    
                        <h3>Options</h3>    
                    </div>
                }

                {!loading && displayProducts.map(product => {
                    return (
                        <Catalog 
                            key={product.productId}
                            product={product}
                            setExpandedProduct={setExpandedProduct}
                        />
                    );
                })}

                {Object.keys(expandedProduct).length !== 0 && 
                    <ProductModal model={expandedProduct} expandFunction={setExpandedProduct} area="catalog" />
                }

            </section>
        </div>
    );
}

export default CatalogProducts;