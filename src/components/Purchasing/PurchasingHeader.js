import { Link } from "react-router-dom";

const PurchasingHeader = props => {
    const handleSearch = evt => {
        console.log(evt.target.value);
    };

    return (
        <div>
            <Link to="/vendors">Vendors</Link>
            <Link to="/purchases">Orders</Link>
            <input onChange={evt => handleSearch(evt)} />
        </div>
    );
};

export default PurchasingHeader;