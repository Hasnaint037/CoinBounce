import React from "react";
import styles from "./Signup.module.css";
import signupSchema from "../../schemas/signupSchema";
import { useFormik } from "formik";
import { setUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TextInput from "../../components/TextInput";
import { signup } from "../../api/internal";

export default function Signup() {
  let dispatch = useDispatch();
  let [error, setError] = useState();
  let navigate = useNavigate();

  let { values, errors, touched, handleBlur, handleChange } = useFormik({
    initialValues: {
      name: "",
      username: "",
      password: "",
      confirmpassword: "",
      email: "",
    },
    validationSchema: signupSchema,
  });

  let handleSignup = async () => {

    let data = {
      name: values.name,
      username: values.username,
      password: values.password,
      confirmpassword: values.confirmpassword,
      email: values.email,
    };

    let response = await signup(data);

    if (response.status === 200) {
      let user = {
        _id: response.data.user._id,
        username: response.data.user.username,
        email: response.data.user.email,
        auth: response.data.auth,
      };

      dispatch(setUser(user));
      navigate("/");
    } else if (response.code === "ERR_BAD_REQUEST") {
      setError(response.response.data.message);
    }
  };

  return (
    <div className={styles.signupWrapper}>
      <div className={styles.signupHeader}>Create an Account</div>

      {/* for name */}
      <TextInput
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="name"
        errormessage={errors.name}
        error={errors.name && touched.name ? 1 : undefined}
      ></TextInput>

      {/* for username */}
      <TextInput
        type="text"
        name="username"
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="username"
        errormessage={errors.username}
        error={errors.username && touched.username ? 1 : undefined}
      ></TextInput>

      {/* for email */}
      <TextInput
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="email"
        errormessage={errors.email}
        error={errors.email && touched.email ? 1 : undefined}
      ></TextInput>

      {/* for password */}
      <TextInput
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="password"
        errormessage={errors.password}
        error={errors.password && touched.password ? 1 : undefined}
      ></TextInput>

      {/* for confirm password */}
      <TextInput
        type="password"
        name="confirmpassword"
        value={values.confirmpassword}
        onChange={handleChange}
        placeholder="confirm password"
        onBlur={handleBlur}
        errormessage={errors.confirmpassword}
        error={
          errors.confirmpassword && touched.confirmpassword ? 1 : undefined
        }
      ></TextInput>

      <button className={styles.signupButton} onClick={handleSignup}>
        Sign Up
      </button>

      {/* login button */}
      <span>
        Already have an account?{" "}
        <button
          className={styles.loginButton}
          onClick={() => navigate("/login")}
        >
          Log In
        </button>
      </span>

      {/* for error */}
      {error != "" ? <p className={styles.error}>{error}</p> : " "}
    </div>
    
  );
}
