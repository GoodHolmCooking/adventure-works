import React from "react";
import PropTypes from "prop-types";
import styles from "./login.module.css";

function Login(props) {
    const { login } = props;
	return (
    <div className={styles.loginBody}>
      <img src="" alt="bike logo"></img>
      <h1>Let's get started.</h1>
      <div className={styles.loginForm}>
        <div className={styles.loginTextInput}>
          <label>Email</label>
          <input type="email"></input>
        </div>
        <div className={styles.loginTextInput}>
          <label>Password</label>
          <input type="password"></input>
        </div>
        <div className={styles.loginRememberMe}>
          <input type="checkbox"></input>
          <label>Remember me</label>
        </div>
        <button className={styles.loginButton} onClick={login}>Login</button>
        {/* <a href="#">Having trouble logging in?</a> */}
      </div>
    </div>
  );
}
Login.propTypes = 
{
	login: PropTypes.func
}

export default Login;