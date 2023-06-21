import styles from "./StoreDetails.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Contact from "../../components/Purchasing/Contact";
import StoreForm from "../../components/Forms/VendorForm";
import StoreContactForm from "../../components/Forms/VendorContactForm";
import { useDispatch, useSelector } from "react-redux";
import { loadProvincesAsync, loadStoreAsync, toggleContactEdit, toggleNameEdit } from "../../store/slices/storeSlice";
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
        axios.get(`https://api.bootcampcentral.com/api/Store/${id}`)
            .then(resp => {
                setStore({
                    orderDate: resp.data.orderDate,
                    salesOrderNumber: resp.data.salesOrderNumber,
                    storeName: resp.data.storeName
                });

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

                let allEmails = [];
                resp.data.contacts.forEach(contact => {
                    contact.emailAddresses.forEach(email => {
                        allEmails.push(email);
                    });
                });

                setEmails(allEmails);

                
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

                        {/* Name Section */}
                        {!editingName && 
                            <div className={styles.nameBlock}>
                                <div className={styles.headerRow}>
                                    <h1>{store.storeName}</h1>
                                    <button className={styles.editBtn} onClick={toggleEditName}>
                                        <img src="../../images/Pencilicon.png" alt="edit vendor"/>
                                    </button>
                                    
                                </div>
                                <div className={styles.blockSubContainer}>
                                    
                                    <p>{id}</p>
                                </div>
                            </div>
                        }

                        { editingName &&
                            <div className={styles.formContainer}>
                                <StoreForm 
                                    store={store}
                                    setStore={setStore}
                                    toggleEdit={toggleEditName}
                                />
                                <button className={styles.cancelBtn} onClick={toggleEditName}>Cancel</button>
                            </div>
                        }

                        <section>
                            <div className={styles.headerRow}>
                                <h3>Contacts</h3>
                                <button className={styles.editBtn} onClick={toggleEditContacts}>
                                    <img src="../../images/Pencilicon.png" alt="edit vendor"/>
                                </button>
                            </div>
                            {!editingContacts && 
                                <ol className={styles.contentContainer}>
                                    {contacts.map(contact => {
                                        return (
                                            <Contact
                                                key={contact.personId}
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
                        </section>

                    </div>     
                }         
            </section>
        </div>
    );
}

export default StoreDetails;