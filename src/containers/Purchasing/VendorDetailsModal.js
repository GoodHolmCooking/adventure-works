import styles from "./VendorDetailsModal.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Contact from "../../components/Purchasing/Contact";
import Address from "../../components/Purchasing/Adress";
import VendorContactForm from "../../components/Forms/VendorContactForm";
import { useDispatch, useSelector } from "react-redux";
import VendorAddressForm from "../../components/Forms/VendorAddressForm";
import { loadProvincesAsync, toggleContactEdit, toggleNameEdit } from "../../store/slices/vendorSlice";
import PurchasingHeader from "../../components/Purchasing/PurchasingHeader";
import VendorNameForm from "../../components/Forms/VendorNameForm";

const scrollToTop = () => {
    console.log("Running scroll to top");
    window.scrollTo({ top: 0 });
};

const emailValid = email => {
    // regex pattern taken from online tutorial
    if (!email.match(/^[A-Za-z._\-0-9]*[@][A-Za-z-]*[.][a-z]{2,4}$/)) {
        return false;
    }
    else {
        return true;
    }
};

const phoneValid = phone => {
    // regex pattern generated through ChatGPT
    if (!phone.match(/^\d{3}-\d{3}-\d{4}$/)) {
        return false;
    }
    else {
        return true;
    }
};

const VendorDetailsModal = props => {
    const dispatch = useDispatch();
    const { id, expandFunction, limitedVendor } = props;
    const [completeVendor, setCompleteVendor] = useState({});

    // name block states
    const [vendorName, setVendorName] = useState("");
    const [primaryPhone, setPrimaryPhone] = useState("");

    // contact block states
    const [contacts, setContacts] = useState([]);
    const [emails, setEmails] = useState([]);
    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const [originalPhoneNumbers, setOriginalPhoneNumbers] = useState([]);

    // address block state
    const [addresses, setAddresses] = useState([]);


    const [editingName, setEditingName] = useState(false);
    const [editingContacts, setEditingContacts] = useState(false);
    const [editingAddresses, setEditingAddresses] = useState(false);

    // load complete vendor object
    useEffect(() => {
        axios.get(`https://api.bootcampcentral.com/api/Vendor/${id}`)
            .then(resp => {
                setCompleteVendor(resp.data); 
            });
    }, [id]);

    // limited vendor object should already be passed in. Get required information from limited object.
    useEffect(() => {
        setVendorName(limitedVendor.vendorName);

        // string needs to be converted to a number. State stores as a number for ease of entry then translates back to a string on update.
        setPrimaryPhone(limitedVendor.contactPhone);
    }, [limitedVendor]);

    useEffect(() => {
        scrollToTop();
    }, [limitedVendor]);

    // once the complete vendor is loaded, move the data into update components
    useEffect(() => {
        if (Object.keys(completeVendor).length !== 0) {

            // contacts in DB contain additional objects for phone numbers + emails
            // PUT only needs the below information
            setContacts(completeVendor.contacts.map(contact => {
                return {
                    businessEntityId: contact.businessEntityId,
                    personId: contact.businessEntityId,
                    personalTitle: contact.personalTitle,
                    firstName: contact.firstName,
                    middleName: contact.middleName,
                    lastName: contact.lastName,
                    suffix: contact.suffix,
                    contactTypeId: contact.contactTypeId
                }
            }));

            // PUT email uses complete object
            let allEmails = [];
            completeVendor.contacts.forEach(contact => {
                contact.emailAddresses.forEach(email => {
                    allEmails.push(email);
                });
            });
            setEmails(allEmails);

            // PUT phone uses complete object
            let allPhoneNumbers = [];
            completeVendor.contacts.forEach(contact => {
                contact.phoneNumbers.forEach(phoneNumber => {
                    allPhoneNumbers.push(phoneNumber);
                });
            });
            setPhoneNumbers(allPhoneNumbers); // changes with user input
            
            let legacyPhoneNumbers = [...allPhoneNumbers]; // I'm not sure if this is needed, but better safe than sorry.
            setOriginalPhoneNumbers(legacyPhoneNumbers); // holds legacy information

            setAddresses(completeVendor.addresses);
        }
    }, [completeVendor]);

    const toggleEditName = () => {
        setEditingName(!editingName);
    };

    const toggleEditContacts = () => {
        setEditingContacts(!editingContacts);
    };

    const toggleEditAddresses = () => {
        setEditingAddresses(!editingAddresses);
    }

    const handleClose = () => {
        expandFunction({});
    }

    return (
        <div className={styles.modalArea}>
            <section className={styles.detailSection}>
                {Object.keys(completeVendor).length === 0 && <h3>Loading...</h3>}
                {Object.keys(completeVendor).length !== 0 && 
                    <div>

                        {/* Name Section */}
                        {!editingName && 
                            <div className={styles.nameBlock}>
                                <div className={styles.headerRow}>
                                    <h1>{vendorName}</h1>
                                    <button className={styles.editBtn} onClick={toggleEditName}>
                                        <img src="../../images/Pencilicon.png" alt="edit vendor"/>
                                    </button>
                                </div>
                                <div className={styles.blockSubContainer}>
                                    <p>{primaryPhone}</p>
                                    <p>{id}</p>
                                </div>

                            </div>
                        }

                        { editingName &&
                            <div className={styles.formContainer}>
                                <VendorNameForm 
                                    vendorName={vendorName}
                                    setVendorName={setVendorName}
                                    primaryPhone={primaryPhone}
                                    setPrimaryPhone={setPrimaryPhone}
                                    toggleEditView={toggleEditName}
                                    completeVendor={completeVendor}
                                    limitedVendor={limitedVendor}
                                    phoneNumbers={phoneNumbers}
                                    id={id}
                                    phoneValid={phoneValid}
                                />
                                <button className={styles.cancelBtn} onClick={toggleEditName}>Cancel</button>
                            </div>
                        }

                        
                        <div className={styles.mainContent}>
                            {/* Contact Section */}
                            <section>
                                <div className={styles.headerRow}>
                                    <h3>Contacts</h3>
                                    <button className={styles.editBtn} onClick={toggleEditContacts}>
                                        <img src="../../images/Pencilicon.png" alt="edit vendor"/>
                                    </button>
                                </div>
                                {!editingContacts && 
                                    <ol className={styles.contactList}>
                                        {contacts.map(contact => {
                                            return (
                                                <Contact
                                                    key={contact.personId}
                                                    contact={contact}
                                                    emails={emails}
                                                    phoneNumbers={phoneNumbers}
                                                />
                                            );
                                        })}
                                    </ol>
                                }
                                {editingContacts &&
                                    <div className={styles.formContainer}>
                                        <VendorContactForm
                                            vendor={limitedVendor}
                                            contacts={contacts}
                                            setContacts={setContacts}
                                            emails={emails}
                                            setEmails={setEmails}
                                            toggleEditView={toggleEditContacts}
                                            phoneNumbers={phoneNumbers}
                                            setPhoneNumbers={setPhoneNumbers}
                                            originalPhoneNumbers={originalPhoneNumbers}
                                            setOriginalPhoneNumbers={setOriginalPhoneNumbers}
                                            phoneValid={phoneValid}
                                            emailValid={emailValid}
                                        />
                                        <button className={styles.cancelBtn} onClick={toggleEditContacts}>Cancel</button>
                                    </div>
                                } 
                            </section>

                            {/* Address Section */}
                            <section>
                                <div className={styles.headerRow}>
                                    <h3>Addresses</h3>
                                    <button className={styles.editBtn} onClick={toggleEditAddresses}>
                                        <img src="../../images/Pencilicon.png" alt="edit vendor"/>
                                    </button>
                                </div>

                                {!editingAddresses &&
                                    <ol>
                                        {addresses.map(address => {
                                            return (
                                            <Address 
                                                key={address.addressId}
                                                addressId={address.addressId}
                                                addressTypeName={address.addressTypeName}
                                                addressLine1={address.addressLine1}
                                                addressLine2={address.addressLine2}
                                                city={address.city}
                                                stateProvinceCode={address.stateProvinceCode}
                                                postalCode={address.postalCode}
                                                countryRegionCode={address.countryRegionCode}
                                            />
                                            );
                                        })}
                                    </ol>
                                }

                                {editingAddresses &&
                                    <div className={styles.formContainer}>
                                        <VendorAddressForm  
                                            addresses={addresses}
                                            setAddresses={setAddresses}
                                            toggleEditView={toggleEditAddresses}
                                        />
                                        <input type="button" defaultValue="Cancel" className={styles.cancelBtn} onClick={toggleEditAddresses} />
                                    </div>
                                }
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

export default VendorDetailsModal;