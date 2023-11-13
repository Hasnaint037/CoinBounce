import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {resetUser} from '../store/userSlice'
import { useDispatch } from "react-redux";
import { logout } from "../api/internal";

export default function Navbar() {
  let isAuthenticated = useSelector(state=>state.User.auth);
  console.log(isAuthenticated)
  let dispath=useDispatch();

  //logout handletr
  let handleLogout=async ()=>{
    let response=await logout();
    dispath(resetUser());
  }
  return (
    <>
      <nav className={styles.navbar}>
        <NavLink className={`${styles.logo} ${styles.inactiveStyle}`}>
          CoinBounce
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.activeStyle : styles.inactiveStyle
          }
        >
          Home
        </NavLink>

        <NavLink
          to="crypto"
          className={({ isActive }) =>
            isActive ? styles.activeStyle : styles.inactiveStyle
          }
        >
          Cryptocurrincies
        </NavLink>

        <NavLink
          to="blogs"
          className={({ isActive }) =>
            isActive ? styles.activeStyle : styles.inactiveStyle
          }
        >
          Blogs
        </NavLink>

        <NavLink
          to="submit"
          className={({ isActive }) =>
            isActive ? styles.activeStyle : styles.inactiveStyle
          }
        >
          Submit a blog
        </NavLink>
        { isAuthenticated ? (
          <button className={styles.logOutButton} onClick={handleLogout}>Log Out</button>
        ) : (
          <div>
            <NavLink
              to="login"
              className={({ isActive }) =>
                isActive ? styles.activeStyle : styles.inactiveStyle
              }
            >
              <button className={styles.logInButton}>Log In</button>
            </NavLink>

            <NavLink
              to="signup"
              className={({ isActive }) =>
                isActive ? styles.activeStyle : styles.inactiveStyle
              }
            >
              <button className={styles.signUpButton}>Sign Up</button>
            </NavLink>
          </div>
        ) }
      </nav>
      <div className={styles.separator}></div>
    </>
  );
}
