import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCountriesAsync, loadProvincesAsync, updateAddressAsync } from "../../store/slices/vendorSlice";
import AddressFieldset from "./AddressFieldSet";
import styles from "./VendorAddressForm.module.css"

const VendorAddressForm = props => {
    const {addresses, setAddresses, toggleEditView} = props;
    const {provinces, countries} = useSelector(state => state.vendors);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!countries.length) {
            dispatch(loadCountriesAsync());
        }
    }, [dispatch, countries]);

    const handleInputChanges = evt => {
        evt.preventDefault();

        // update contacts
        addresses.forEach(address => {
            dispatch(updateAddressAsync(address));
        });

        toggleEditView();
    }

    return (
        <form onSubmit={handleInputChanges}>
            {addresses.map(address => {
                return (
                    <AddressFieldset 
                        key={address.addressId}
                        address={address}
                        provinces={provinces}
                        countries={countries}
                        addresses={addresses}
                        setAddresses={setAddresses}
                    />
                );
            })}
            <input type="submit" className={styles.saveBtn} />
        </form>
    );
};

export default VendorAddressForm;