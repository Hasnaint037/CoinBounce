import React from "react";
import { useEffect, useState } from "react";
import styles from "./BlogDetails.module.css";
import { useParams } from "react-router-dom";
import {
  getBlogById,
  getCommentById,
  deleteBlogById,
  postComment,
} from "../../../api/internal";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import CommentList from "../../../components/commentlist/CommentList";

export default function BlogDetails() {
  let params = useParams();
  let navigate = useNavigate();
  let [blog, setBlog] = useState([]);
  let [comment, setComment] = useState([]);
  let [owns, setOwns] = useState(false);
  let [newComment, setNewComment] = useState("");
  let [reload, setReload] = useState(false);

  let blogId = params.id;
  let username = useSelector((state) => state.User.username);
  let userId = useSelector((state) => state.User._id);

  let postCommentHandler = async () => {
    let data = {
      content: newComment,
      author: userId,
      blog: blogId,
    };
    const response = await postComment(data);
    if (response.status == 201) {
      setNewComment("");
      setReload(!reload);
    }
  };
  let deleteBlogHandler = async () => {
    let response = await deleteBlogById(blogId);
    if (response.status == 200) {
      navigate("/");
    }
  };

  
  useEffect(() => {
    async function blogDetail() {
      let comments = await getCommentById(blogId);
      if (comments.status == 200) {
        setComment(comments.data.data);
      }
      let blogResponse = await getBlogById(blogId);
      if (blogResponse.status == 200) {
        setBlog(blogResponse.data.data);
      }
      if(userId==blogResponse.data.data.author){
        setOwns(true);
    }
    }

    blogDetail();
  }, [reload]);

  if(blog.length==0){
    return(
      <Loading text='Blog'></Loading>
    )
  }


  return (
    <div className={styles.detailsWrapper}>
      <div className={styles.left}>
        <h1>{blog.title}</h1>
        <div className={styles.meta}>
          <p>
            @{blog.name + " on " + new Date(blog.createdAt).toDateString()}
          </p>
        </div>
        <div className={styles.photo}>
          <img src={blog.photo} alt="" width={250} height={250} />
        </div>
        <p className={styles.content}>{blog.content}</p>
        {owns && (
          <div className={styles.control}>
            <button className={styles.edit} onClick={() => navigate(`/update/${blog.id}`)}>
              Edit
            </button>
            <button className={styles.delete} onClick={deleteBlogHandler}>
              Delete
            </button>
          </div>
        )}
      </div>

      <div className={styles.right}>
        <div className={styles.commentWrapper}>
          <CommentList comments={comment}></CommentList>
          <div className={styles.postComment}>
            <input
              type="text"
              placeholder="comment goes here..."
              value={newComment}
              className={styles.input}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className={styles.postCommentButton}
              onClick={postCommentHandler}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
