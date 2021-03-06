import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
function Post() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  
  const [loggeduser, setLoggeduser] = useState([]);
  let history = useHistory();
  const addComment = () => {
    axios
      .post(
        `http://localhost:3001/comments`,
        { comment: newComment, PostId: id },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          alert("User must be login");
        } else if (newComment == "") {
          alert("Comment field should not be empty");
        } else {
          const commentToAdd = { comment: newComment };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };
  const deleteComment = (id) => {
    axios.delete(`http://localhost:3001/comments/${id}`).then((response) => {
      alert("Deleted Successfully");
      setComments(
        comments.filter((val) => {
          return val.id != id;
        })
      );
    });
  };
  const deletePost=(postId)=>{
    axios.delete(`http://localhost:3001/deletepost/${postId}`).then((response)=>{
      alert("Deleted sucessfully");
      history.push("/posts");
    });
  }

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
    axios
      .get(`http://localhost:3001/profile`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setLoggeduser(response.data);
      });
  }, [newComment]);
  return (
    <div className="flex flex-col md:flex-row ">
      <div className="min-h-full p-10 bg-gray-900 md:w-1/2 md:min-h-screen">
        <div className="flex flex-col max-w-sm px-5 py-10 mx-auto bg-white rounded-lg md:px-3 md:mt-16 md:fixed lg:ml-16 sm:l-5 md:flex-wrap flex-nowrap">
          <div className="flex flex-row text-gray-600 border-b border-gray-300">
            <img
              src="https://image.flaticon.com/icons/png/16/733/733579.png"
              className="pl-2 pr-5"
            />
            <h1 className=" font-staatliches">{postObject.username}</h1>
          </div>
          <p className="mx-auto my-4 text-lg"> {postObject.title}</p>
          <div className="font-mono font-semibold text-blue-600 sm:pl-5">
            {postObject.hashtag}
          </div>
          <div className="flex flex-row justify-between">
            
          <h1 className="mt-2 text-gray-400">{postObject.createdAt}</h1>
          {loggeduser.username===postObject.username && <button  className="p-2 rounded-sm hover:bg-blue-200" onClick={()=>deletePost(postObject.id)}><img  src="https://image.flaticon.com/icons/png/32/1214/1214428.png" alt="" /></button>}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start w-1/2 min-h-full md:min-h-screen">
        <h1 className="px-4 py-2 mt-2 ml-2 font-mono text-base text-gray-700 border border-black rounded-lg md:text-2xl ">
          Comment Section
        </h1>
        <div className="flex flex-col ">
          {comments.map((comment, key) => {
            return (
              <div
                key={key}
                className="px-5 py-2 m-2 text-lg border border-gray-300 font-nunito"
              >
                <h1>{comment.comment}</h1>{" "}
                {comment.username == loggeduser.username ? (
                  <button
                    className="px-4 py-2 text-sm text-white bg-red-500 rounded-sm text white font-oswald"
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    Delete
                  </button>
                ) : (
                  <div className="flex flex-row m-2">
                    <img
                      src="https://image.flaticon.com/icons/png/24/1077/1077012.png"
                      alt=""
                      className="pr-2"
                    />
                    <h1 className="font-mono text-sm ">{comment.username}</h1>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col justify-around mt-8 sm:flex-row sm:fixed bottom-5">
          <input
            className="px-5 py-2 ml-4 mr-3 border border-gray-500 rounded-md sm:px-8"
            placeholder="Comment..."
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
            value={newComment}
            null=""
            type="text"
          ></input>
          <button
            className="px-2 py-2 mt-5 ml-4 text-white bg-blue-600 rounded-md "
            type="submit"
            onClick={addComment}
          >
            Add comment
          </button>
        </div>
      </div>
    </div>
  );
}
export default Post;
