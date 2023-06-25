import { Link, useParams } from "react-router-dom";
import styles from "./PurchaseDetailsModal.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import PurchasingHeader from "../../components/Purchasing/PurchasingHeader";


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

const scrollToTop = () => {
    window.scrollTo({ top: 0 });
};

const PurchaseDetailsModal = props => {
    scrollToTop();

    const [purchase, setPurchase] = useState({});
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
        axios.get(`https://api.bootcampcentral.com/api/Purchase/${id}`)
            .then(resp => {
                setPurchase(resp.data);
                setSubTotal(resp.data.unitPrice * resp.data.quantity);
                setTotalDue(resp.data.unitPrice * resp.data.quantity + resp.data.freight + resp.data.taxAmt);
                setOrderDate(convertDate(resp.data.orderDate));
                setShipDate(convertDate(resp.data.shipDate));
            })
    }, [id]);

    return (
        <div className={styles.modalArea}>
            <section className={styles.purchaseSection}>

                {Object.keys(purchase).length === 0 && <h3>Loading...</h3>}
                {Object.keys(purchase).length !== 0 &&
                    <>
                        {/* Name Block */}
                        <div className={styles.nameBlock}>
                            <div className={styles.nameRow}>
                                <h1>{purchase.productName}</h1>
                                <h3>Qty: {purchase.quantity}</h3>
                            </div>
                            <div className={styles.nameSubHeadings}>
                                <p>{purchase.vendorName}</p>
                                <p>{convertDate(purchase.orderDate)}</p>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className={styles.mainContent}>
                            {/* Column 1 */}
                            <div className={styles.contentColumn}>
                                {/* Order Details */}
                                <div className={styles.contentBlock}>
                                    <div>
                                        <h4>Order Details</h4>
                                    </div>
                                    <div>
                                        <p>Order ID</p>
                                        <p>{purchase.purchaseOrderId}</p>
                                    </div>
                                    <div>
                                        <p>Order Date</p>
                                        <p>{orderDate}</p>
                                    </div>
                                    <div>
                                        <p>Product ID</p>
                                        <p>{purchase.productId}</p>
                                    </div>
                                    <div>
                                        <p>Product Name</p>
                                        <p>{purchase.productName}</p>
                                    </div>
                                    <div>
                                        <p>Product Number</p>
                                        <p>{purchase.productNumber}</p>
                                    </div>
                                    <div>
                                        <p>Line Total</p>
                                        <p>${purchase.lineTotal.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p>Qty Received</p>
                                        <p>{purchase.receivedQty.toFixed(0)}</p>
                                    </div>
                                    <div>
                                        <p>Qty Rejected</p>
                                        <p>{purchase.rejectedQty.toFixed(0)}</p>
                                    </div>
                                    <div>
                                        <p>Qty Stocked</p>
                                        <p>{purchase.stockedQty.toFixed(0)}</p>
                                    </div>
                                </div>

                                {/* Shipping Details */}
                                <div className={styles.contentBlock}>
                                    <div>
                                        <h4>Shipping Details</h4>
                                    </div>
                                    <div>
                                        <p>Method</p>
                                        <p>{purchase.shipMethodName}</p>
                                    </div>
                                    <div>
                                        <p>Ship Date</p>
                                        <p>{shipDate}</p>
                                    </div>
                                    <div>
                                        <p>Freight</p>
                                        <p>${purchase.freight.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p>Line Total</p>
                                        <p>${purchase.lineTotal.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p>Qty Recieved</p>
                                        <p>{purchase.receivedQty}</p>
                                    </div>
                                    <div>
                                        <p>Qty Rejected</p>
                                        <p>{purchase.rejectedQty}</p>
                                    </div>
                                    <div>
                                        <p>Qty stocked</p>
                                        <p>{purchase.stockedQty}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Column 2 */}
                            <div className={styles.contentColumn}>
                                {/* Pricing Details */}
                                <div className={styles.contentBlock}>
                                    <div>
                                        <h4>Pricing Details</h4>
                                    </div>
                                    <div>
                                        <p>Unit Price</p>
                                        <p>${purchase.unitPrice.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p>Order Quantity</p>
                                        <p>{purchase.quantity}</p>
                                    </div>
                                    <div>
                                        <p>Subtotal</p>
                                        <p>${subTotal.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p>Shipping Cost</p>
                                        <p>${purchase.freight.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p>Tax Amount</p>
                                        <p>${purchase.taxAmt.toFixed(2)}</p>
                                    </div>
                                    <hr />
                                    <div>
                                        <p>Total Due</p>
                                        <p>${totalDue.toFixed(2)}</p>
                                    </div>
                                </div>

                                {/* Vendor Details */}
                                <div className={styles.contentBlock}>
                                    <div>
                                        <h4>Vendor Details</h4>
                                    </div>
                                    <div>
                                        <p>Account Number</p>
                                        <p>{purchase.accountNumber}</p>
                                    </div>
                                    <div>
                                        <p>Business Entity ID</p>
                                        <p>{purchase.vendorId}</p>
                                    </div>
                                    <div>
                                        <p>Credit Rating</p>
                                        <p>{purchase.creditRating}</p>
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

export default PurchaseDetailsModal;