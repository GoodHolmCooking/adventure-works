import styles from "./VendorDetails.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Contact from "../../components/Purchase/Contact";
import Address from "../../components/Purchase/Adress";
import VendorForm from "../../components/Forms/VendorForm";

function VendorDetails() {
    const [vendor, setVendor] = useState(null);
    const [detailsLoaded, setDetailsLoaded] = useState(false);
    const { id } = useParams();

    const [editingName, setEditName] = useState(false);
    const [vendorName, setVendorName] = useState(null);
    const [vendorPhone, setVendorPhone] = useState({});
    const [vendorPhoneNumber, setVendorPhoneNumber] = useState(null);
    const [vendorId, setVendorId] = useState(null);

    const [editingContacts, setEditContacts] = useState(false);
    // const [contacts, setContacts] = useState([]);

    const [editingAddresses, setEditAddresses] = useState(false);
    const [FRProvinces, setFRProvinces] = useState([]);
    const [CAProvinces, setCAProvinces] = useState([]);
    const [USStates, setUSStates] = useState([]);


    // If all else fails, you can run a loop grabbing each state and creating a dictionary. There shouldn't be too many addresses for each entry.

    // inital load
    useEffect(() => {
        console.log(`Loading vendor with id ${id}`);
        axios.get(`https://api.bootcampcentral.com/api/Vendor/${id}`)
        .then(resp => {
            setVendor(resp.data);
            setVendorName(resp.data.vendorName);

            // primary phone is first number of first contact
            setVendorPhone(resp.data.contacts[0].phoneNumbers[0]);
            setVendorPhoneNumber(resp.data.contacts[0].phoneNumbers[0].phoneNumber);
            setVendorId(resp.data.businessEntityId);
            // setContacts(resp.data.contacts);
            setDetailsLoaded(true);
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        });
    }, [id]);

    // load provinces
    useEffect(() => {
        axios.get(`https://api.bootcampcentral.com/api/StateProvince/US`)
            .then(resp => {
                setUSStates(resp.data);
            })
            .catch(err => {
                console.log(`Error: ${err}`);
            });

            axios.get(`https://api.bootcampcentral.com/api/StateProvince/FR`)
            .then(resp => {
                setFRProvinces(resp.data);
            })
            .catch(err => {
                console.log(`Error: ${err}`);
            });

            axios.get(`https://api.bootcampcentral.com/api/StateProvince/CA`)
            .then(resp => {
                setCAProvinces(resp.data);
            })
            .catch(err => {
                console.log(`Error: ${err}`);
            });
    }, []);

    const handleEditName = () => {
        setEditName(true);
    };

    const handleNameSubmit = (evt) => {
        evt.preventDefault();
        let nameValid = false;
        let idValid = false;

        // validate name
        // not null
        if (vendorName.length > 0) {
            nameValid = true;
        }
        else {
            alert("Enter a value for the vendor name");
        }

            // Keeping validation loose for names with odd characters or numbers.

        // validate id
        // not null
        if (vendorId && vendorId != id) {
            // not matching other ids
            axios.get(`https://api.bootcampcentral.com/api/Vendor/${vendorId}`)
            .then(() => {
                alert("ID already exists");
            })
            .catch(() => {
                idValid = true;
            });
        }
        
        
        if (nameValid && idValid) {
            let vendorUpdate = { ...vendor, businessEntityId: vendorId, vendorName: vendorName};

            setVendor(vendorUpdate);
    
            axios.put(`https://api.bootcampcentral.com/api/Vendor/${id}`, vendorUpdate);
        }


        // Blocked until Drew updates API or tells you what you did wrong

        // let phoneUpdate = { 
        //     businessEntityId: +id, 
        //     newPhoneNumber: vendorPhoneNumber, 
        //     originalPhoneNumber: vendorPhone.phoneNumber,
        //     newPhoneNumberTypeId: vendorPhone.phoneNumberTypeId,
        //     originalPhoneNumberTypeId: vendorPhone.phoneNumberTypeId
        // };

        // console.log(phoneUpdate);
        // axios.put(`https://api.bootcampcentral.com/api/Phone/${id}`, phoneUpdate);

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

        // Name
        // validate name
        // has data
        // letters only

        // Phone
        // proper length
        numberToPhone()
        
        // Email


        setEditContacts(false);
    };

    // To simplify validation. Phone numbers are entered as a number and converted to dashed format.
    // 8595550100 becomes 859-555-0100
    function phoneToNumber(phoneToConvert) {
        // 859-555-0100
        let area = phoneToConvert.substring(0, 3);
        let firstSet = phoneToConvert.substring(4, 7);
        let secondSet = phoneToConvert.substring(8);
        let combinedNumber = area + firstSet + secondSet;

        return +combinedNumber;
    }

    function numberToPhone(providedNumber) {
        // 8595550100
        let convertedString = providedNumber.toString();
        let area = convertedString.substring(0, 3);
        let firstSet = convertedString.substring(3, 6);
        let secondSet = convertedString.substring(6);
        let combo = area + "-" + firstSet + "-" + secondSet;
        return combo;
    }

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
                    <Link to="/vendors" className={styles.row} style={{textDecoration: 'none', color: '#212121'}}>
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
                        <div>
                            <VendorForm 
                                vendor={vendor}
                            />
                            <button className={styles.cancelBtn} onClick={handleNameCancel}>Cancel</button>
                        </div>

                        // <form className={styles.nameBlock} onSubmit={handleNameSubmit}>
                        //     <input type="text" defaultValue={vendor.vendorName} className={styles.nameInput} onChange={evt => setVendorName(evt.target.value)} />
                        //     <input type="text" defaultValue={vendor.contacts[0].phoneNumbers[0].phoneNumber} onChange={evt => setVendorPhoneNumber(evt.target.value)} />
                        //     <input type="number" defaultValue={id} onChange={evt => setVendorId(evt.target.value)} />
                        //     <input type="submit" defaultValue="Save Changes" className={styles.saveBtn} />
                        //     <input type="button" defaultValue="Cancel" className={styles.cancelBtn} onClick={handleNameCancel} />
                        // </form>
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
                                        <Contact
                                            key={contact.personId}
                                            personalId={contact.personId}
                                            personalTitle={contact.personalTitle}
                                            firstName={contact.firstName}
                                            middleName={contact.middleName}
                                            lastName={contact.lastName}
                                            typeName={contact.typeName}
                                            phoneNumbers={contact.phoneNumbers}
                                            emailAddresses={contact.emailAddresses}
                                        />
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
                                                <input type="number" defaultValue={phoneToNumber(contact.phoneNumbers[0].phoneNumber)} className={styles.phoneInput} />
                                            </div>
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