import { useState, useEffect } from "react";
import "./Home.scss";
import Post from "../Posts/CardPost";
import CreatePost from "../Posts/CreatePost";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch(import.meta.env.VITE_SERVER_API_URL, { mode: "cors" })
      .then((res) => res.text()) // Get the response as text
      .then((text) => {
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50px"
          height="80px"
          viewBox="0 0 24 24"
          fill="white"
          onClick={() => setIsOpen(true)}
          className="addPost"
        >
          <path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
        </svg>
      </div>
      {isOpen && <CreatePost isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}

export default Home;
