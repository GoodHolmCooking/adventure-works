import React, {useState} from "react";
let key = "dashboardLoginStatus"
export const LoginContext = React.createContext({
    accepted: window.sessionStorage.getItem(key) || false,
    accept: () => {

    }
})

const LoginContextProvider = props => {
    const [accepted, setAccepted] = useState(window.sessionStorage.getItem(key) || false);
    const handleAccept = () =>
    {
        window.sessionStorage.setItem(key,true)
        setAccepted(true);
    }

    return (
        <LoginContext.Provider value={{ accept: handleAccept, accepted: accepted }}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider