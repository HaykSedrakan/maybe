import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdOutlineAccountCircle, MdAlternateEmail } from "react-icons/md";
import { BsFillKeyFill, BsTelephoneFill } from "react-icons/bs";
import dayjs from "dayjs";

export default function SignUp() {
  const navigate = useNavigate();
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });
  const [authValues, setAuthValues] = useState({
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
    date: dayjs().format("DD.MM.YYYY"),
  });
  const [completedAuth, setCompleteAuth] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleLoginChange = (e) => {
    setLoginValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAuthChange = (e) => {
    setAuthValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  axios.defaults.withCredentials = true;

  const validateForm = () => {
    const errors = {};

    if (!authValues.name) {
      errors.name = "Name is required";
    }
    if (!authValues.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(authValues.email)) {
      errors.email = "Invalid email format";
    }
    if (!authValues.password) {
      errors.password = "Password is required";
    } else if (authValues.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (!authValues.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\d{11}$/.test(authValues.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number format";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios
        .post(`${process.env.REACT_APP_API}/register`, authValues && authValues)
        .then((res) => {
          if (res.data.Status === "Success") {
            navigate("/login");
            setCompleteAuth(true);
          } else {
            alert("Error !");
          }
        });
    }
  };

  return (
    <div className={styles["card-back"]}>
      <div className={styles["center-wrap"]}>
        <div className={`${styles.section} ${styles["text-center"]}`}>
          <h4 className={` ${styles.loginTitle} ${styles.mb}-4 ${styles.pb}-3`}>
            Sign Up
          </h4>
          <div className={styles["form-group"]}>
            <input
              type="text"
              name="name"
              className={styles["form-style"]}
              placeholder="Full Name"
              id="logname"
              autoComplete="off"
              onChange={handleAuthChange}
            />
            <MdOutlineAccountCircle
              className={`${styles["input-icon"]} uil uil-user`}
            />
            {formErrors.name && (
              <span className={styles.error}>{formErrors.name}</span>
            )}
          </div>
          <div className={`${styles["form-group"]} ${styles.mt}-2`}>
            <input
              type="email"
              name="email"
              className={styles["form-style"]}
              placeholder="Enter E-Mail"
              id="logemail"
              autoComplete="off"
              onChange={handleAuthChange}
            />
            <MdAlternateEmail
              className={`${styles["input-icon"]} uil uil-at`}
            />
            {formErrors.email && (
              <span className={styles.error}>{formErrors.email}</span>
            )}
          </div>
          <div className={`${styles["form-group"]} ${styles.mt}-2`}>
            <input
              type="password"
              name="password"
              className={styles["form-style"]}
              placeholder="Enter Password"
              id="logpass"
              autoComplete="off"
              onChange={handleAuthChange}
            />
            <BsFillKeyFill
              className={`${styles["input-icon"]} uil uil-lock-alt`}
            />
            {formErrors.password && (
              <span className={styles.error}>{formErrors.password}</span>
            )}
          </div>
          <div className={styles["form-group"]}>
            <input
              type="number"
              name="phoneNumber"
              className={styles["form-style"]}
              placeholder="Phone Number"
              id="logname"
              autoComplete="off"
              onChange={handleAuthChange}
            />
            <BsTelephoneFill
              className={`${styles["input-icon"]} uil uil-user`}
            />
            {formErrors.phoneNumber && (
              <span className={styles.error}>{formErrors.phoneNumber}</span>
            )}
          </div>
          <div className={styles.btnContainer}>
            <button
              onClick={handleSubmit}
              className={`${styles.btn} ${styles.mt}-4`}
            >
              Confirm
            </button>
          </div>
          <Link to={"/login"} className={styles.loginLink}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
