import React, { useState } from "react";
import styles from "./SubmitBlog.module.css";
import { useSelector} from "react-redux/es/hooks/useSelector";
import TextInput from "../../components/TextInput";
import {createBlog} from '../../api/internal';
import { useNavigate } from "react-router-dom";

export default function SubmitBlog() {
  let navigate=useNavigate();
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let [photoPath, setPhotoPath] = useState("");
  const author = useSelector((state) => state.User._id);

  let getPhoto=(e)=>{
    let file=e.target.files[0]
    let reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend=()=>{
      setPhotoPath(reader.result);
    } 
  }

  let submitHandler=async ()=>{
    let data={
      author,
      content,
      photo:photoPath,
      title
    }
    let response =await createBlog(data);

    if(response.status==200){
      navigate('/');
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Create a Blog!</div>

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
        <p>choose a file</p>
        <input
          type="file"
          name="file"
          id="photo"
          accept="image/jpg,image/png"
          onChange={getPhoto}
        ></input>
      </div>
      <button className={styles.submit} onClick={submitHandler}>Submit</button>
    </div>
  );
}
