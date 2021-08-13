import { Field } from "formik";
import { Formik } from "formik";
import { Form } from "formik";
import { ErrorMessage } from "formik";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Login(){
  let history=useHistory()
    

  const InitialValues = {
    username: "",
    password: "",
    
  };
  const OnSubmit=(data)=>{
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if(response.data.error){
        alert(response.data.error);
      }else{
        sessionStorage.setItem("accessToken",response.data);
        history.push("/");
      }
    });
  
  };
return (
    <div className="flex flex-col w-full h-screen bg-blue-300 bg-no-repeat bg-gradient-to-r from-purple-500 sm:via-white to-blue-400 md:flex-row items-centre" >
       <h1 className="mx-auto mr-5 text-white md:border-t-2 md:border-b-2 sm:p-10 lg:max-w-lg md:max-w-md text-7xl lg:text-8xl md:ml-20 lg:ml-30 md:my-auto xs:mt-20 broder-white xs:mb-5 font-nunito">
         Stand <span className="text-black hover:text-pink-200">out be</span> original.
      </h1>
      <Formik
        initialValues={InitialValues}
        onSubmit={OnSubmit}
        
      >
        <Form className="flex flex-col px-12 py-8 m-auto bg-gray-900 rounded-lg shadow-2xl lg:fixed lg:px-28 sm:px-20 sm:py-8 s md:right-12 lg:right-16 sm:top-16 lg:top-24">
          <div className="hidden mx-auto md:flex">
            <img
              src="https://cdn2.iconfinder.com/data/icons/metro-uinvert-dock/128/Twitter_NEW.png"
              alt="twitterlogo"
              className="animate-pulse"
            />
          </div>
          <h1 className="mx-auto text-2xl text-purple-600 font-nunito ">Log In</h1>
          <label className="font-sans text-xl text-white">Username</label>
          <ErrorMessage
            name="username"
            className="text-red-700"
            component="span"
          />
          <Field
            name="username"
            placeholder="Example John... "
            className="px-3 py-2 my-2 border border-white rounded-lg lg:px-6"
          />
          <label className="font-sans text-xl text-white">Password</label>
          <ErrorMessage
            name="password"
            className="text-red-700"
            component="span"
          />
          <Field
            name="password"
            placeholder="Example Dog.lov3r .. "
            className="px-3 py-2 my-2 border border-white rounded-lg lg:px-6"
          />
          <button
            className="px-4 py-3 my-1 text-white bg-blue-500 rounded-lg hover:bg-gray-300 hover:text-gray-900"
            type="submit"
          >
            Submit
          </button>
          <span className="mx-auto mt-1 text-white align-baseline">
            © 2021 All Rights Reserved.
          </span>
        </Form>
      </Formik>
    </div>
);

}
export default Login