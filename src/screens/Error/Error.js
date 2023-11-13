import React from "react";
import styles from "./Error.module.css";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className={styles.error}>
      <div className={styles.errorHeader}>Error 404 - Page not found</div>
      <div className={styles.errorBody}>
        Go back to{" "}
        <Link to="/" className={styles.errorLink}>
          Home
        </Link>
      </div>
    </div>
  );
}
