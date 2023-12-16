import { useNavigate } from "react-router-dom";

function useDeleteComment() {
  const navigate = useNavigate();
  return function (comment) {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      fetch(`http://192.168.1.25:3000/comments/${comment._id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          navigate(window.location.reload());
        })
        .catch((error) => console.error("Error;", error));
    }
  };
}

export default useDeleteComment;
