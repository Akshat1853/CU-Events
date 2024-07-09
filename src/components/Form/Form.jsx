import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
import { IoMdArrowBack } from "react-icons/io"; 
import styles from "./Form.module.css"; 
import pattern_img from "../../assets/patter_img.jpg";
import { useForm } from "react-hook-form"; 
import { auth, db } from "../../firebase"; // Import Firebase auth and Firestore database
import {
  signInWithEmailAndPassword, // Import Firebase function for signing in
  createUserWithEmailAndPassword, // Import Firebase function for creating a new user
} from "firebase/auth";

 //Firestore functions for setting documents
import { collection, doc, setDoc } from "firebase/firestore";

// Custom validation functions
const validateName = (value) => {
  if (!value) return "Name is required"; // Check if name is provided
  if (value.length < 3) return "Minimum length is 3"; // Validate name length
  if (value.length > 30) return "Maximum length is 30"; // Validate name length
  return true;
};

const validateEmail = (value) => {
  // Simple regex for basic email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value) return "Email is required"; // Check if email is provided
  if (!emailPattern.test(value)) return "Invalid email format"; // Validate email format
  return true;
};

const validatePassword = (value) => {
  if (!value) return "Password is required"; // Check if password is provided
  if (value.length < 6) return "Password must be longer than 6 characters"; // Validate password length
  return true;
};

const validateUid = (value) => {
  // Regex pattern for UID validation
  const uidPattern = /^\d{2}[a-zA-Z]{3}\d{3,}$/;
  if (!value) return "UID is required"; // Check if UID is provided
  if (value.length < 8) return "Minimum length is 8"; // Validate UID length
  if (!uidPattern.test(value))
    return "UID must be in the format: 2 digits, 3 letters, then 3 or more digits"; // Validate UID format
  return true;
};

const Form = ({ LoginPage }) => {
  const {
    register, // Function to register input fields
    handleSubmit, // Function to handle form submission
    watch, // Function to watch form values
    formState: { errors, isSubmitting }, // Object containing form state (errors and submission status)
  } = useForm();

  const navigate = useNavigate(); // Hook to programmatically navigate

  // State to toggle between sign up and login form
  const [isLogin, setIsLogin] = useState(LoginPage);

  // Function to toggle between login and sign-up forms
  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        // Login logic
        await signInWithEmailAndPassword(auth, data.email, data.password);
      } else {
        // Sign-up logic
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        // Store user data in Firestore
        await setDoc(doc(collection(db, "users"), userCredential.user.uid), {
          name: data.name,
          uid: data.uid,
          email: data.email,
        });
      }
      // Redirect to explore page after login/signup
      navigate("/");
    } catch (error) {
      console.error("Error:", error.message); // Log any errors that occur
    }
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
