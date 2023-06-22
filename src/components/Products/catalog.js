
import { useState } from "react";
import styles from "./catalog.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Catalog = props => {
    const {product, setExpandedProduct} = props;
    const [primaryProduct, setPrimaryProduct] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        let productNumber = product.productNumber;
        let color = product.color;
        let listPrice = product.listPrice;

        setPrimaryProduct({productNumber, color, listPrice});
    }, [product]);

    const handleNavigate = () => {
        navigate(`/catalog/${product.productId}`);
    }

    const handleModal = () => {
        setExpandedProduct(product);
    }

    return (
        <div>
            <div>
                <div>
                    <div>{product.productName}</div>
                    <div>{product.productNumber}</div>
                </div>
                <button onClick={handleNavigate}>
                    <img src="./images/ArrowRight.png" alt="expand product" />
                </button>
            </div>

            <div>
                <p>{product.thumbnailPhoto}</p>
                <p>{product.productName}</p>
                <p>{product.productNumber}</p>
                <p>{product.color}</p>
                <p>{product.listPrice}</p>
                <p>{product.warranty}</p>
                <button onClick={handleModal}>
                    <img src="./images/ArrowRight.png" alt="expand product" />
                </button>
            </div>
        </div>

);
}

export default Catalog;