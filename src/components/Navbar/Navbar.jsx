import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import {auth} from '../../firebase';
import {signOut} from 'firebase/auth';

const Navbar = ({ userState }) => {

  // Function to handle logout
const handleLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
};

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
          {userState ? (
            <>
              <li><Link to='/dashboard'>Dashboard</Link></li>
              <li><button className={styles.logoutButton} onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/signUp'>Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
