import React, { useState, useEffect } from "react";
import styles from "./EditBlog.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { updateBlog } from "../../api/internal";
import { getBlogById } from "../../api/internal";
import TextInput from "../../components/TextInput";
import { useSelector } from "react-redux/es/hooks/useSelector";

export default function EditBlog() {
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let [photoPath, setPhotoPath] = useState("");
  let params = useParams();
  let blogId = params.id;
  let navigate = useNavigate();

  useEffect(() => {
    async function getBlog() {
      let blogResponse = await getBlogById(blogId);
      if (blogResponse.status == 200) {
        setTitle(blogResponse.data.data.title);
        setContent(blogResponse.data.data.content);
        setPhotoPath(blogResponse.data.data.photo);
      }
    }
    getBlog();
    // async function update(){
    //     let response=await updateBlog(blogId);

    // }
  }, []);

  const author = useSelector((state) => state.User._id);
  console.log(author);

  let updateHandler = async () => {
    let data = {
      blogId,
      title,
      content,
      photo: photoPath,
      author,
    };
    let response = await updateBlog(data);
    if (response.status == 200) {
      navigate("/");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Edit your Blog!</div>

      <TextInput
        type="text"
        name="title"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "60%" }}
      ></TextInput>

      <textarea
        className={styles.content}
        placeholder="your content goes here"
        maxLength={500}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <div className={styles.photoPrompt}>
        <p>image can not be updated</p>
        <img src={photoPath} width={150} height={150} />
      </div>
      <button className={styles.submit} onClick={updateHandler}>
        Update
      </button>
    </div>
  );
}
