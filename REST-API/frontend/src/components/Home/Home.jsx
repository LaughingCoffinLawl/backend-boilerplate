import { useState, useEffect } from "react";
import "./Home.scss";
import Post from "../Posts/Post";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_SERVER_API_URL, { mode: "cors" })
      .then((res) => res.text()) // Get the response as text
      .then((text) => {
        console.log(text); // Log the response text
        // Then try to parse it as JSON
        const data = JSON.parse(text);
        setPosts(data);
      })
      .catch((err) => console.error("Error: ", err));
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">My First Blog</h1>
      </div>
      <div className="cardContainer">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
