import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
function YourPosts(){
    const [listOfPosts, setListOfPosts] = useState([]);
    let {id}=useParams();
  let history = useHistory();
  const likeButton=(postId)=>{
    axios.post("http://localhost:3001/likes",{PostId:postId},{
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response)=>{
      console.log(response.data)
        setListOfPosts(listOfPosts.map((post)=>{
          if(post.id===postId){
            if(response.data.liked){
              return {...post,Likes:[...post.Likes,0]};
            }else{
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
            }
          }else{
            return post;
          }
        }));

    });

  };

  useEffect(() => {
    
    axios.get(`http://localhost:3001/userposts/${id}`,{
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if(!response.data.error){
      setListOfPosts(response.data.reverse());}
      else{
        history.push("/");
      }
    });
   
  }, []);

    
    return(
        <div className="flex flex-col items-center min-h-screen pt-5 bg-gradient-to-b from-red-300 to-red-400">
            <p className="text-xl font-semibold text-white border-b-2 border-white pb-">Posts shared </p>
            {listOfPosts.map((value, key) => {
        return (
          <div
            key={key}
            className="flex flex-col max-w-sm px-3 mx-3 my-3 bg-white rounded-lg sm:max-w-md py-7"
          >
            <div className="flex flex-row text-gray-600 border-b border-gray-300">
              <img
                src="https://image.flaticon.com/icons/png/16/733/733579.png"
                className="px-3 pl-2 mr-5"
              />
              <h1 className=" font-staatliches">{value.username}</h1>
            </div>
            <p
              className="mx-auto my-4 text-lg "
              onClick={() => {
                history.push(`/post/${value.id}`);
              }}
            >
              {" "}
              {value.title}
            </p>
            <div
              className="pl-5 font-mono font-semibold text-blue-600"
              onClick={() => {
                history.push(`/post/${value.id}`);
              }}
            >
              {value.hashtag}
            </div>
            <div className="flex flex-row items-end" >
            <button className="mr-5"  onClick={()=>{likeButton(value.id)}}  >👍</button>
            <label >{value.Likes.length}</label>
            </div>
            <div className="mt-2 text-gray-400">{value.createdAt}</div>
          </div>
        );
      })}
      <footer className="mb-5 text-white">© 2021 All Rights Reserved.</footer>
        </div>
    );


}
export default YourPosts;