import React from "react";
import styles from "./CommentList.module.css";
import Comment from "../comment/Comment";

export default function CommentList({ comments }) {
  return (
    <div className={styles.CommentListWrapper}>
      <div className={styles.commentList}>
        {comments.length == 0 ? (
          <div className={styles.noComment}>No Comments Posted</div>
        ) : (
          comments.map((comment) => {
            return <Comment key={comment._id} comment={comment}></Comment>;
          })
        )}
      </div>
    </div>
  );
}
