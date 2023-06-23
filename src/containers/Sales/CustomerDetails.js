import { Link, useParams } from "react-router-dom";
import styles from "../Sales/CustomerDetails.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import SalesHeader from "../../components/Sales/SalesHeader";

const convertDate = date => {
    let tempDate = new Date(date);
    let month = tempDate.getMonth();
    let day = tempDate.getDay();
    let year = tempDate.getFullYear();
    let formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const CustomerDetails = props => {
    const [customer, setcustomer] = useState({});
    const [subTotal, setSubTotal] = useState(0);
    const [totalDue, setTotalDue] = useState(0);
    const [orderDate, setOrderDate] = useState(null);
    const [shipDate, setShipDate] = useState(null);
    const [freightNumber, setFreightNumber] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [trackingNumber, setTrackingNumber] = useState(null);

    const { id } = useParams();


    useEffect(() => {
        axios.get(`https://api.bootcampcentral.com/api/Order/customer/${id}`)
            .then(resp => {
                setcustomer(resp.data);
                setSubTotal(resp.data.unitPrice * resp.data.quantity);
                setTotalDue(resp.data.unitPrice * resp.data.quantity + resp.data.freight + resp.data.taxAmt);
                setOrderDate(convertDate(resp.data.orderDate));
                setShipDate(convertDate(resp.data.shipDate));
                setFreightNumber(resp.data);
                setPhoneNumber(resp.data);
                setTrackingNumber(resp.data);
            })
    }, [id]);

    return (
        <div className={styles.customersPage}>
            <SalesHeader area="customers" />
            <section className={styles.customerSection}>

                {Object.keys(customer).length === 0 && <h3>Loading...</h3>}
                {Object.keys(customer).length !== 0 &&
                    <div>
                        <Link to="/customers" className={styles.backRow} style={{textDecoration: 'none', color: '#212121'}}>
                            <img src="../../images/ArrowLeft.png" alt="navigate back" />
                            <p className={styles.backBtn}>Back</p>
                        </Link>

                        {/* Name Block */}
                        <div className={styles.nameBlock}>
                            <div className={styles.nameRow}>
                                <h1>{customer.customer}</h1>
                            </div>
                            <div className={styles.nameSubHeadings}>
                                <p>{customer.orderDate}</p>
                                <p>{customer.orderNumber}</p>
                            </div>
                        </div>

                        {/* Shipping Info */}
                        <div className={styles.contentBlock}>
                            <div>
                                <h4>Shipping Information</h4>
                            </div>
                            <div>
                                <p>Ship Date</p>
                                <p>${customer.shipDate}</p>
                            </div>
                            <div>
                                <p>Method</p>
                                <p>{customer.shipMethodName}</p>
                            </div>
                            <div>
                                <p>Freight Number</p>
                                <p>${customer.freightNumber}</p>
                            </div>
                        </div>
                        {/* customer Information */}
                        <div className={styles.contentBlock}>
                            <div>
                                <h4>Customer Information</h4>
                            </div>
                            <div>
                                <p>Suffix First Middle Last Name Title</p>
                                <p>{customer.customerid}</p>
                            </div>
                            <div>
                                <p>Phone Type: PhoneNumber </p>
                                <p>{customer.phoneNumber}</p>
                            </div>
                            <div>
                                <p>Email: EmailAddress</p>
                                <p>{customer.email}</p>
                            </div>
                        </div>

                        {/* Customer Details */}
                        <div className={styles.contentBlock}>
                            <div>
                                <h4>Customer Details</h4>
                            </div>
                            <div>
                                <p>Order Number</p>
                                <p>{customer.orderNumber}</p>
                            </div>
                            <div>
                                <p>Tracking Number</p>
                                <p>{customer.trackingNumber}</p>
                            </div>
                            <div>
                                <p>Product Name</p>
                                <p>${customer.productName}</p>
                            </div>
                            <div>
                                <p>Product ID</p>
                                <p>${customer.productId}</p>
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
                                <p>${customer.totalDue}</p>
                            </div>
                        </div>
                        <div className={styles.scrollRow}>
                            <button onClick={scrollToTop} className={styles.toTopBtn}>
                                <img src="../../images/ArrowUp.png" alt="scroll to top" />
                                <p>Back to Top</p>
                            </button>
                        </div>
                        
                    </div>
                
                }

            </section>
        </div>
    );
};

export default CustomerDetails;