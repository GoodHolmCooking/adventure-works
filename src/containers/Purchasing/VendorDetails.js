import styles from "./VendorDetails.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Contact from "../../components/Purchasing/Contact";
import Address from "../../components/Purchasing/Adress";
import VendorContactForm from "../../components/Forms/VendorContactForm";
import { useDispatch, useSelector } from "react-redux";
import VendorAddressForm from "../../components/Forms/VendorAddressForm";
import PurchasingHeader from "../../components/Purchasing/PurchasingHeader";
import { useCallback } from "react";
import VendorNameForm from "../../components/Forms/VendorNameForm";

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

function phoneToNumber(phone) {
	// 859-555-0100 -> 8595550100
    console.log(`Running phone to number. Found ${phone}`);
    if (phone.includes("-")) {
        let area = phone.substring(0, 3);
        let firstSet = phone.substring(4, 7);
        let secondSet = phone.substring(8);
        let combinedNumber = area + firstSet + secondSet;
    
        console.log(`Found '-'. Returning ${combinedNumber}`);
        return +combinedNumber;
    }
    else {
        console.log(`No '-' found. Returning ${phone}`);
        return +phone;
    }
};

function numberToPhone(providedNumber) {
	// 8595550100 -> 859-555-0100
    console.log(`Running number to phone. Found ${providedNumber}`);
	let convertedString = providedNumber.toString();

    // this function could be run every time a character is removed.
    // characters should only be added when the phone is a complete number.
    if (convertedString.length === 10) {
        let area = convertedString.substring(0, 3);
        let firstSet = convertedString.substring(3, 6);
        let secondSet = convertedString.substring(6);
        let phone = area + "-" + firstSet + "-" + secondSet;
        console.log(`Found exactly 10 digits. Converted to ${phone}`);
        return phone;
    }

    // if the phone is not a complete number, just apply a conversion from a number to a string
    else {
        console.log(`Not 10 digits. Returning ${convertedString}`);
        return convertedString;
    }
}

function VendorDetails() {
    const dispatch = useDispatch();
    const { id } = useParams();

    // obj from /vendor contains different data from /vendor/id. Both objects are needed.
    const { limitedVendor } = useSelector(state => state.vendors); // from /vendor
    const [completeVendor, setCompleteVendor] = useState({}); // from /vendor/id

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

    // Due to how the vendor is loaded in, setting this state to false starts with the edit menu open.
    const [editingName, setEditingName] = useState(false);
    const [editingContacts, setEditingContacts] = useState(false);
    const [editingAddresses, setEditingAddresses] = useState(false);

    // toggle functions control whether the edit form is active or not
    const toggleEditName = () => {
        setEditingName(!editingName);
    };

    const toggleEditContacts = () => {
        setEditingContacts(!editingContacts);
    };

    const toggleEditAddresses = () => {
        setEditingAddresses(!editingAddresses);
    }

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
        setPrimaryPhone(limitedVendor.contactPhone);
    }, [limitedVendor]);

    useEffect(() => {
        if (phoneNumbers.length) {
            let tempPhoneNumbers = [...phoneNumbers];

            let updatePhoneNumberIndex = tempPhoneNumbers.findIndex(phoneNumber => {
                return phoneNumber.businessEntityId === limitedVendor.contactBusinessEntityId;
            });
    
            tempPhoneNumbers[updatePhoneNumberIndex] = {
                businessEntityId: limitedVendor.contactBusinessEntityId,
                phoneNumber: primaryPhone,
                phoneNumberTypeId: phoneNumbers[updatePhoneNumberIndex].phoneNumberTypeId,
                phoneNumberTypeName: phoneNumbers[updatePhoneNumberIndex].phoneNumberTypeName
            };
            setPhoneNumbers(tempPhoneNumbers);
        }
    }, [primaryPhone])

    // once the complete vendor is loaded, move the data into update components
    useEffect(() => {
        // contacts in DB contain additional objects for phone numbers + emails
        // PUT only needs the below information
        if ('contacts' in completeVendor) {
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
    
            // PUT phone uses complete object + legacy information
            let allPhoneNumbers = []; 

            completeVendor.contacts.forEach(contact => {
                contact.phoneNumbers.forEach(phoneNumber => {
                    allPhoneNumbers.push(phoneNumber);
                });
            });

            setPhoneNumbers(allPhoneNumbers); // changes when the user inputs data
            
            let legacyPhoneNumbers = [...allPhoneNumbers]; // I'm not sure if this is needed, but better safe than sorry.
            setOriginalPhoneNumbers(legacyPhoneNumbers); // holds legacy information
        }

        if ('addresses' in completeVendor) {
            setAddresses(completeVendor.addresses);
        }       
    }, [completeVendor]);

    return (
        <div>
            <PurchasingHeader area="vendors" />
            <section className={styles.detailSection}>
                {Object.keys(completeVendor).length === 0 && <h3>Loading...</h3>}
                {Object.keys(completeVendor).length !== 0 && 
                    <div>
                        <Link to="/vendors" className={styles.row} style={{textDecoration: 'none', color: '#212121'}}>
                            <img src="../../images/ArrowLeft.png" alt="navigate back" />
                            <p className={styles.backBtn}>Back</p>
                        </Link>

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

                        {editingName &&
                            <div className={styles.formContainer}>
                                <VendorNameForm 
                                    vendorName={vendorName}
                                    setVendorName={setVendorName}
                                    primaryPhone={primaryPhone}
                                    setPrimaryPhone={setPrimaryPhone}
                                    toggleEditView={toggleEditName}
                                    completeVendor={completeVendor}
                                    limitedVendor={limitedVendor}
                                    numberToPhone={numberToPhone}
                                    phoneNumbers={phoneNumbers}
                                    id={id}
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
                                        phoneNumbers={phoneNumbers}
                                        setPhoneNumbers={setPhoneNumbers}
                                        originalPhoneNumbers={originalPhoneNumbers}
                                        setOriginalPhoneNumbers={setOriginalPhoneNumbers}
                                        emails={emails}
                                        setEmails={setEmails}
                                        toggleEditView={toggleEditContacts}
                                        phoneToNumber={phoneToNumber}
                                        numberToPhone={numberToPhone}
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
                                <ol className={styles.contentContainer}>
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