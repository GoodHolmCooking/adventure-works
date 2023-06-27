import styles from "./catalog.module.css";
import { useNavigate } from "react-router-dom";

const Catalog = props => {
    const {product, setExpandedProduct} = props;
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/catalog/${product.productId}`);
    };

    const handleModal = () => {
        setExpandedProduct(product);
    };
    
    return (
        <div>
            <div className={styles.mobileCatalog}>
                <div className={styles.catalogContent}>
                    <div>{product.name}</div>
                    <div>{product.productNumber}</div>
                </div>
                <button className={styles.button} onClick={handleNavigate}>
                    <img src="./images/ArrowRight.png" alt="expand product" />
                </button>
            </div>

            <div className={styles.desktopCatalog}>
                <img src={`data:image/jpeg;base64,${product.thumbnailPhoto}`} alt="" />
                <p>{product.name}</p>
                <p>{product.productNumber}</p>
                <p>{product.color}</p>
                <p>${product.listPrice.toFixed(2)}</p>
                {/* sometimes there is no warranty, it appears blank, this is okay */}
                <p>{product.warranty}</p>
                <button className={styles.button} onClick={handleModal}>
                    <img src="./images/ArrowRight.png" alt="expand product" />
                </button>
            </div>
        </div>

);
}

export default Catalog;