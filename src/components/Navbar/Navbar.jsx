import React from "react";
import styles from "./Navbar.module.css";
import {Link} from 'react-router-dom';

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
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/explore'>Explore</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/signUp'>Sign up</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
