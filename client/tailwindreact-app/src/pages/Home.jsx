import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let history = useHistory();

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts((response.data).reverse());
      
    });
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen pt-5 text-black bg-gray-900">
      {listOfPosts.map((value, key) => {
        return (
          <div
            key={key}
            className="flex flex-col px-3 py-3 mx-3 my-3 bg-white rounded-lg md:flex-wrap flex-nowrap"
            onClick={() => {
              history.push(`/post/${value.id}`);
            }}
          >
            <div className="flex flex-row text-gray-600 border-b border-gray-300">
              <img src="https://image.flaticon.com/icons/png/16/733/733579.png" className="px-3 pl-2 mr-5" />
              <h1 className=" font-staatliches">
                {value.username}
              </h1>
            </div>
            <p className="mx-auto my-4 text-lg"> {value.title}</p>
            <div className="pl-5 font-mono font-semibold text-blue-600">
              {value.hashtag}
            </div>
            <div className="mt-2 text-gray-400">{value.createdAt}</div>
          </div>
        );
      })}
      <footer className="mb-5 text-white">© 2021 All Rights Reserved.</footer>
    </div>
  );
}
export default Home;
