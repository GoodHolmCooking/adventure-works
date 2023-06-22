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
            <div>
                <h1>Products</h1>
            </div>
            <div>
                <div>
                    <Link to="/catalog">
                        {area === 'catalog' && <img src="../../images/RadialIcon.png" alt="catalog is selected" /> }
                        <div>Catalog</div>
                    </Link>
                    <Link to="/inventory">
                        {area === 'inventory' && <img src="../../images/RadialIcon.png" alt="inventory is selected" /> }
                        <div>Inventory</div>
                    </Link>
                </div>

                <div>
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

                    <div>
                        <button onClick={handleSearch}>
                            <img src="../../images/SearchIcon.png" alt="search" />
                        </button>         
                    </div> 
                </div>
            </div>
        </section>
    );
};

export default ProductsToolbar;