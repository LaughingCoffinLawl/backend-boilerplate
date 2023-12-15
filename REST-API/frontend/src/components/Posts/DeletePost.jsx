import { useNavigate } from "react-router-dom";

function useDeletePost() {
  const navigate = useNavigate();
  return function (post) {
    if (window.confirm("Are you sure you want to delete this post?")) {
      fetch(`http://192.168.1.25:3000/posts/${post._id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data here
          console.log(data);
          navigate("/");
        })
        .catch((error) => console.error("Error:", error));
    }
  };
}

export default useDeletePost;
