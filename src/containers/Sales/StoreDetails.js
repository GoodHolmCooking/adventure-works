import styles from "./StoreDetails.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Contact from "../../components/Purchasing/Contact";
import StoreContactForm from "../../components/Forms/StoreContactForm";
import { useDispatch } from "react-redux";
import SalesHeader from "../../components/Sales/SalesHeader";

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

function StoreDetails() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [store, setStore] = useState({});
    const [contacts, setContacts] = useState([]);
    const [emails, setEmails] = useState([]);


    const [editingName, setEditingName] = useState(false);
    const [editingContacts, setEditingContacts] = useState(false);

    // initial load
    useEffect(() => {
        axios.get(`/Order/store/${id}`)
            .then(resp => {
                setStore({
                    orderDate: resp.data.orderDate,
                    orderNumber: resp.data.orderNumber,
                    Name: resp.data.name
                });
                console.log(resp.data)

                setContacts(resp.data.contacts.map(contact => {
                    return {
                        personId: contact.businessEntityId,
                        personalTitle: contact.personalTitle,
                        firstName: contact.firstName,
                        middleName: contact.middleName,
                        lastName: contact.lastName,
                        suffix: contact.suffix,
                        contactTypeId: contact.contactTypeId
                    }
                }));

                setEmails(resp.data.contacts.map(contact => {
                    return {
                        businessEntityId: contact.businessEntityId,
                        emailAddressId: contact.emailAddressId,
                        emailAddress: contact.emailAddress
                    }
                }));

                
            });
    }, [id]);


    // close the edit view after the vendor changes are processed
    useEffect(() => {
        toggleEditName();
    }, [store]);

    const toggleEditName = () => {
        setEditingName(!editingName);
    };

    const toggleEditContacts = () => {
        setEditingContacts(!editingContacts);
    };

    return (
        <div>
            <SalesHeader area="stores" />
            <section className={styles.detailSection}>
                {Object.keys(store).length === 0 && <h3>Loading...</h3>}
                {Object.keys(store).length !== 0 && 
                    <div>
                        <Link to="/stores" className={styles.row} style={{textDecoration: 'none', color: '#212121'}}>
                            <img src="../../images/ArrowLeft.png" alt="navigate back" />
                            <p className={styles.backBtn}>Back</p>
                        </Link>

                        {/* Name Block */}
                        <div className={styles.nameBlock}>
                            <div className={styles.nameRow}>
                                <h1>{store.store}</h1>
                            </div>
                            <div className={styles.nameSubHeadings}>
                                <p>{store.orderDate}</p>
                                <p>{store.orderNumber}</p>
                            </div>
                        </div>
                        {/* Sale Details */}
                        <div className={styles.contentBlock}>
                            <div>
                                <h4>Sale Details</h4>
                            </div>
                            <div>
                                <p>Order Number</p>
                                <p>${store.orderNumber.toFixed(2)}</p>
                            </div>
                            <div>
                                <p>Tracking Number</p>
                                <p>{store.trackingNumber}</p>
                            </div>
                            <div>
                                <p>Order Quantity</p>
                                <p>${store.orderQuantity}</p>
                            </div>
                            <div>
                                <p>Product Name</p>
                                <p>${store.productName}</p>
                            </div>
                            <div>
                                <p>Product ID</p>
                                <p>${store.productId}</p>
                            </div>  
                            <div>
                                <p>Unit Price</p>
                                <p>${store.unitPrice}</p>
                            </div>
                            <div>
                                <p>Unit Price Discount</p>
                                <p>${store.unitPriceDiscount}</p>
                            </div>
                            <div>
                                <p>Line Total</p>
                                <p>${store.lineTotal}</p>
                            </div>                                                                                                              
                        </div>
                        {/* Store Information */}
                        <div className={styles.contentBlock}>
                            <div>
                                <h4>Store Information</h4>
                            </div>
                            <div>
                                <p>Annual Sales</p>
                                <p>${store.annualSales}</p>
                            </div>
                            <div>
                                <p>Bank</p>
                                <p>{store.bank}</p>
                            </div>
                            <div>
                                <p>Square Footage</p>
                                <p>${store.squareFootage}</p>
                            </div>
                            <div>
                                <p>Speciality</p>
                                <p>${store.speciality}</p>
                            </div>
                            <div>
                                <p>Total Employees</p>
                                <p>${store.totalEmployees}</p>
                            </div>                                                                                                               
                        </div>
                        {/* Previous Sales */}
                        <div className={styles.contentBlock}>
                            <div>
                                <h4>Previous Sales</h4>
                            </div>
                            <div>
                                <p>Order Date</p>
                                <p>${store.orderDate}</p>
                            </div>                                                                                                              
                        </div>                    
                        <section>
                            <div className={styles.headerRow}>
                                <h3>Contacts</h3>
                                <button className={styles.editBtn} onClick={toggleEditContacts}>
                                    <img src="../../images/Pencilicon.png" alt="edit store"/>
                                </button>
                            </div>
                            {!editingContacts && 
                                <ol className={styles.contentContainer}>
                                    {contacts.map(contact => {
                                        return (
                                            <Contact
                                                key={contact.businessEntityId}
                                                contact={contact}
                                                emails={emails}
                                            />
                                        );
                                    })}
                                </ol>
                            }
                            {editingContacts &&
                                <div className={styles.formContainer}>
                                    <StoreContactForm
                                        store={store}
                                        contacts={contacts}
                                        setContacts={setContacts}
                                        emails={emails}
                                        setEmails={setEmails}
                                        toggleEditView={toggleEditContacts}
                                    />
                                    <button className={styles.cancelBtn} onClick={toggleEditContacts}>Cancel</button>
                                </div>
                            }
                            <div className={styles.scrollRow}>
                            <button onClick={scrollToTop} className={styles.toTopBtn}>
                                <img src="../../images/ArrowUp.png" alt="scroll to top" />
                                <p>Back to Top</p>
                            </button>
                        </div>
                        </section>

                    </div>     
                }         
            </section>
        </div>
    );
}

export default StoreDetails;