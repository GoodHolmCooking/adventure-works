import { useEffect, useState } from "react";   
import Sale from "../../components/Sales/Sale";
import { useDispatch, useSelector } from "react-redux";
import { applySalesFilter, loadSalesAsync } from "../../store/slices/customerSlice";
import SalesHeader from "../../components/Sales/SalesHeader";
import styles from "./Customers.module.css"
import SalesModal from "../../components/Sales/SalesModal";

const Customers = props => {
    const {customers, displayCustomers} = useSelector(state => state.customers);
    const [loading, setLoading] = useState(true);
    const [expandedSale, setExpandedSale] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        if (!customers.length) {
            console.log("Did not crash. Authentically loading...")
            dispatch(loadSalesAsync())
                .then(() => {
                    dispatch(applySalesFilter());
                });
        }
    }, [dispatch]);

    useEffect(() => {
        if (displayCustomers.length) {
            setLoading(false);
        }
    }, [displayCustomers])

    return (
        <div>
            <SalesHeader area="customers" />
            <section className={styles.SalesPage}>
                {loading && <h3>Loading...</h3>}
                {!loading && 
                    <div className={styles.desktopHeader}>
                        <h3 className={styles.SaleHeading}>Sale</h3>
                        <h3 className={styles.orderDateHeading}>Order Date</h3>
                        <h3 className={styles.orderNameHeading}>Order Name</h3>
                        <h3 className={styles.orderQtyHeading}>Order Qty</h3>
                        <h3 className={styles.shipDateHeadingHeading}>Ship Date</h3>
                        <h3 className={styles.unitPriceHeading}>Unit Price</h3>  
                        <h3 className={styles.totalDueHeading}>Total Due</h3> 
                    </div>
                }
                {!loading && displayCustomers.map(customer => {

                    return (
                        <Sale 
                            key={Sale.SaleOrderDetailId}
                            Sale={Sale}
                            setExpandedSale={setExpandedSale}
                        />
                    );
                })}

                {Object.keys(expandedSale).length !== 0 && 
                    <SalesModal model={expandedSale} expandFunction={setExpandedSale} area="Customers" />
                }
            </section>
        </div>
    );
}

export default Customers;