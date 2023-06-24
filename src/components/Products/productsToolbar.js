import styles from "./productsToolbar.module.css"
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { applyProductFilter, setProductFilter } from "../../store/slices/productSlice";
import { applyInventoryFilter, setInventoryFilter } from "../../store/slices/inventorySlice";

const ProductsToolbar = props => {
    const {area} = props;
    const dispatch = useDispatch();

    const handleSearch = () => {
        if (area === 'catalog') dispatch(applyProductFilter());
        else dispatch(applyInventoryFilter());
    };

    return (
        <section>
            <div className={styles.titleContainer}>
                <h1>Products</h1>
            </div>
            <div className={styles.toolbar}>
                <div className={styles.links}>
                    <Link to="/catalog" className={styles.productsLink}>
                        {area === 'catalog' && <img src="../../images/blueVector.png" alt="catalog is selected" /> }
                        <div>Catalog</div>
                    </Link>
                    <Link to="/inventory" className={styles.productsLink}>
                        {area === 'inventory' && <img src="../../images/blueVector.png" alt="inventory is selected" /> }
                        <div>Inventory</div>
                    </Link>
                </div>

                {/* SEARCH STILL BUSTED, FIGURE OUT WHY */}
                <div className={styles.searchArea}>
                    {area === 'catalog' && 
                        <input 
                            type="text"
                            onChange={evt => dispatch(setProductFilter(evt.target.value))}
                            onKeyUp={e => {
                            if (e.key === "Enter")
                            {
                                dispatch(applyProductFilter());
                            }
                        }}
                        />
                    }

                    {area === 'inventory' && 
                        <input 
                            type="text"
                            onChange={evt => dispatch(setInventoryFilter(evt.target.value))}
                            onKeyUp={e => {
                            if (e.key === "Enter")
                            {
                                dispatch(applyInventoryFilter());
                            }
                        }}
                        />
                    }

                    <div className={styles.searchIcon}>
                        <button className={styles.button} onClick={handleSearch}>
                            <img src="../../../images/SearchIcon.png" alt="search" />
                        </button>         
                    </div> 
                </div>
            </div>
        </section>
    );
};

export default ProductsToolbar;