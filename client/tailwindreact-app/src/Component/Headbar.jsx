import axios from "axios";
import { useEffect, useState } from "react";

function Headbar() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3001/username", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setUsername(response.data.username);
      });
  }, []);
  return (
    <div className="mb-16 text-gray-700 ">
      <div className="fixed top-0 flex flex-row w-screen py-5 bg-white">
        <a href="/posts" className="pl-10 text-lg">
          Posts
        </a>
        <a href="/twitsupport" className="pl-10 text-lg">
          Create Tweet
        </a>
        <div className="fixed flex flex-row right-5 sm:right-10">
          <a href="/profile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="flex text-blue-500 "
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </a>
          <a href="/profile" className="hidden ml-2 font-bold sm:flex">
            {username}
          </a>
        </div>
      </div>
    </div>
  );
}
export default Headbar;
