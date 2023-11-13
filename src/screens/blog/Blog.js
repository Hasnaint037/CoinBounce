import React, { useState, useEffect } from "react";
import { getBlogs } from "../../api/internal";
import styles from "./Blog.module.css";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";

export default function Blog() {
  let [blog, setBlog] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    async function getAllBlogs() {
      let response = await getBlogs();
      setBlog(response.data.blogs);
    }
    getAllBlogs();

    //clean up function
    setBlog([]);
  }, []);

  if (blog.length == 0) {
    return <Loading text="Blogs"></Loading>;
  }
  return (
    <div className={styles.blogWrapper}>
      {blog.map((blog) => {
        return (
          <div
            key={blog.id}
            class={styles.blog}
            onClick={() => navigate(`/blog/${blog.id}`)}
          >
            <h2>{blog.title}</h2>
            <img src={blog.photo}></img>
            <p>{blog.cPontent}</p>
          </div>
        );
      })}
    </div>
  );
}
