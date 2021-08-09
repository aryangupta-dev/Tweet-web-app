import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
function Post() {
  const [comments,setComments]=useState([]);
  const [newComment,setNewComment]=useState("");
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const addComment=()=>{
    axios.post(`http://localhost:3001/comments`,{comment:newComment,PostId:id}).then((response)=>{
          const commentToAdd={commentBody:newComment};
          setComments([...comments,commentToAdd]);
          setNewComment("");
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
      console.log(response.data);
    });
    axios.get(`http://localhost:3001/comments/${id}`).then((response)=>{
      setComments(response.data);
    })
  }, [newComment]);
  return (
    <div className="flex flex-row ">
      <div className="w-1/2 min-h-screen bg-gray-900">
        <div className="fixed flex flex-col px-3 py-10 bg-white rounded-lg md:flex-wrap flex-nowrap top-60 left-28">
          <div className="flex flex-row text-gray-600 border-b border-gray-300">
            <img
              src="https://image.flaticon.com/icons/png/16/733/733579.png"
              className="pl-2 pr-5"
            />
            <h1 className=" font-staatliches">{postObject.username}</h1>
          </div>
          <p className="mx-auto my-4 text-lg"> {postObject.title}</p>
          <div className="pl-5 font-mono font-semibold text-blue-600">
            {postObject.hashtag}
          </div>
          <div className="mt-2 text-gray-400">{postObject.createdAt}</div>
        </div>
      </div>
      <div className="w-1/2 min-h-screen ">
        <h1 className="mt-2 ml-2 font-mono text-2xl text-gray-700">Comment Section</h1>
        <div className="flex flex-col items-center">
            {comments.map((comment,key)=>{
              return(
                <div key={key}  className="px-5 py-2 m-2 bg-gray-500">{comment.comment}</div>
              );

            })}
        </div>
        <div className="fixed flex flex-row justify-around mt-8 bottom-5">
          <input className="px-8 py-2 ml-4 mr-3 border border-gray-500 rounded-md" placeholder="Comment..." onChange={(event)=> {
              setNewComment(event.target.value);
            }} value={newComment} type="text"></input>
          <button className="px-3 py-2 text-white bg-blue-600 rounded-md " type="submit" onClick={addComment}>Add comment</button>
          
        </div>
       
      </div>
      
    </div>
  );
}
export default Post;
