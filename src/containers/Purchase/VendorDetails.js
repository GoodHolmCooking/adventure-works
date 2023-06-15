import styles from "./VendorDetails.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Contact from "../../components/Purchase/Contact";
import Address from "../../components/Purchase/Adress";
import VendorForm from "../../components/Forms/VendorForm";
import VendorContactForm from "../../components/Forms/VendorContactForm";
import { useDispatch, useSelector } from "react-redux";
import { loadVendorAsync, toggleContactEdit, toggleNameEdit } from "../../store/slices/vendorSlice";

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

                setAddresses(resp.data.addresses)
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

    const handleContactBlockSubmit = evt => {

    };

    return (
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
                            <button className={styles.editBtn}>
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

                        {/* {editingAddresses &&
                            <form className={styles.addressForm}>
                                {vendor.addresses.map(address => {
                                    return (
                                        <fieldset key={address.addressId}>
                                            <input type="text" defaultValue={address.addressTypeName} className={styles.addressInput} />
                                            <input type="text" defaultValue={address.addressLine1} className={styles.addressInput} />
                                            <input type="text" defaultValue={address.addressLine2} className={styles.addressInput} />
                                            <div className={styles.locationRow}>
                                                <input type="text" defaultValue={address.city} className={styles.addressInput} />
                                                <select className={styles.addressInput} >
                                                    <option value="">State/Province</option>
                                                    {address.countryRegionCode === "US" &&
                                                        USStates.map(USState => {
                                                            return (
                                                                <option value={USState.stateProvinceCode} key={USState.stateProvinceId}>{USState.stateProvinceCode}</option>
                                                            )
                                                        })
                                                    }
                                                    {address.countryRegionCode === "CA" &&
                                                        CAProvinces.map(province => {
                                                            return (
                                                                <option value={province.stateProvinceCode} key={province.stateProvinceId}>{province.stateProvinceCode}</option>
                                                            )
                                                        })
                                                    }
                                                    {address.countryRegionCode === "FR" &&
                                                        FRProvinces.map(province => {
                                                            return (
                                                                <option value={province.stateProvinceCode} key={province.stateProvinceId}>{province.stateProvinceCode}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <input type="text" defaultValue={address.postalCode} className={styles.addressInput} />
                                            <input type="text" defaultValue={address.countryRegionCode} className={styles.addressInput} />
                                        </fieldset>
                                    );
                                })}
                                <input type="submit" defaultValue="Save Changes" className={styles.saveBtn} />
                                <input type="button" defaultValue="Cancel" className={styles.addressCancelBtn} />
                            </form>
                        } */}

                    </section>
                </div>     
            }         
        </section>
    );
}

export default VendorDetails;