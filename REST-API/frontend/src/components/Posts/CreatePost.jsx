import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import TextArea from "./Textarea";
import PropTypes from "prop-types";

function CreatePost({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    author: "",
    text: "",
    published: false,
  });

  const [submitError, setSubmitError] = useState([]);

  const validateForm = () => {
    let errors = [];

    if (post.title === "") {
      errors.push("Title is required");
    }

    if (post.author === "") {
      errors.push("Author is required");
    }

    if (post.text === "") {
      errors.push("Text is required");
    }

    setSubmitError(errors);

    return errors.length === 0;
  };

  return (
    <dialog open={isOpen} className="createDialog">
      <form
        className="editForm"
        onSubmit={(e) => {
          e.preventDefault();
          if (!validateForm()) {
            return;
          }
          fetch(`http://192.168.1.25:3000/posts/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
          })
            .then((response) => {
              if (!response.ok) {
                return response.json().then((data) => {
                  throw new Error(data.message);
                });
              }
              return response.json();
            })
            .then((data) => {
              // Handle the response data here
              console.log(data);
              navigate("/");
            })
            .catch((error) => {
              console.error("Error:", error);
              if (error.message.includes("E11000 duplicate key error")) {
                setSubmitError([
                  "A post with this title already exists. Please choose a different title.",
                ]);
              } else {
                setSubmitError([error.message]);
              }
            });
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
          value={post.text}
          onChange={(e) => setPost({ ...post, text: e.target.value })}
        />
        <div className="check">
          <label htmlFor="published">Published</label>
          <input
            type="checkbox"
            checked={post.published}
            onChange={() => setPost({ ...post, published: !post.published })}
          />
        </div>
        <button className="submit" type="submit">
          Submit
        </button>
        {submitError.map((error, index) => (
          <p key={index} style={{ color: "red" }}>
            {error}
          </p>
        ))}
      </form>
      <br></br>
      <Link to="/" onClick={() => setIsOpen(false)}>
        Back to home
      </Link>
    </dialog>
  );
}

CreatePost.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.bool,
};

export default CreatePost;
