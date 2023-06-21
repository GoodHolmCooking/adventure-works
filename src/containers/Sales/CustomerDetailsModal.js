import { Link, useParams } from "react-router-dom";
import styles from "./CustomerDetailsModal.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import SalesHeader from "../../components/Sales/SalesHeader";


// Imported date format: 2011-04-25T00:00:00
// Desired date format: 04/25/2011
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
        axios.get(`https://api.bootcampcentral.com/api/Customer/${id}`)
            .then(resp => {
                setCustomer(resp.data);
                setSubTotal(resp.data.unitPrice * resp.data.quantity);
                setTotalDue(resp.data.unitPrice * resp.data.quantity + resp.data.freight + resp.data.taxAmt);
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
                                <h1>{customer.productName}</h1>
                                <h3>Qty: {customer.quantity}</h3>
                            </div>
                            <div className={styles.nameSubHeadings}>
                                <p>{customer.vendorName}</p>
                                <p>{convertDate(customer.orderDate)}</p>
                            </div>
                        </div>
                        
                        {/* Main Content */}
                        <div className={styles.mainContent}>
                            {/* Column 1 */}
                            <div className={styles.contentColumn}>
                        {/* Shipping Info */}
                        <div className={styles.contentBlock}>
                            <div>
                                <h4>Shipping Information</h4>
                            </div>
                            <div>
                                <p>Ship Date</p>
                                <p>${customer.shipDate.toFixed(2)}</p>
                            </div>
                            <div>
                                <p>Method</p>
                                <p>{customer.shipMethodName}</p>
                            </div>
                            <div>
                                <p>Freight Number</p>
                                <p>${freightNumber.toFixed(2)}</p>
                            </div>
                        </div>
                        {/* Customer Information */}
                        <div className={styles.contentBlock}>
                            <div>
                                <h4>Customer Information</h4>
                            </div>
                            <div>
                                <p>Suffix First Middle Last Name Title</p>
                                <p>{customer.customerName}</p>
                            </div>
                            <div>
                                <p>Phone Type: PhoneNumber </p>
                                <p>{phoneNumber}</p>
                            </div>
                            <div>
                                <p>Email: EmailAddress</p>
                                <p>{customer.email}</p>
                            </div>
                        </div>

                        {/* Sale Details */}
                        <div className={styles.contentBlock}>
                            <div>
                                <h4>Sale Details</h4>
                            </div>
                            <div>
                                <p>Order Number</p>
                                <p>{customer.orderNumber}</p>
                            </div>
                            <div>
                                <p>Tracking Number</p>
                                <p>{trackingNumber}</p>
                            </div>
                            <div>
                                <p>Product Name</p>
                                <p>${customer.productName.toFixed(2)}</p>
                            </div>
                            <div>
                                <p>Product ID</p>
                                <p>${customer.productId.toFixed(2)}</p>
                            </div>
                        </div>

                        {/* Pricing Details */}
                        <div className={styles.contentBlock}>
                            <div>
                                <h4>pricing Details</h4>
                            </div>
                            <div>
                                <p>Unit Price</p>
                                <p>{customer.unitPrice}</p>
                            </div>
                            <div>
                                <p>Unit Price Discount</p>
                                <p>{customer.unitPriceDiscount}</p>
                            </div>
                            <div>
                                <p>Line Total</p>
                                <p>{customer.lineTotal}</p>
                            </div>
                            <div>
                                <p>Order Quantity</p>
                                <p>{customer.orderQuantity}</p>
                            </div>
                            <div>
                                <p>Subtotal</p>
                                <p>{customer.subtotal}</p>
                            </div>
                            <div>
                                <p>Shipping Cost</p>
                                <p>{customer.shippingCost}</p>
                            </div>
                            <div>
                                <p>Tax Amount</p>
                                <p>{customer.taxAmount}</p>
                            </div>
                            <div>
                                <p>Total Due</p>
                                <p>${totalDue.toFixed(2)}</p>
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