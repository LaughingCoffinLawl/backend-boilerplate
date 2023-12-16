import { useState, useEffect, useRef } from "react";
import { DateTime } from "luxon";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useDeletePost from "./DeletePost";

function Post({ post }) {
  const textRef = useRef();
  const deletePost = useDeletePost();

  const date = DateTime.fromISO(post.createAt).toLocaleString(
    DateTime.DATETIME_MED
  );

  return (
    <div className="card">
      <h3>{post.title}</h3>
      <p>{post.author}</p>
      <p ref={textRef}>{post.text}</p>
      <Link to={`/posts/${post._id}`} className="continue-reading">
        Continue Reading...
      </Link>
      <p>{date}</p>
      <div className="buttons">
        <a href={`/posts/edit/${post._id}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25px"
            viewBox="0 0 24 24"
          >
            <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
          </svg>
        </a>
        <a href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25px"
            viewBox="0 0 24 24"
            onClick={() => deletePost(post)}
          >
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    text: PropTypes.string,
    createAt: PropTypes.string,
    _id: PropTypes.string,
  }),
};

export default Post;
