import styles from "./VendorDetails.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function VendorDetails() {
    const [vendor, setVendor] = useState(null);
    const [detailsLoaded, setDetailsLoaded] = useState(false);
    const { id } = useParams();

    const [editingName, setEditName] = useState(false);
    const [vendorName, setVendorName] = useState(null);
    const [vendorPhone, setVendorPhone] = useState(null);
    const [vendorId, setVendorId] = useState(null);

    const [editingContacts, setEditContacts] = useState(false);
    const [contacts, setContacts] = useState([]);

    const [editingAddresses, setEditAddresses] = useState(false);
    const [addresses, setAddresses] = useState([]);

    // inital load
    useEffect(() => {
        axios.get(`https://api.bootcampcentral.com/api/Vendor/${id}`)
        .then(resp => {
            setVendor(resp.data);
            setVendorName(resp.data.vendorName);

            // primary phone is first number of first contact
            setVendorPhone(resp.data.contacts[0].phoneNumbers[0].phoneNumber);
            setVendorId(resp.data.businessEntityId);
            setContacts(resp.data.contacts);
            setAddresses(resp.data.addresses);

            setDetailsLoaded(true);
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        });
    }, [id]);

    const handleEditName = () => {
        setEditName(true);
    };

    const handleNameSubmit = (evt) => {
        evt.preventDefault();
        let updatedContacts = [...contacts];

        // primary phone is first number of first contact
        updatedContacts[0].phoneNumbers[0].phoneNumber = vendorPhone;
        let vendorUpdate = { ...vendor, businessEntityId: vendorId, vendorName: vendorName, contacts: [...updatedContacts]};

        // This double update is to avoid updating the vendor object without updating the isolated contact object.
        setContacts(updatedContacts);
        setVendor(vendorUpdate);

        axios.put(`https://api.bootcampcentral.com/api/Vendor/${id}`, vendorUpdate);

        setEditName(false);
    };

    const handleNameCancel = () => {
        setEditName(false);
    };

    const handleEditContacts = () => {
        setEditContacts(true);
    };

    const handleContactsSubmit = evt => {
        evt.preventDefault();

        console.log("saving contacts");
        setEditContacts(false);
    };

    const handleContactsCancel = () => {
        setEditContacts(false);
    }

    const handleAddressesEdit = () => {
        setEditAddresses(true);
    }

    const handleAddressesSubmit = evt => {
        evt.preventDefault();
        console.log("Save addresses");
        setEditAddresses(false);
    }

    const handleAddressesCancel = () => {
        setEditAddresses(false);
    }

    return (
        <section className={styles.detailSection}>
            {!detailsLoaded && <h3>Loading...</h3>}
            {detailsLoaded && 
                <div>
                    <Link to="/purchases" className={styles.row} style={{textDecoration: 'none', color: '#212121'}}>
                        <img src="../../images/ArrowLeft.png" alt="navigate back" />
                        <p className={styles.backBtn}>Back</p>
                    </Link>

                    {/* Name Section */}
                    {!editingName && 
                        <div className={styles.nameBlock}>
                            <div className={styles.headerRow}>
                                <h1>{vendor.vendorName}</h1>
                                <button className={styles.editBtn} onClick={handleEditName}>
                                    <img src="../../images/Pencilicon.png" alt="edit vendor"/>
                                </button>
                                
                            </div>
                            <p>{vendor.contacts[0].phoneNumbers[0].phoneNumber}</p>
                            <p>{id}</p>
                        </div>
                    }
                    {editingName &&
                        <form className={styles.nameBlock} onSubmit={handleNameSubmit}>
                            <input type="text" defaultValue={vendor.vendorName} className={styles.nameInput} onChange={evt => setVendorName(evt.target.value)} />
                            <input type="text" defaultValue={vendor.contacts[0].phoneNumbers[0].phoneNumber} onChange={evt => setVendorPhone(evt.target.value)} />
                            <input type="text" defaultValue={id} onChange={evt => setVendorId(evt.target.value)} />
                            <input type="submit" defaultValue="Save Changes" className={styles.saveBtn} />
                            <input type="button" defaultValue="Cancel" className={styles.cancelBtn} onClick={handleNameCancel} />
                        </form>
                    }

                    <section>
                        <div className={styles.headerRow}>
                            <h3>Contacts</h3>
                            <button className={styles.editBtn} onClick={handleEditContacts}>
                                <img src="../../images/Pencilicon.png" alt="edit vendor"/>
                            </button>
                        </div>
                        {!editingContacts && 
                            <ol>
                                {vendor.contacts.map(contact => {
                                    return (
                                    <li className={styles.contentBlock} key={contact.personId}>
                                        <p>{contact.personalTitle} {contact.firstName} {contact.middleName} {contact.lastName}</p>
                                        <p>{contact.typeName}</p>
                                        <ul>
                                        {contact.phoneNumbers.map(phoneNumber => {
                                            return (<li key={phoneNumber.phoneNumberTypeId}>{phoneNumber.phoneNumberTypeName}: {phoneNumber.phoneNumber}</li>);
                                        })}
                                        </ul>

                                        <ul>
                                        {contact.emailAddresses.map(email => {
                                            return (<li key={email.emailAddressId}>Email: {email.emailAddress}</li>);
                                        })}
                                        </ul>
                                    </li>
                                    );
                                })}
                            </ol>
                        }
                        {editingContacts &&
                            <form className={styles.contentBlock} onSubmit={handleContactsSubmit}>
                                {vendor.contacts.map(contact => {
                                    return (
                                        <fieldset key={contact.personId} className={styles.contactForm}>
                                            <select>
                                                <option>Mr.</option>
                                                <option>Ms.</option>
                                                <option>Mrs.</option>
                                            </select>
                                            <input type="text" defaultValue={contact.firstName} />
                                            <input type="text" defaultValue={contact.middleName} />
                                            <input type="text" defaultValue={contact.lastName} />
                                            <input type="text" defaultValue={contact.contactTypeName} />
                                            <div className={styles.phoneContainer}>
                                                <select defaultValue="Phone Type">
                                                    <option>Work</option>
                                                    <option>Home</option>
                                                    <option>Cell</option>
                                                </select>
                                                <input type="text" defaultValue={contact.phoneNumbers[0].phoneNumber} className={styles.phoneInput} />
                                            </div>
                                 
                                            {/* {console.log(contact.emailAddresses[0].emailAddress)} */}
                                            <input type="text" defaultValue={contact.emailAddresses[0].emailAddress} />
                                        </fieldset>
                                    )
                                })}
                                <input type="submit" defaultValue="Save Changes" className={styles.saveBtn} />
                                <input type="button" defaultValue="Cancel" className={styles.cancelBtn} onClick={handleContactsCancel} />
                            </form>
                        } 
                    </section>

                    <section>
                        <div className={styles.headerRow}>
                            <h3>Addresses</h3>
                            <button className={styles.editBtn} onClick={handleAddressesEdit}>
                                <img src="../../images/Pencilicon.png" alt="edit vendor"/>
                            </button>
                        </div>

                        {!editingAddresses &&
                        <ol>
                            {vendor.addresses.map(address => {
                                return (
                                <li className={styles.contentBlock} key={address.addressId}>
                                    <p>{address.addressTypeName}</p>
                                    <p>{address.addressLine1}</p>
                                    <p>{address.addressLine2}</p>
                                    <p>{address.city}, {address.stateProvinceCode}</p>
                                    <p>{address.postalCode}</p>
                                    <p>{address.countryRegionCode}</p>
                                </li>
                                );
                            })}
                        </ol>
                        }
                        {editingAddresses &&
                        <form className={styles.addressForm} onSubmit={handleAddressesSubmit}>
                            {vendor.addresses.map(address => {
                                return (
                                    <fieldset key={address.addressId}>
                                        <input type="text" defaultValue={address.addressTypeName} className={styles.addressInput} />
                                        <input type="text" defaultValue={address.addressLine1} className={styles.addressInput} />
                                        <input type="text" defaultValue={address.addressLine2} className={styles.addressInput} />
                                        <div className={styles.locationRow}>
                                            <input type="text" defaultValue={address.city} className={styles.addressInput} />
                                            <select className={styles.addressInput} >
                                                <option value="">State</option>
                                                <option value="AL">AL</option>
                                                <option value="AK">AK</option>
                                                <option value="AZ">AZ</option>
                                                <option value="AR">AR</option>
                                                <option value="CA">CA</option>
                                                <option value="CO">CO</option>
                                                <option value="CT">CT</option>
                                                <option value="DE">DE</option>
                                                <option value="FL">FL</option>
                                                <option value="GA">GA</option>
                                                <option value="HI">HI</option>
                                                <option value="ID">ID</option>
                                                <option value="IL">IL</option>
                                                <option value="IN">IN</option>
                                                <option value="IA">IA</option>
                                                <option value="KS">KS</option>
                                                <option value="KY">KY</option>
                                                <option value="LA">LA</option>
                                                <option value="ME">ME</option>
                                                <option value="MD">MD</option>
                                                <option value="MA">MA</option>
                                                <option value="MI">MI</option>
                                                <option value="MN">MN</option>
                                                <option value="MS">MS</option>
                                                <option value="MO">MO</option>
                                                <option value="MT">MT</option>
                                                <option value="NE">NE</option>
                                                <option value="NV">NV</option>
                                                <option value="NH">NH</option>
                                                <option value="NJ">NJ</option>
                                                <option value="NM">NM</option>
                                                <option value="NY">NY</option>
                                                <option value="NC">NC</option>
                                                <option value="ND">ND</option>
                                                <option value="OH">OH</option>
                                                <option value="OK">OK</option>
                                                <option value="OR">OR</option>
                                                <option value="PA">PA</option>
                                                <option value="RI">RI</option>
                                                <option value="SC">SC</option>
                                                <option value="SD">SD</option>
                                                <option value="TN">TN</option>
                                                <option value="TX">TX</option>
                                                <option value="UT">UT</option>
                                                <option value="VT">VT</option>
                                                <option value="VA">VA</option>
                                                <option value="WA">WA</option>
                                                <option value="WV">WV</option>
                                                <option value="WI">WI</option>
                                                <option value="WY">WY</option>
                                            </select>
                                        </div>
                                        <input type="text" defaultValue={address.postalCode} className={styles.addressInput} />
                                        <input type="text" defaultValue={address.countryRegionCode} className={styles.addressInput} />
                                    </fieldset>
                                );
                            })}
                            <input type="submit" defaultValue="Save Changes" className={styles.saveBtn} />
                            <input type="button" defaultValue="Cancel" className={styles.addressCancelBtn} onClick={handleAddressesCancel} />
                        </form>
                        }

                    </section>
                </div>     
            }         
        </section>
    );
}

export default VendorDetails;