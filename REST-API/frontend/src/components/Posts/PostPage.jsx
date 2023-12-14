import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";

function PostPage() {
  const { id: postId } = useParams();
  const [post, setPost] = useState([]);

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
    <div>
      {post ? (
        <>
          <h1>{post.title}</h1>
          <h4>{post.author}</h4>
          <h5>{date}</h5>
          <p>{post.text}</p>
          <Link to="/">Back to home</Link>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PostPage;
