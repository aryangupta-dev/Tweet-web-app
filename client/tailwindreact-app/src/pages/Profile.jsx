import axios from "axios";
import { useEffect, useState } from "react";
function Profile() {
  const [user, setUser] = useState([]);
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
      <div className="fixed flex flex-col items-center w-screen h-64 bg-gray-600 sm:w-64 sm:h-screen">
        <img
          src="https://img-premium.flaticon.com/png/128/2202/premium/2202112.png?token=exp=1629109366~hmac=33c68e064e4f810429b4703b8dd69660"
          alt=""
          className="mt-7"
        />
        <h1 className="mt-5 text-lg text-white border-b-2 border-white">{user.username}</h1>
      </div>
      <div className="w-full h-screen bg-gradient-to-r from-yellow-300 to-red-300">

      </div>
    </div>
  );
}
export default Profile;
