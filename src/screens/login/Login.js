import React, { useState } from "react";
import styles from "./Login.module.css";
import TextInput from "../../components/TextInput";
import loginSchema from "../../schemas/loginSchema";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/internal";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";

export default function Login() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [error, setError] = useState("");

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
  });

  let handleLogin = async () => {
    let data = {
      username: values.username,
      password: values.password,
    };
    let response = await login(data);
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
    <div className={styles.loginWrapper}>
      <div className={styles.loginHeader}>Log in to your account</div>

      <TextInput
        type="text"
        value={values.username}
        name="username"
        placeholder="username"
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.username && touched.username ? 1 : undefined}
        errormessage={errors.username}
      ></TextInput>

      <TextInput
        type="password"
        value={values.password}
        name="password"
        placeholder="password"
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password}
      ></TextInput>

      <button className={styles.loginButton} onClick={handleLogin}>
        Log in
      </button>

      <span>
        Don't have an account?{" "}
        <button
          className={styles.createAccountButton}
          onClick={() => navigate("/signup")}
        >
          Register
        </button>
      </span>
      {error != "" ? <p className={styles.error}>{error}</p> : ""}
    </div>
  );
}
