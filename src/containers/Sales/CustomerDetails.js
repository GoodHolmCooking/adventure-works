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
    const [customer, setCustomer] = useState({});
    const [subTotal, setSubTotal] = useState(0);
    const [totalDue, setTotalDue] = useState(0);
    const [orderDate, setOrderDate] = useState(null);
    const [shipDate, setShipDate] = useState(null);
    const [freightNumber, setFreightNumber] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [carrierTrackingNumber, setCarrierTrackingNumber] = useState(null);

    const { id } = useParams();


    useEffect(() => {
        axios.get(`Order/customer/${id}`)
            .then(resp => {
                setCustomer(resp.data);
                setSubTotal(resp.data.unitPrice * resp.data.quantity);
                setTotalDue(resp.data.unitPrice * resp.data.quantity + resp.data.freight + resp.data.taxAmt);
                setOrderDate(convertDate(resp.data.orderDate));
                setShipDate(convertDate(resp.data.shipDate));
                setFreightNumber(resp.data.freightNumber);
                setPhoneNumber(resp.data.phoneNumber);
                setCarrierTrackingNumber(resp.data.carrierTrackingNumber);
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
                                <h1>{customer.firstName + " " + customer.lastName}</h1>
                            </div>
                            <div className={styles.nameSubHeadings}>
                                <p>{convertDate(customer.orderDate)}</p>
                                <p>{customer.orderNumber}</p>
                            </div>
                        </div>

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