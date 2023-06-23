import styles from "./StoreDetailsModal.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Contact from "../../components/Purchasing/Contact";
import StoreContactForm from "../../components/Forms/StoreContactForm";
import { useDispatch } from "react-redux";

const convertDate = date => {
    let tempDate = new Date(date);
    let month = tempDate.getMonth();
    let day = tempDate.getDay();
    let year = tempDate.getFullYear();
    let formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
};


const StoreDetailsModal = props => {
    const dispatch = useDispatch();
    const { id, expandFunction } = props;

    const [store, setStore] = useState({});
    const [contacts, setContacts] = useState([]);
    const [emails, setEmails] = useState([]);
    const [orderDate, setOrderDate] = useState(null);


    const [editingName, setEditingName] = useState(false);
    const [editingContacts, setEditingContacts] = useState(false);


    // initial load
    useEffect(() => {
        axios.get(`/Order/store/${id}`)
            .then(resp => {
                setStore({
                    orderDate: resp.data.orderDate,
                    orderNumber: resp.data.orderNumber,
                    storeName: resp.data.storeName
                });

                setContacts(resp.data.contacts.map(contact => {
                    return {
                        businessEntityId: contact.businessEntityId,
                        Id: contact.businessEntityId,
                        firstName: contact.firstName,
                        middleName: contact.middleName,
                        lastName: contact.lastName,
                        suffix: contact.suffix,
                        specialty: contact.contactTypeId,
                        
                    }
                }));

                setOrderDate(convertDate(resp.data.orderDate));

                // let allEmails = [];
                // resp.data.contacts.forEach(contact => {
                //     contact.emailAddresses.forEach(email => {
                //         allEmails.push(email);
                //     });
                // });

                // setEmails(allEmails);

            });
    }, [id]);


    
    useEffect(() => {
        toggleEditName();
    }, [store]);

    const toggleEditName = () => {
        setEditingName(!editingName);
    };

    const toggleEditContacts = () => {
        setEditingContacts(!editingContacts);
    };


    const handleClose = () => {
        expandFunction({});
    }

    return (
        <div className={styles.modalArea}>
            <section className={styles.detailSection}>
                {Object.keys(store).length === 0 && <h3>Loading...</h3>}
                {Object.keys(store).length !== 0 && 
                    <div>

                        {/* Name Block */}
                        <div className={styles.nameBlock}>
                            <div className={styles.nameRow}>
                                <h1>{store.storeName}</h1>
                            </div>
                            <div className={styles.nameSubHeadings}>
                                <p>{convertDate(store.orderDate)}</p>
                                <p>{store.orderNumber}</p>
                            </div>
                        </div>
                        {/* Main Content */}
                        <div className={styles.mainContent}>
                            {/* Column 1 */}
                            <div className={styles.contentColumn}></div>
                        {/* Sale Details */}
                        <div className={styles.contentBlock}>
                            <div>
                                <h4>Sale Details</h4>
                            </div>
                            <div>
                                <p>Order Number</p>
                                <p>{store.orderNumber}</p>
                            </div>
                            <div>
                                <p>Tracking Number</p>
                                <p>{store.carrierTrackingNumber}</p>
                            </div>
                            <div>
                                <p>Order Quantity</p>
                                <p>{store.orderQty}</p>
                            </div>
                            <div>
                                <p>Product Name</p>
                                <p>{store.productName}</p>
                            </div>
                            <div>
                                <p>Product ID</p>
                                <p>{store.productId}</p>
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
                                <p>{store.lineTotal}</p>
                            </div>                                                                                                              
                        </div>
                        {/* Store Information */}
                        <div className={styles.contentBlock}>
                            <div>
                                <h4>Store Information</h4>
                            </div>
                            <div>
                                <p>Annual Sales</p>
                                <p>{store.annualSales}</p>
                            </div>
                            <div>
                                <p>Bank</p>
                                <p>{store.bankName}</p>
                            </div>
                            <div>
                                <p>Square Footage</p>
                                <p>{store.squareFeet}</p>
                            </div>
                            <div>
                                <p>Speciality</p>
                                <p>{store.specialty}</p>
                            </div>
                            <div>
                                <p>Total Employees</p>
                                <p>{store.numberEmployees}</p>
                            </div>                                                                                                               
                        </div>
                        {/* Previous Sales */}
                        <div className={styles.contentBlock}>
                            <div>
                                <h4>Previous Sales</h4>
                            </div>
                            <div>
                                <p>Order Date</p>
                                <p>{convertDate(store.orderDate)}</p>
                            </div>                                                                                                              
                        </div> 
                
                        <section>
                        {/* Contact Section */}
                        <div className={styles.contentBlock}>
                            <div className={styles.headerRow}>
                                <h3>Contacts</h3>
                                <button className={styles.editBtn} onClick={toggleEditContacts}>
                                    <img src="../../images/Pencilicon.png" alt="edit store"/>
                                </button>
                            </div>
                            {!editingContacts && 
                                <ol className={styles.contactList}>
                                    {contacts.map(contact => {
                                        return (
                                            <Contact
                                                key={contact.Id}
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
                        </div>
                        </section>

                            {/* X Button */}
                            <button onClick={handleClose} className={styles.closeBtn}>
                                <img src="../../images/XIcon.png" alt="close modal"/>
                            </button>

                    </div>  
                    </div>     
                }         
            </section>
        </div>
    );

}

export default StoreDetailsModal;