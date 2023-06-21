import { Link, useParams } from "react-router-dom";
import styles from "./CustomerDetails.module.css";
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
    const [sale, setSale] = useState({});
    const [subTotal, setSubTotal] = useState(0);
    const [totalDue, setTotalDue] = useState(0);
    const [orderDate, setOrderDate] = useState(null);
    const [shipDate, setShipDate] = useState(null);
    const [freightNumber, setFreightNumber] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [trackingNumber, setTrackingNumber] = useState(null);

    const { id } = useParams();


    useEffect(() => {
        axios.get(`https://api.bootcampcentral.com/api/Customer/${id}`)
            .then(resp => {
                setSale(resp.data);
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
        <div className={styles.purchasingPage}>
            <SalesHeader area="sales" />
            <section className={styles.saleSection}>

                {Object.keys(sale).length === 0 && <h3>Loading...</h3>}
                {Object.keys(sale).length !== 0 &&
                    <div>
                        <Link to="/sales" className={styles.backRow} style={{textDecoration: 'none', color: '#212121'}}>
                            <img src="../../images/ArrowLeft.png" alt="navigate back" />
                            <p className={styles.backBtn}>Back</p>
                        </Link>

                        {/* Name Block */}
                        <div className={styles.nameBlock}>
                            <div className={styles.nameRow}>
                                <h1>{sale.sale}</h1>
                            </div>
                            <div className={styles.nameSubHeadings}>
                                <p>{sale.orderDate}</p>
                                <p>{sale.orderNumber}</p>
                            </div>
                        </div>

                        {/* Shipping Info */}
                        <div className={styles.contentBlock}>
                            <div>
                                <h4>Shipping Information</h4>
                            </div>
                            <div>
                                <p>Ship Date</p>
                                <p>${sale.shipDate.toFixed(2)}</p>
                            </div>
                            <div>
                                <p>Method</p>
                                <p>{sale.shipMethodName}</p>
                            </div>
                            <div>
                                <p>Freight Number</p>
                                <p>${freightNumber.toFixed(2)}</p>
                            </div>
                        </div>
                        {/* sale Information */}
                        <div className={styles.contentBlock}>
                            <div>
                                <h4>sale Information</h4>
                            </div>
                            <div>
                                <p>Suffix First Middle Last Name Title</p>
                                <p>{sale.sale}</p>
                            </div>
                            <div>
                                <p>Phone Type: PhoneNumber </p>
                                <p>{phoneNumber}</p>
                            </div>
                            <div>
                                <p>Email: EmailAddress</p>
                                <p>{sale.email}</p>
                            </div>
                        </div>

                        {/* Sale Details */}
                        <div className={styles.contentBlock}>
                            <div>
                                <h4>Sale Details</h4>
                            </div>
                            <div>
                                <p>Order Number</p>
                                <p>{sale.orderNumber}</p>
                            </div>
                            <div>
                                <p>Tracking Number</p>
                                <p>{trackingNumber}</p>
                            </div>
                            <div>
                                <p>Product Name</p>
                                <p>${sale.productName.toFixed(2)}</p>
                            </div>
                            <div>
                                <p>Product ID</p>
                                <p>${sale.productId.toFixed(2)}</p>
                            </div>
                        </div>

                        {/* Pricing Details */}
                        <div className={styles.contentBlock}>
                            <div>
                                <h4>pricing Details</h4>
                            </div>
                            <div>
                                <p>Unit Price</p>
                                <p>{sale.unitPrice}</p>
                            </div>
                            <div>
                                <p>Unit Price Discount</p>
                                <p>{sale.unitPriceDiscount}</p>
                            </div>
                            <div>
                                <p>Line Total</p>
                                <p>{sale.lineTotal}</p>
                            </div>
                            <div>
                                <p>Order Quantity</p>
                                <p>{sale.orderQuantity}</p>
                            </div>
                            <div>
                                <p>Subtotal</p>
                                <p>{sale.subtotal}</p>
                            </div>
                            <div>
                                <p>Shipping Cost</p>
                                <p>{sale.shippingCost}</p>
                            </div>
                            <div>
                                <p>Tax Amount</p>
                                <p>{sale.taxAmount}</p>
                            </div>
                            <div>
                                <p>Total Due</p>
                                <p>${totalDue.toFixed(2)}</p>
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