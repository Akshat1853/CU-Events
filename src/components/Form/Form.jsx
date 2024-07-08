import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import styles from "./Form.module.css";
import pattern_img from "../../assets/patter_img.jpg";
import { FaEyeSlash } from "react-icons/fa6";

const Form = () => {
  // State to toggle between sign up and login form
  const [isLogin, setIsLogin] = useState(false);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Link to="/">
          <IoMdArrowBack className={styles.icon} size={25} />
        </Link>

        <div className={styles.inner_container}>
          <div className={styles.cont}>
            <div className={styles.header}>
              <h1>{isLogin ? "Sign In" : "Create an account"}</h1>
            </div>

            <div className={styles.inputs}>
              {!isLogin && (
                <>
                  <div className={styles.input}>
                    <label>Name</label>
                    <input type="text" placeholder="Enter your name" />
                  </div>
                </>
              )}

              <div className={styles.input}>
                <label>Email</label>
                <input type="email" placeholder="example@gmail.com" />
              </div>

              <div className={styles.input}>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Please pick a strong password"
                />
              </div>
            </div>

            <div className={styles.submitContainer}>
              <button>{isLogin ? "Sign In" : "Sign Up"}</button>
            </div>

            <div className={styles.login}>
              {isLogin ? (
                <>
                  New to SpotLight? Create an account {" "}
                  <span onClick={handleToggle}>here</span>
                </>
              ) : (
                <>
                  Already have an account? {" "}
                  <span onClick={handleToggle}>Login</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <img src={pattern_img} alt="" />
      </div>
    </div>
  );
};

export default Form;
