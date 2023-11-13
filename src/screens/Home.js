import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { news } from "../api/external";
import Loading from "../components/Loading";

export default function Home() {
  let [articles, setArticles] = useState([]);

  // fetch api
  useEffect(() => {
    async function fetchingArticles() {
      let respone = await news();
      setArticles(respone);
    }
    fetchingArticles();

    //clean up
    setArticles([]);
  }, []);

  if(articles.length==0){
    return <Loading text="Home Page"></Loading>
  }

  // when click on a news article
  let handleClick = (data) => {
    window.open(data, "_blank");
  };

  return (
    <>
      <div className={styles.header}>Latest Articles</div>
      <div className={styles.grid}>
        {articles.map((articles) => {
          return (
            <div
              key={articles.url}
              className={styles.card}
              onClick={() => handleClick(articles.url)}
            >
              <img src={articles.urlToImage}></img>
              <h3>{articles.title}</h3>
            </div>
          );
        })}
      </div>
    </>
  );
}
