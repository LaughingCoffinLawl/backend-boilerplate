// CommentForm.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function CommentForm({ postId }) {
  const [comment, setComment] = useState({
    author: "",
    text: "",
    postId: postId,
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://192.168.1.25:3000/comments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
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
        console.log(data);
        navigate(window.location.reload());
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const handleChange = (event) => {
    setComment({
      ...comment,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="author">Name:</label>
      <br></br>
      <input type="text" name="author" onChange={handleChange} />
      <br></br>
      <br></br>
      <textarea
        name="text"
        id="commentID"
        cols=""
        rows="10"
        value={comment.text}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default CommentForm;
