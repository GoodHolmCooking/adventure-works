import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./login.module.css";
import logo from "../images/LogoThick.png"
import { LoginContext } from "../context/loginContext";
import { Navigate, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

function Login(props) {
  const loginContext = useContext(LoginContext);
  const acceptHandler = () => {
    loginContext.accept();
  }

  // const { login } = props;

  const [loginCreds,setLoginCreds] = useState({username:"",password:""});
  const [checkbox,setCheckbox] = useState(false);
  const [btnHighlight, setHighlight] = useState("")
  const handleRmemberCheck = (evt) => 
  {

  }

  const handleChecked = (evt) =>
  {
    setCheckbox(evt.target.checked)
  }

    const handleLogin = (evt) =>
    {
      evt.preventDefault();
      const data = 
      {
        loginId: loginCreds.username,
        password: loginCreds.password,
      }

      try
      {
        axios.post("/Login",data)
        .then(resp => {
          console.log(resp)
            if(resp.data.success === true)
            {
              acceptHandler();
            }
            else
            {
              toast.error("failed to login try again")
            }
        })

        
      }
      catch(err)
      {
        toast.error(err)
      }
      
      

    }

    useEffect(() => {
      if(loginCreds.username.length > 0 || loginCreds.password.length > 0)
      {
        setHighlight("highlight");
      }
      else
      {
        setHighlight("")
      }
    },[loginCreds])

    const handleUserUpdate = (evt) => {
      setLoginCreds({username:evt.target.value,password:loginCreds.password})
    };
    const handlePassUpdate = (evt) => {
      setLoginCreds({username:loginCreds.username,password:evt.target.value})
    };
    
	return (
    <div className={styles.loginBody}>
      <img src={logo} alt="bike logo"></img>
      <h1>Let's get started.</h1>
      <form on onSubmit={handleLogin}>
      <div className={styles.loginForm}>
        <div className={styles.loginTextInput}>
          <label>Email</label>
          <input onChange={handleUserUpdate} type="text" required="true"></input>
        </div>
        <div className={styles.loginTextInput}>
          <label>Password</label>
          <input onChange={handlePassUpdate} type="password" required = "true"></input>
        </div>
        <div className={styles.loginRememberMe}>
          <input onChange={handleChecked} type="checkbox"></input>
          <label>Remember me</label>
        </div>
        <button className={[styles.loginButton, btnHighlight].join(" ")} >Login</button>
        <a className={styles.havingTroubles} href="#">Having trouble logging in?</a>
      </div>
      </form>
    </div>
  );
}
Login.propTypes = 
{
	login: PropTypes.func
}

export default Login;