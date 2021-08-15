import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Login() {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const OnSubmit = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data);
        history.push("/posts");
      }
    });
  };
  return (
    <div>
      <div className="flex flex-col w-full h-screen bg-blue-300 bg-no-repeat bg-gradient-to-r from-purple-500 sm:via-white to-blue-400 md:flex-row items-centre">
        <h1 className="mx-auto mr-5 text-white md:border-t-2 md:border-b-2 sm:p-10 lg:max-w-lg md:max-w-md text-7xl lg:text-8xl md:ml-20 lg:ml-30 md:my-auto xs:mt-20 broder-white xs:mb-5 font-nunito">
          Stand <span className="text-black hover:text-pink-600">out be</span>{" "}
          original.
        </h1>
        

        <div className="flex flex-col px-12 py-8 m-auto bg-gray-900 rounded-lg shadow-2xl lg:px-28 sm:px-20 sm:py-8 s md:right-12 lg:right-16 sm:top-16 lg:top-24">
          <div className="hidden mx-auto md:flex">
            <img
              src="https://cdn2.iconfinder.com/data/icons/metro-uinvert-dock/128/Twitter_NEW.png"
              alt="twitterlogo"
              className="animate-pulse"
            />
          </div>
          <h1 className="mx-auto text-2xl text-purple-600 font-nunito ">
            Log In
          </h1>
          <label className="font-sans text-xl text-white">Username</label>

          <input
            name="username"
            placeholder="Example John... "
            className="px-3 py-2 my-2 border border-white rounded-lg lg:px-6"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <label className="font-sans text-xl text-white">Password</label>

          <input
            name="password"
            placeholder="Example Dog.lov3r .. "
            className="px-3 py-2 my-2 border border-white rounded-lg lg:px-6"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button
            className="px-4 py-3 my-1 text-white bg-blue-500 rounded-lg hover:bg-gray-300 hover:text-gray-900"
            onClick={OnSubmit}
          >
            Submit
          </button>
          <span className="mx-auto mt-1 text-white align-baseline">
            © 2021 All Rights Reserved.
          </span>
        </div>
      </div>
      <div className="flex flex-col-reverse items-center py-10 sm:flex-col">
      <img
          className="hidden mb-5 sm:flex animate-bounce"
          src="https://image.flaticon.com/icons/png/32/545/545678.png"
          alt="kcnjnxjm"
        />
        <button
          className="px-16 py-3 text-white bg-yellow-400"
          onClick={() => history.push("/auth")}
        >
          Sign up
        </button>
        
        <h1 className="p-5 text-5xl border-yellow-500 sm:border-b-2 md:text-6xl font-staatliches">
          Register with us to use app
        </h1>
      </div>
    </div>
  );
}
export default Login;
