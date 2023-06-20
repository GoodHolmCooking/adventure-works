import styles from "./inventory.module.css";
import { Link } from "react-router-dom";

// location.js, product.js, productDetails.js

function inventoryList(props) {
    return (
        <Link to={`/inventory/${props.id}`}>
            <div>
                <div>
                    <div>{props.name}</div>
                    <div>{props.quantity}</div>
                    <div>{props.location}</div>
                </div>
                <img src="./images/ArrowRight.png" alt="" />
            </div>
        </Link>
    );
}

export default inventoryList;