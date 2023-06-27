import styles from "./catalogProducts.module.css";
import { useEffect, useState  } from "react";
import Catalog from "../../components/Products/catalog";
import { useDispatch, useSelector } from "react-redux";
import { applyProductFilter, loadProductsAsync} from "../../store/slices/productSlice";
import ProductsToolbar from "../../components/Products/productsToolbar";
import ProductModal from "../../components/Products/ProductModal";

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
            <section className={styles.catalogSpacing}>
                {loading}
                {!loading && 
                    <div className={styles.desktopView}>
                        <h3 className={styles.photo}>Image</h3>
                        <h3 className={styles.name}>Product Name</h3>
                        <h3 className={styles.number}>Number</h3>
                        <h3 className={styles.color}>Color</h3>
                        <h3 className={styles.price}>List Price</h3>    
                        <h3 className={styles.warranty}>Warranty Period</h3>    
                        <h3 className={styles.options}>Options</h3>    
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