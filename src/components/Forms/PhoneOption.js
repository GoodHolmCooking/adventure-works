import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const PhoneOption = props => {
    const {typeName, phoneNumber, phoneToNumber, saving, newPhoneNumbers, businessEntityId, phoneTypes, numberToPhone} = props;
    const [phoneTypeState, setPhoneTypeState] = useState(typeName);
    const [phoneNumberState, setPhoneNumberState] = useState(phoneToNumber(phoneNumber));
    const [phoneNumberUpdate, setPhoneNumberUpdate] = useState({});

    useEffect(() => {
        if (saving) {
            newPhoneNumbers.push(phoneNumberUpdate);
        }
        
        // only want to update when the saving state is updated
    }, [saving]);

    useEffect(() => {
        setPhoneNumberUpdate({
            businessEntityId: businessEntityId,
            phoneNumber: numberToPhone(phoneNumberState),
            phoneNumberTypeId: phoneTypeState.id,
            phoneNumberTypeName: phoneTypeState.name
        });
    }, [phoneTypeState, phoneNumberState])

    return (
        <div key={businessEntityId}>
            <select defaultValue={typeName} onChange={evt => {setPhoneTypeState(evt.target.value)}}>
                {phoneTypes.map(phoneType => {
                    return <option key={phoneType.id} value={{name: phoneType.name, id: phoneType.id}}>{phoneType.name}</option>
                })}
            </select>
            <input type="number" defaultValue={phoneToNumber(phoneNumber)} onChange={evt => {setPhoneNumberState(evt.target.value)}} />
        </div>
    );
};

export default PhoneOption;