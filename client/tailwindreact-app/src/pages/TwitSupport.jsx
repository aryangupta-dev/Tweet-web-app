import { Field } from "formik";
import { Formik } from "formik";
import { Form } from "formik";
import { ErrorMessage } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";

function TwitSupport(){
    let history=useHistory();

    const InitialValues={
        username:"",
        title:"",
        hashtag:"",
    };
    const OnSubmit=(data,{resetForm})=>{
        
       axios.post("http://localhost:3001/posts",data).then((response)=>{
            console.log(response.data);
       });
       alert("Support added to hashtag section.Go to home page to see your support");
       resetForm();
       history.push("/posts");

      
      
    };
    const validationSchema = Yup.object().shape({
        title: Yup.string().min(40).max(60).required("You must input a Title!"),
        hashtag: Yup.string().required("Please Enter the hashtag"),
        username: Yup.string().min(3).max(15).required("You must enter a username"),
      });
    return (
    <div className="flex flex-col items-center h-screen bg-blue-300">
        <Formik initialValues={InitialValues} onSubmit={OnSubmit}  validationSchema={validationSchema}  >
            <Form className="fixed flex flex-col px-12 py-8 m-auto bg-gray-900 rounded-lg shadow-2xl lg:px-28 sm:px-20 sm:py-8 top-28">
                <div className="hidden mx-auto md:flex"><img src="https://cdn2.iconfinder.com/data/icons/metro-uinvert-dock/128/Twitter_NEW.png" alt="twitterlogo" className=""/></div>
                <label className="font-sans text-xl text-white">Username</label>
                <ErrorMessage name="username" className="text-red-700" component="span" />
                <Field name="username"  placeholder="Example John... " className="px-3 py-2 my-2 border border-white rounded-lg lg:px-6" />
                <label className="font-sans text-xl text-white">Title</label>
                <ErrorMessage name="title" className="text-red-700" component="span" />
                <Field name="title" placeholder="Example Modi "  className="px-3 py-2 my-2 border border-white rounded-lg lg:px-6"/>
                <label className="font-sans text-xl text-white">Hashtag</label>
                <ErrorMessage name="hashtag" className="text-red-700" component="span" />
                <Field name="hashtag" placeholder="Example #Supportmodi "  className="px-3 py-2 my-2 border border-white rounded-lg lg:px-6"/>
                <button className="px-4 py-3 my-1 text-white bg-blue-500 rounded-lg hover:bg-gray-300 hover:text-gray-900" type="submit"  >Submit</button>
                <span className="mx-auto mt-1 text-white align-baseline"> © 2021 All Rights Reserved.</span>
            </Form>
        </Formik>
    </div>);
}
export default TwitSupport;
