import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../Home/Home";
import TextArea from "./Textarea";

function EditPage() {
  const { id: postId } = useParams();
  const [post, setPost] = useState({
    title: "",
    author: "",
    text: "",
    published: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://192.168.1.25:3000/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error("Error:", error));
  }, [postId]);

  return (
    <div className="editContainer">
      <form
        className="editForm"
        onSubmit={(e) => {
          e.preventDefault();
          fetch(`http://192.168.1.25:3000/posts/${postId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
          })
            .then((response) => response.json())
            .then((data) => {
              // Handle the response data here
              console.log(data);
              navigate("/");
            })
            .catch((error) => console.error("Error:", error));
        }}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          value={post.author}
          onChange={(e) => setPost({ ...post, author: e.target.value })}
        />
        <label htmlFor="text">Text</label>
        <TextArea
          text={post.text}
          onChange={(e) => setPost({ ...post, text: e.target.value })}
        />
        <div className="check">
          <label htmlFor="published">Published</label>
          <input
            type="checkbox"
            checked={post.published ? true : false}
            onChange={() => setPost({ ...post, published: !post.published })}
          />
        </div>
        <button className="submit" type="submit">
          Submit
        </button>
      </form>
      <br></br>
      <Link to="/">Back to home</Link>
    </div>
  );
}

export default EditPage;
