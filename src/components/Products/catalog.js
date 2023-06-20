import styles from "./catalog.module.css";
import { Link } from "react-router-dom";

//summary.js, productDescription.js, warranty.js, manufacturing.js, photo.js

function catalogList(props) {
    return (
        <Link to={`/catalog/${props.id}`}>
            <div>
                <div>
                    <div>{props.name}</div>
                    <div>{props.number}</div>
                </div>
                <img src="./images/ArrowRight.png" alt="" />
            </div>
        </Link>
    );
}

export default catalogList;