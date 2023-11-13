import React from "react";
import styles from "./Comment.module.css";

export default function Comment({ comment }) {
  let date = new Date(comment.createdAt).toString();
  return (
    <div className={styles.comment}>
      <div className={styles.header}>
        <div className={styles.author}>{comment.authorUsername}</div>
        <div className={styles.date}>{date}</div>
        <div className={styles.commentText}>{comment.content}</div>
      </div>
    </div>
  );
}
