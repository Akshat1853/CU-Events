import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import styles from "./Form.module.css";
import pattern_img from "../../assets/patter_img.jpg";
import { useForm } from "react-hook-form";

// Custom validation functions
const validateName = (value) => {
  if (!value) return "Name is required";
  if (value.length < 3) return "Minimum length is 3";
  if (value.length > 30) return "Maximum length is 30";
  return true;
};

const validateEmail = (value) => {
  // Simple regex for basic email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value) return "Email is required";
  if (!emailPattern.test(value)) return "Invalid email format";
  return true;
};

const validatePassword = (value) => {
  if (!value) return "Password is required";
  if (value.length <= 5) return "Password must be longer than 5 characters";
  return true;
};

const validateUid = (value) => {
  // Regex pattern for UID validation
  const uidPattern = /^\d{2}[a-zA-Z]{3}\d{3,}$/;
  if (!value) return "UID is required";
  if (value.length < 8) return "Minimum length is 8";
  if (!uidPattern.test(value))
    return "UID must be in the format: 2 digits, 3 letters, then 3 or more digits";
  return true;
};

const Form = ({ LoginPage }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  // State to toggle between sign up and login form
  const [isLogin, setIsLogin] = useState(LoginPage);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, d * 1000);
    });
  };

  const onSubmit = async (data) => {
    // Handle form submission here
    await delay(4); // simulating network delay
    console.log(data);
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

            <form onSubmit={handleSubmit(onSubmit)} className={styles.inputs}>
              {!isLogin && (
                <>
                  <div className={styles.input}>
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      {...register("name", { validate: validateName })}
                    />
                    {errors.name && (
                      <div className={styles.error}>{errors.name.message}</div>
                    )}
                  </div>
                  <div className={styles.input}>
                    <label>UID</label>
                    <input
                      type="text"
                      placeholder="Enter your UID"
                      {...register("uid", { validate: validateUid })}
                    />
                    {errors.uid && (
                      <div className={styles.error}>{errors.uid.message}</div>
                    )}
                  </div>
                </>
              )}

              <div className={styles.input}>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  {...register("email", { validate: validateEmail })}
                />
                {errors.email && (
                  <div className={styles.error}>{errors.email.message}</div>
                )}
              </div>

              <div className={styles.input}>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Please pick a strong password"
                  {...register("password", { validate: validatePassword })}
                />
                {errors.password && (
                  <div className={styles.error}>{errors.password.message}</div>
                )}
              </div>

              <div className={styles.submitContainer}>
                <button disabled={isSubmitting} type="submit">
                  {isLogin ? "Sign In" : "Sign Up"}
                </button>
              </div>
            </form>

            <div className={styles.login}>
              {isLogin ? (
                <>
                  New to SpotLight? Create an account{" "}
                  <span onClick={handleToggle}>here</span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
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
