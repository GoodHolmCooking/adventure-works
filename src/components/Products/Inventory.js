// import styles from "./inventory.module.css";
// import { Link } from "react-router-dom";

// location.js, product.js, productDetails.js

// function inventoryList(props) {
//     return (
//         <Link to={`/inventory/${props.id}`}>
//             <div>
//                 <div>
//                     <div>{props.name}</div>
//                     <div>{props.quantity}</div>
//                     <div>{props.location}</div>
//                 </div>
//                 <img src="./images/ArrowRight.png" alt="" />
//             </div>
//         </Link>
//     );
// }

// export default inventoryList;


import { useNavigate } from "react-router-dom";
import styles from "./inventory.module.css";

const Inventory = props => {
    const {inventory, setExpandedInventory} = props;
    const navigate = useNavigate();

    const handleModal = () => {
        setExpandedInventory(inventory);
    };

    const handleNavigate = () => {
        navigate(`/inventoryProducts/${inventory.productId}`);
    };

    return (
    <>
        <div>
            <div>
                <div>
                    <p>{inventory.productName}</p>
                    <p>{inventory.locationName}</p>
                </div>
                <div>Qty {inventory.quantity}</div>
            </div>
            <button onClick={handleNavigate}>
                <img src="./images/ArrowRight.png" alt="expand inventory" />
            </button>
        </div>

        <div className={styles.purchaseBlockDesktop}>
            <p>{inventory.productName}</p>
            <p>{inventory.quantity}</p>
            <p>{inventory.productId}</p>
            <p>{inventory.location}</p>
            <p>{inventory.shelf}</p>
            <p>{inventory.bin}</p>
            <button className={styles.btn} onClick={handleModal}>
                <img src="./images/ArrowRight.png" alt="expand purchase order" />
            </button>
        </div>
    </>
    );
};

export default Inventory;