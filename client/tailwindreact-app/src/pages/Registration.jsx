import { Field } from "formik";
import { Formik } from "formik";
import { Form } from "formik";
import { ErrorMessage } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
function Registration() {
  let history = useHistory();

  const InitialValues = {
    username: "",
    password: "",
    phoneNo: "",
  };
  const OnSubmit = (data, { resetForm }) => {
    axios.post("http://localhost:3001/auth", data).then((response) => {
      console.log(response.data);
    });
    alert("You are registered with us, Login to your accout.");
    resetForm();
    history.push("/auth/login");
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8)
      .max(15)
      .required("You must input a Strong password!"),
    phoneNo: Yup.string()
      .min(10)
      .max(10)
      .required("Please enter the valid phone no"),
    username: Yup.string().min(3).max(15).required("You must enter a username"),
  });
  return (
    <div>
    <div className="flex flex-col h-screen bg-blue-300 md:flex-row">
      <h1 className="mx-auto mr-5 text-white md:border-t-2 md:border-b-2 sm:p-10 lg:max-w-lg md:max-w-md text-7xl lg:text-8xl md:ml-20 lg:ml-30 md:my-auto xs:mt-20 broder-white xs:mb-5 font-nunito">
        Tweet <span className="text-black hover:text-pink-500">with  the </span>world.
      </h1>
      

      <Formik
        initialValues={InitialValues}
        onSubmit={OnSubmit}
        validationSchema={validationSchema}
      >
        <Form className="flex flex-col px-12 py-8 m-auto bg-gray-900 rounded-lg shadow-2xl lg:px-28 sm:px-20 sm:py-8 lg:my-auto md:right-12 lg:right-16 sm:top-16">
          <div className="hidden mx-auto md:flex">
            <img
              src="https://cdn2.iconfinder.com/data/icons/metro-uinvert-dock/128/Twitter_NEW.png"
              alt="twitterlogo"
              className="animate-pulse"
            />
          </div>
          <h1 className="mx-auto text-2xl text-purple-600 font-nunito ">Sign up</h1>
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
          <label className="font-sans text-xl text-white">Phone no</label>
          <ErrorMessage
            name="phoneNo"
            className="text-red-700"
            component="span"
          />
          <Field
            name="phoneNo"
            placeholder="Example 4545487461 "
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
      <div className="flex flex-col-reverse items-center py-10 sm:flex-col">
      <img
          className="hidden mb-5 sm:flex animate-bounce"
          src="https://image.flaticon.com/icons/png/32/545/545678.png"
          alt="kcnjnxjm"
        />
        <button className="px-10 py-3 text-white bg-yellow-400" onClick={()=>history.push("/auth/login")}>Log In</button>
      <h1 className="p-5 text-5xl border-yellow-500 sm:border-b-2 md:text-6xl font-staatliches">Already register with us</h1>

      </div>
    </div>
  );
}
export default Registration;
