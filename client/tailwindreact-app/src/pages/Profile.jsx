import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
function Profile() {
  let history = useHistory();
  const [user, setUser] = useState([]);
  const logout = () => {
    localStorage.removeItem("accessToken");
    history.push("/");
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/profile", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, []);
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="flex flex-col items-center w-screen bg-gray-700 sm:w-64 ">
        <img
          src="https://image.flaticon.com/icons/png/128/2922/2922510.png"
          alt=""
          className=" mt-7"
        />
        <h1 className="mt-5 mb-5 text-lg text-white border-b-2 border-white">
          {user.username}
        </h1>
        <button onClick={logout} className="px-5 py-2 text-white bg-red-600">
          Log out
        </button>
      </div>
      <div className="w-screen h-screen bg-gradient-to-r from-purple-500 via-blue-300 to-yellow-300">
        <div className="my-5 sm:mx-14">
          <div className="flex flex-col items-center border-b-2 border-black font-nunito">
            <h1 className="text-4xl font-semibold ">Personal Info</h1>
            <p className="my-5 font-semibold text-md">
              These details are shared by you, updation of these section coming
              soon.
            </p>
          </div>
          <div className="my-5 ">
            <p className="max-w-sm px-5 py-2 my-5 text-xl font-semibold text-gray-500 bg-white border border-black rounded-md">
              User Id : <span>{user.id}</span>
            </p>
            <p className="max-w-sm px-5 py-2 my-5 text-xl font-semibold text-gray-500 bg-white border border-black rounded-md ">
              Username : <span>{user.username}</span>
            </p>
            <p className="max-w-md px-5 py-2 my-5 text-xl font-semibold text-gray-500 bg-white border border-black rounded-md ">
              Account Created Date : <span>{user.createdAt}</span>
            </p>
            <p className="max-w-md px-5 py-2 my-5 text-xl font-semibold text-gray-500 bg-white border border-black rounded-md ">
              Account Updated Date : <span>{user.updatedAt}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col p-2 border border-white sm:mx-14">
          <p className="p-2 text-lg font-semibold ">Disclamier</p>
          <p className="text-white">*The time has the orirgin of USA.</p>
          <p className="text-white">
            *This website is just for project, no commercial usage allow.
          </p>
          <p className="text-white">
            *Registered user can use it just for fun.
          </p>
        </div>
        <footer className="flex flex-col items-center mt-10 mb-5 text-white">
          © 2021 All Rights Reserved.
        </footer>
      </div>
    </div>
  );
}
export default Profile;
