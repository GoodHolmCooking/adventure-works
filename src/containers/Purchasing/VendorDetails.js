import styles from "./VendorDetails.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Contact from "../../components/Purchasing/Contact";
import Address from "../../components/Purchasing/Adress";
import VendorForm from "../../components/Forms/VendorForm";
import VendorContactForm from "../../components/Forms/VendorContactForm";
import { useDispatch, useSelector } from "react-redux";
import VendorAddressForm from "../../components/Forms/VendorAddressForm";
import { loadProvincesAsync, loadVendorAsync, toggleContactEdit, toggleNameEdit } from "../../store/slices/vendorSlice";
import PurchasingHeader from "../../components/Purchasing/PurchasingHeader";

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

function VendorDetails() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [vendor, setVendor] = useState({});
    const [contacts, setContacts] = useState([]);
    const [emails, setEmails] = useState([]);
    const [addresses, setAddresses] = useState([]);


    const [editingName, setEditingName] = useState(false);
    const [editingContacts, setEditingContacts] = useState(false);
    const [editingAddresses, setEditingAddresses] = useState(false);

    // initial load
    useEffect(() => {
        axios.get(`https://api.bootcampcentral.com/api/Vendor/${id}`)
            .then(resp => {
                setVendor({
                    businessEntityId: resp.data.businessEntityId,
                    accountNumber: resp.data.accountNumber,
                    vendorName: resp.data.vendorName,
                    creditRating: resp.data.creditRating
                });

                setContacts(resp.data.contacts.map(contact => {
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

                let allEmails = [];
                resp.data.contacts.forEach(contact => {
                    contact.emailAddresses.forEach(email => {
                        allEmails.push(email);
                    });
                });

                setEmails(allEmails);

                setAddresses(resp.data.addresses.map(address => {
                    return {
                        businessEntityId: address.businessEntityId,
                        addressId: address.addressId,
                        addressTypeId: address.addressTypeId,
                        addressTypeName: address.addressTypeName,
                        addressLine1: address.addressLine1,
                        addressLine2: address.addressLine2,
                        city: address.city,
                        stateProvinceId: address.stateProvinceId,
                        stateProvinceCode: address.stateProvinceCode,
                        stateProvinceName: address.stateProvinceCode,
                        postalCode: address.postalCode,
                        countryRegionCode: address.countryRegionCode,
                        countryRegionName: address.countryRegionCode
                    }
                }));
            });
    }, [id]);


    // close the edit view after the vendor changes are processed
    useEffect(() => {
        toggleEditName();
    }, [vendor]);

    const toggleEditName = () => {
        setEditingName(!editingName);
    };

    const toggleEditContacts = () => {
        setEditingContacts(!editingContacts);
    };

    const toggleEditAddresses = () => {
        setEditingAddresses(!editingAddresses);
    }

    return (
        <div className={styles.purchasingPage}>
            <PurchasingHeader area="vendors" />
            <section className={styles.detailSection}>
                {Object.keys(vendor).length === 0 && <h3>Loading...</h3>}
                {Object.keys(vendor).length !== 0 && 
                    <div>
                        <Link to="/vendors" className={styles.row} style={{textDecoration: 'none', color: '#212121'}}>
                            <img src="../../images/ArrowLeft.png" alt="navigate back" />
                            <p className={styles.backBtn}>Back</p>
                        </Link>

                        {/* Name Section */}
                        {!editingName && 
                            <div className={styles.nameBlock}>
                                <div className={styles.headerRow}>
                                    <h1>{vendor.vendorName}</h1>
                                    <button className={styles.editBtn} onClick={toggleEditName}>
                                        <img src="../../images/Pencilicon.png" alt="edit vendor"/>
                                    </button>
                                    
                                </div>
                                <div className={styles.blockSubContainer}>
                                    {/* <p>{vendor.contacts[0].phoneNumbers[0].phoneNumber}</p> */}
                                    <p>{id}</p>
                                </div>

                            </div>
                        }

                        { editingName &&
                            <div>
                                <VendorForm 
                                    vendor={vendor}
                                    setVendor={setVendor}
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
                                <ol>
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
                                <div>
                                    <VendorContactForm
                                        vendor={vendor}
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
                                <div>
                                    <VendorAddressForm  
                                        addresses={addresses}
                                        setAddresses={setAddresses}
                                        toggleEditView={toggleEditAddresses}
                                    />
                                    <input type="button" defaultValue="Cancel" className={styles.addressCancelBtn} onClick={toggleEditAddresses} />
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

export default VendorDetails;