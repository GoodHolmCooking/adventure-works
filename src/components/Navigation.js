import styles from "./Navigation.module.css";

const Navigation = () => {
    const openMenu = () => {
        console.log("Nav menu opened");
    };

    return (
        <section className={styles.headerSection}>
            <button className={styles.menuBtn} onClick={openMenu}>
                <img src="./images/MenuIcon.png" alt="Navigate" />
            </button>
            <div>
                <img src="./images/BikeLogo.png" alt="Logo" />
            </div>
            <div>
                <img src="./images/Account.png" alt="User icon" />
            </div>
        </section>
    );
};

export default Navigation;