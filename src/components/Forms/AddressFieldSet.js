import { useEffect, useState } from "react";

const AddressFieldset = props => {
    const {address, provinces, countries, addresses, setAddresses} = props;

    const [addressTypeName, setAddressTypeName] = useState(address.addressTypeName);
    const [addressLine1, setAddressLine1] = useState(address.addressLine1);
    const [addressLine2, setAddressLine2] = useState(address.addressLine2);
    const [city, setCity] = useState(address.city);
    const [provinceId, setProvinceId] = useState(address.stateProvinceId);
    const [postalCode, setPostalCode] = useState(address.postalCode);
    const [countryCode, setCountryCode] = useState(address.countryRegionCode);
    const [addressProvinces, setAddressProvinces] = useState([]);

    useEffect(() => {
        setAddressProvinces(provinces.filter(province => {
            return province.countryRegionCode === countryCode;
        }));
    }, [countryCode, provinces]);

    useEffect(() => {
        let tempAddresses = [...addresses];
        let updateAddressIndex = tempAddresses.findIndex(tempAddress => {
            return tempAddress.addressId === address.addressId;
        }); 

        tempAddresses[updateAddressIndex] = {
            ...address,
            addressTypeName: addressTypeName,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            stateProvinceId: provinceId,
            // stateProvinceCode: stateProvinceCode,
            // stateProvinceName: stateProvinceName,
            postalCode: postalCode,
            countryRegionCode: countryCode
            // countryRegionName: countryName
        };

        setAddresses(tempAddresses);
    }, [addressTypeName, addressLine1, addressLine2, city, provinceId, postalCode, countryCode]);


    return (
        <fieldset key={address.addressId}>
            {/* Address Type */}
            <input type="text" defaultValue={address.addressTypeName} onChange={evt => setAddressTypeName(evt.target.value)} />

            {/* Address Line 1 */}
            <input type="text" defaultValue={address.addressLine1} onChange={evt => setAddressLine1(evt.target.value)} />

            {/* Address Line 2 */}
            <input type="text" defaultValue={address.addressLine2} onChange={evt => setAddressLine2(evt.target.value)} />

            {/* City */}
            <input type="text" defaultValue={address.city} onChange={evt => setCity(evt.target.value)} />

            {/* State */}
            {(typeof addressProvinces !== "undefined" && addressProvinces.length !== 0) &&
                <select value={address.stateProvinceId} onChange={evt => setProvinceId(evt.target.value)}>
                    {addressProvinces.map(province => {
                        return <option value={province.stateProvinceId} key={province.stateProvinceId}>{province.stateProvinceCode}</option>
                    })}
                </select>
            }


            {/* Postal */}
            <input type="number" defaultValue={address.postalCode} onChange={evt => setPostalCode(evt.target.value)} />

            {/* Country */}
            <select value={address.countryRegionCode} onChange={evt => setCountryCode(evt.target.value)}>
                {countries.map(country => {
                    return <option value={country.countryRegionCode} key={country.countryRegionCode}>{country.countryRegionName}</option>
                })}
            </select>

        </fieldset>
    );
};

export default AddressFieldset;