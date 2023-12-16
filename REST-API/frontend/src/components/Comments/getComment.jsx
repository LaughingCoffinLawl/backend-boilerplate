import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDeleteComment from "../Comments/deleteComment";

function PostComments() {
  const { id: postId } = useParams();
  const [comments, setComments] = useState([]);
  const deleteComment = useDeleteComment();

  useEffect(() => {
    fetch(`http://192.168.1.25:3000/comments/post/${postId}`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error:", error));
  }, [postId]);

  const handleEdit = (commentId) => {
    setComments(
      comments.map((comment) => {
        console.log(comment);
        return comment._id === commentId
          ? { ...comment, isEditing: !comment.isEditing }
          : comment;
      })
    );
  };

  const handleTextChange = (commentId, newText) => {
    setComments(
      comments.map((comment) =>
        comment._id === commentId ? { ...comment, editText: newText } : comment
      )
    );
  };

  const handleSave = async (commentId) => {
    const updatedText = comments.find(
      (comment) => comment._id === commentId
    ).editText;

    // Call your API to update the comment with commentId
    const response = await fetch(
      `http://192.168.1.25:3000/comments/${commentId}`,
      {
        method: "PUT", // or 'PATCH'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: updatedText }),
      }
    );
    console.log(commentId);
    if (!response.ok) {
      // Handle error
      const errorData = await response.json();
      console.error("Error:", errorData);
      return;
    }

    // Then update the comments state
    setComments(
      comments.map((comment) =>
        comment._id === commentId
          ? { ...comment, text: updatedText, isEditing: false }
          : comment
      )
    );
  };

  return (
    <>
      {comments.map((comment) => {
        const date = DateTime.fromISO(comment.createAt).toLocaleString(
          DateTime.DATETIME_MED
        );

        return (
          <div key={comment._id} className="comments">
            <h3>{comment.author}</h3>
            <h5>{date}</h5>
            {comment.isEditing ? (
              <div>
                <textarea
                  value={comment.editText}
                  onChange={(e) =>
                    handleTextChange(comment._id, e.target.value)
                  }
                />
                <button onClick={() => handleSave(comment._id)}>Save</button>
              </div>
            ) : (
              <p>{comment.text}</p>
            )}
            <div className="buttons">
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25px"
                  viewBox="0 0 24 24"
                  onClick={() => handleEdit(comment._id)}
                >
                  <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                </svg>
              </a>
              <a href={`/posts/${postId}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25px"
                  viewBox="0 0 24 24"
                  onClick={() => deleteComment(comment)}
                >
                  <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
              </a>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default PostComments;
