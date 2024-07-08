import React from "react";
import styles from "./HeroSection.module.css";
import {Link} from 'react-router-dom';

const HeroSection = () => {
  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <div className={styles.inner_container}>
          <h1 className={styles.heading}>
            <p>
              WELCOME TO <span className={styles.highlight}>CU</span>{" "}
              <span className={styles.highlight}>E</span>VENTS
            </p>
          </h1>
          <h2 className={styles.tagline}>
            Your One Stop Go to Exciting University Events
          </h2>
          <p className={styles.description}>
            Join us to stay updated with the latest events happening across
            Chandigarh University. Whether it's academic, cultural, or sports
            events, we bring you the most exciting opportunities to engage and
            participate.
          </p>
        </div>

        <div className={styles.btn_container}>
          <button><Link to='/login'>Get Started</Link></button>
          <button><Link to='/explore'>Explore Events</Link></button>
        </div>
      </section>
    </main>
  );
};

export default HeroSection;
