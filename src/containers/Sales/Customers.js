import { useEffect, useState } from "react";   
import Customer from "../../components/Sales/Customer";
import { useDispatch, useSelector } from "react-redux";
import { applySalesFilter, loadSalesAsync } from "../../store/slices/customerSlice";
import SalesHeader from "../../components/Sales/SalesHeader";
import styles from "./Customers.module.css"
import SalesModal from "../../components/Sales/SalesModal";

const Customers = props => {
    const {customers, displayCustomers} = useSelector(state => state.customers);
    const [loading, setLoading] = useState(true);
    const [expandedCustomer, setExpandedCustomer] = useState({});
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
            <section className={styles.salesPage}>
                {loading && <h3>Loading...</h3>}
                {!loading && 
                    <div className={styles.desktopHeader}>
                        <h3 className={styles.CustomerNameHeading}>Customer</h3>
                        <h3 className={styles.orderDateHeading}>Order Date</h3>
                        <h3 className={styles.orderNumberHeading}>Order Number</h3>
                        <h3 className={styles.orderQtyHeading}>Order Qty</h3>
                        <h3 className={styles.shipDateHeading}>Ship Date</h3>
                        <h3 className={styles.unitPriceHeading}>Unit Price</h3>  
                        <h3 className={styles.totalDueHeading}>Total Due</h3> 
                    </div>
                }
                {!loading && displayCustomers.map(customer => {

                    return (
                        <Customer 
                            key={customer.Id}
                            customer={customer}
                            setExpandedCustomer={setExpandedCustomer}
                        />
                    );
                })}

                {Object.keys(expandedCustomer).length !== 0 && 
                    <SalesModal model={expandedCustomer} expandFunction={setExpandedCustomer} area="customers" />
                }
            </section>
        </div>
    );
}

export default Customers;