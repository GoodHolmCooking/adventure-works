import { useState } from "react";
import styles from "./NavigationHeader.module.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const NavigationAside = () => {
    const [area, setArea] = useState("dashboard");
    const navigate = useNavigate();

    const handleDashboard = () => {
        setArea("dashboard");
        navigate("/");
    };

    const handleEmployees = () => {
        setArea("employees");
        navigate("/employees");
    };

    const handleProducts = () => {
        setArea("products");
        // navigate("/products");
    };

    const handlePurchasing = () => {
        setArea("purchasing");
        navigate("/vendors");
    };

    const handleSales = () => {
        setArea("sales");
        // navigate("/sales");
    };

    const toggleAside = () => {
        console.log("Expand clicked");
    }

    return (
        <div>
            {/* Desktop Aside */}
            <ul className={styles.navigationAside}>
                <li className={styles.menuLink} onClick={toggleAside}>
                    <div className={styles.imgContainer}>
                        <img src="./images/Aside/MenuLight.png" alt="Navigate" />
                    </div>
                </li>

                {/* Dashboard */}
                <li className={styles.dashboardLink} onClick={handleDashboard}>
                    <div className={area === "dashboard" ? styles.dashboardBox : styles.genericBox}>
                        {area === "dashboard" && 
                            <img src="./images/Aside/DashboardDark.png" alt="dashboard" />
                        }
                        {area !== "dashboard" && 
                            <img src="./images/Aside/DashboardLight.png" alt="dashboard" />
                        }
                    </div>
                    <div className={styles.linkBox}>
                        <p>Dashboard</p>
                    </div>
                </li>


                {/* Employees */}
                <li className={styles.employeesLink} onClick={handleEmployees}>
                    <div className={area === "employees" ? styles.employeesBox : styles.genericBox}>
                        {area === "employees" &&
                            <img src="./images/Aside/EmployeesDark.png" alt="employee" />
                        }
                        {area !== "employees" &&
                            <img src="./images/Aside/EmployeesLight.png" alt="employee" />
                        } 
                    </div>
                    <div className={styles.linkBox}>
                        <p>Employees</p>
                    </div>
                </li>

                {/* Products */}
                <Link to="/products" onClick={() => setArea("products")} className={styles.clickableLink}>
                    <li className={styles.productsLink}>
                        <div className={area === "products" ? styles.productsBox : styles.genericBox}>
                            {area === "products" && 
                                <img src="./images/Navigation/ProductsDark.png" alt="products" />
                            }
                            {area !== "products" && 
                                <img src="./images/Aside/ProductsLight.png" alt="products" />
                            }
                        </div>    
                        <div className={styles.linkBox}>
                            <p>Products</p>
                        </div>
                    </li>
                </Link>
                
                {/* Purchasing */}
                <Link to="/vendors" onClick={() => setArea("vendors")} className={styles.clickableLink}>
                    <li className={styles.purchasingLink}>
                        <div className={area === "purchasing" ? styles.purchasingBox : styles.genericBox}>
                            {area === "purchasing" && 
                                <img src="./images/Navigation/PurchasingDark.png" alt="purchasing" />
                            }
                            {area !== "purchasing" && 
                                <img src="./images/Aside/PurchasingLight.png" alt="purchasing" />
                            } 
                        </div>
                        <div className={styles.linkBox}>
                            <p>Purchasing</p>
                        </div>
                    </li>
                </Link>
                
                {/* Sales */}
                <Link to="/sales" onClick={() => setArea("sales")} className={styles.clickableLink}>
                    <li className={styles.salesLink}>
                        <div className={area === "sales" ? styles.salesBox : styles.genericBox}>
                            {area === "sales" &&
                                <img src="./images/Navigation/SalesDark.png" alt="sales" />
                            }
                            {area !== "sales" &&
                                <img src="./images/Aside/SalesLight.png" alt="sales" />
                            }
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
        </div>
    );
};

export default NavigationAside;