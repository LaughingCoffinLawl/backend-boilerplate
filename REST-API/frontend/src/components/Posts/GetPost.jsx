import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import useDeletePost from "./DeletePost";
import CommentForm from "../Comments/createComment";
import PostComments from "../Comments/getComment";

function PostPage() {
  const { id: postId } = useParams();
  const [post, setPost] = useState([]);
  const deletePost = useDeletePost();

  useEffect(() => {
    fetch(`http://192.168.1.25:3000/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error("Error:", error));
  }, [postId]);

  const date = DateTime.fromISO(post.createAt).toLocaleString(
    DateTime.DATETIME_MED
  );

  // Render the post data
  return (
    <>
      <div>
        {post ? (
          <>
            <h1>{post.title}</h1>
            <h4>{post.author}</h4>
            <h5>{date}</h5>
            <p>{post.text}</p>
            <Link to="/">Back to home</Link>
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
              <a href={`/posts/${post._id}`}>
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
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <h2>Comments</h2>
      <PostComments postId={postId} />
      <h4>Leave a comment</h4>
      <CommentForm postId={postId} />
    </>
  );
}

export default PostPage;
