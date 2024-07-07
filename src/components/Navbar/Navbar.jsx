import React from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <p>
            <span className={styles.highlight}>CU</span>{" "}
            <span className={styles.highlight}>E</span>
            <span>VENTS</span>
          </p>
        </div>

        <ul className={styles.list}>
          <li>Home</li>
          <li>Explore</li>
          <li>Login</li>
          <li>Sign up</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
