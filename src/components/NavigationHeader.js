import { useState } from "react";
import styles from "./NavigationHeader.module.css";
import { Link, useNavigate } from "react-router-dom";

const NavigationHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };


    return (
        <>
            <section className={styles.headerSection}>
                <button className={styles.menuBtn} onClick={toggleMenu}>
                    <img src="./images/MenuIcon.png" alt="Navigate" />
                </button>
                <div className={styles.mainLogo}>
                    <img src="./images/BikeLogo.png" alt="Logo" />
                </div>
                <div className={styles.mobileAccount}>
                    <img src="./images/Account.png" alt="User icon" />
                </div>
                <div className={styles.desktopAccount}>
                    <img src="./images/BigAccount.svg" alt="User icon" />
                </div>
            </section>

            {/* Mobile Header */}
            {menuOpen && 
                <ul className={styles.dropDown}>
                    {/* Dashboard */}
                    <Link to="/" onClick={toggleMenu}>
                        <li className={styles.dashboardLink}>
                            <div className={styles.dashboardBox}>
                                <img src="./images/DashboardIcon.png" alt="dashboard" />
                            </div>
                            <div className={styles.linkBox}>
                                <p>Dashboard</p>
                            </div>
                        </li>
                    </Link>

                    {/* Employees */}
                    <Link to="/employees" onClick={toggleMenu}>
                        <li className={styles.employeesLink}>
                            <div className={styles.employeesBox}>
                                <img src="./images/Employee.png" alt="employee" />
                            </div>
                            <div className={styles.linkBox}>
                                <p>Employees</p>
                            </div>
                     </li>
                    </Link>

                    {/* Products */}
                    <Link to="/catalog" onClick={toggleMenu}>
                        <li className={styles.productsLink}>
                            <div className={styles.productsBox}>
                                <img src="./images/Products.png" alt="products" />
                            </div>
                            <div className={styles.linkBox}>
                                <p>Products</p>
                            </div>
                        </li>
                    </Link>
                    
                    {/* Purchasing */}
                    <Link to="/vendors" onClick={toggleMenu}>
                        <li className={styles.purchasingLink}>
                            <div className={styles.purchasingBox}>
                                <img src="./images/Purchasing.png" alt="purchasing" />
                            </div>
                            <div className={styles.linkBox}>
                                <p>Purchasing</p>
                            </div>
                        </li>
                    </Link>
                    
                    {/* Sales */}
                    <Link to="/stores" onClick={toggleMenu}>
                        <li className={styles.salesLink}>
                            <div className={styles.salesBox}>
                                <img src="./images/Sales.png" alt="sales" />
                            </div>
                            <div className={styles.linkBox}>
                                <p>Sales</p>
                            </div>
                        </li>
                    </Link>
                    
                    {/* Settings */}
                    {/* <li className={styles.settingsLink}>
                        <div className={styles.settingsBox}>
                            <img src="./images/Settings.png" alt="settings" />
                        </div>
                        <div className={styles.linkBox}>
                            <p>Settings</p>
                        </div>
                    </li> */}
                </ul>
            } {/* End of Mobile Header */}

     
        </>

    );
};

export default NavigationHeader;