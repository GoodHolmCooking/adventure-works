import styles from "./photo.module.css";

//this may not be using the correct props
//may need to incorporate: photoFileName AND/OR thumbnailPhoto, thumbnailPhotoFileName
const photo = props => {
    return (
        <ul className={styles.productDetails} key={props.productId}>
            <li>{props.photo}</li>
        </ul>
    );
};

export default photo;