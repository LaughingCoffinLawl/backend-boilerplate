import { useState, useEffect } from "react";
import "./App.css";
import { DateTime } from "luxon";

function Home() {
  const [post, setPost] = useState();

  useEffect(() => {
    fetch(import.meta.env.VITE_SERVER_API_URL, { mode: "cors" })
      .then((res) => res.text()) // Get the response as text
      .then((text) => {
        console.log(text); // Log the response text
        // Then try to parse it as JSON
        const data = JSON.parse(text);
        setPost(data);
      })
      .catch((err) => console.error("Error: ", err));
  }, []);
  return (
    <>
      {post &&
        post.map((p, index) => {
          const date = DateTime.fromISO(p.createAt).toLocaleString(
            DateTime.DATETIME_MED
          );
          return (
            <div key={index}>
              <h1>{p.title}</h1>
              <p>{p.author}</p>
              <p>{p.text}</p>
              <p>{date}</p>
            </div>
          );
        })}
    </>
  );
}

export default Home;
