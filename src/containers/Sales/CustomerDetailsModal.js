import styles from "./CustomerDetailsModal.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const convertDate = date => {
    let tempDate = new Date(date);
    let month = tempDate.getMonth();
    let day = tempDate.getDay();
    let year = tempDate.getFullYear();
    let formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
};

const CustomerDetails = props => {
    const [customer, setCustomer] = useState({});
    const [subTotal, setSubTotal] = useState(0);
    const [totalDue, setTotalDue] = useState(0);
    const [orderDate, setOrderDate] = useState(null);
    const [shipDate, setShipDate] = useState(null);
    const {expandFunction} = props;

    const { id } = props;

    const handleClose = () => {
        expandFunction({});
    };

    useEffect(() => {
        axios.get(`/Order/customer/${id}`)
            .then(resp => {
                setCustomer(resp.data);
                setSubTotal((resp.data.unitPrice - resp.data.unitPriceDiscount) * resp.data.orderQty);
                setTotalDue((resp.data.unitPrice - resp.data.unitPriceDiscount) * resp.data.orderQty + resp.data.taxAmt + resp.data.freight);
                setOrderDate(convertDate(resp.data.orderDate));
                setShipDate(convertDate(resp.data.shipDate));
            })
    }, [id]);

    return (
        <div className={styles.modalArea}>
            <section className={styles.customerSection}>

                {Object.keys(customer).length === 0 && <h3>Loading...</h3>}
                {Object.keys(customer).length !== 0 &&
                    <>
                        {/* Name Block */}
                        <div className={styles.nameBlock}>
                            <div className={styles.nameRow}>
                                <h1>{customer.firstName + " " + customer.lastName}</h1>
                            </div>
                            <div className={styles.nameSubHeadings}>
                                <p>{convertDate(customer.orderDate)}</p>
                                <p>{customer.orderNumber}</p>
                            </div>
                        </div>
                        
                        {/* Main Content */}
                    <div className={styles.mainContent}>
                            {/* Column 1 */}
                            <div className={styles.contentColumn}>
                        
                        {/* Customer Information */}
                        <div className={styles.contentBlock}>
                            <div>
                                <h4>Customer Information</h4>
                            </div>
                            <div>
                                <p>Name:</p>
                                <p>{customer.firstName + " " + customer.lastName}</p>
                            </div>
                            <div>
                                <p>Phone Type:  </p>
                                <p>{customer.phoneNumber}</p>
                            </div>
                            <div>
                                <p>Email:</p>
                                <p>{customer.emailAddress}</p>
                            </div>
                        </div>
                         {/* Sale Details */}
                        <div className={styles.contentBlock}>
                            <div>
                                <h4>Sale Details</h4>
                            </div>
                            <div>
                                <p>Order Number:</p>
                                <p>{customer.orderNumber}</p>
                            </div>
                            <div>
                                <p>Tracking Number:</p>
                                <p>{customer.freightNumber}</p>
                            </div>
                            <div>
                                <p>Product Name</p>
                                <p>{customer.productName}</p>
                            </div>
                            <div>
                                <p>Product ID</p>
                                <p>{customer.productId}</p>
                            </div>
                        </div>
                        </div>
                    {/* Column 2 */}
                    <div className={styles.contentColumn}>
                        {/* Shipping Info */}
                        <div className={styles.contentBlock}>
                            <div>
                                <h4>Shipping Information</h4>
                            </div>
                            <div>
                                <p>Ship Date</p>
                                <p>{convertDate(customer.shipDate)}</p>
                            </div>
                            <div>
                                <p>Method</p>
                                <p>{customer.shipMethodName}</p>
                            </div>
                            <div>
                                <p>Freight Number</p>
                                <p>{customer.freightNumber}</p>
                            </div>
                        </div>

                        {/* Pricing Details */}
                        <div className={styles.contentBlock}>
                            <div>
                                <h4>Pricing Details</h4>
                            </div>
                            <div>
                                <p>Unit Price</p>
                                <p>${customer.unitPrice.toFixed(2)}</p>
                            </div>
                            <div>
                                <p>Unit Price Discount</p>
                                <p>${customer.unitPriceDiscount.toFixed(2)}</p>
                            </div>
                            <div>
                                <p>Line Total</p>
                                <p>${customer.lineTotal.toFixed(2)}</p>
                            </div>
                            <div>
                                <p>Order Quantity</p>
                                <p>{customer.orderQty}</p>
                            </div>
                            <div>
                                <p>Subtotal</p>
                                <p>${(customer.unitPrice - customer.unitPriceDiscount) * customer.orderQty}</p>
                            </div>
                            <div>
                                <p>Shipping Cost</p>
                                <p>${customer.freight.toFixed(2)}</p>
                            </div>
                            <div>
                                <p>Tax Amount</p>
                                <p>${customer.taxAmt.toFixed(2)}</p>
                            </div>
                            <div>
                                <p>Total Due</p>
                                <p>${(customer.unitPrice - customer.unitPriceDiscount) * customer.orderQty + (customer.freight + customer.taxAmt)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                

                        {/* X Button */}
                        <button onClick={handleClose} className={styles.closeBtn}>
                            <img src="../../images/XIcon.png" alt="close modal"/>
                        </button>
                    </>      
                }

            </section>
        </div>
    );
};

export default CustomerDetails;