
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
function UpdatePassword() {
    const[currentPassword,setCurrentPassword]=useState("");
    let {history}=useHistory();
    const[newPassword,setNewPassword]=useState("");
    const onSubmit=()=>{
        axios.put("http://localhost:3001/changepassword",{currentPassword:currentPassword,newPassword:newPassword},{
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }).then((response)=>{
            if(!response.data.error){
                alert("Password change successfully");
                history.push("/posts");
            }
            else{
                alert(response.data.error);
            }
          });
    }
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-400">
      
        <form className="fixed flex flex-col px-12 py-8 m-auto bg-white rounded-lg shadow-2xl lg:px-28 sm:px-20 sm:py-8 top-28" action="/posts">
          

          <label className="font-sans text-xl ">Current Password</label>
          
          <input
            name="currentPassword"
            type="password"
            placeholder="Current password"
            onChange={(event)=>setCurrentPassword(event.target.value)}
            className="px-3 py-2 my-2 text-white bg-black border border-white rounded-lg lg:px-6"
          />
          <label className="font-sans text-xl ">New password</label>
         
          <input
            
            placeholder="New password"
            type="password"
            className="px-3 py-2 my-2 text-white bg-black border border-white rounded-lg lg:px-6"
            onChange={(event)=>setNewPassword(event.target.value)}
          />
          <button
            className="px-4 py-3 my-1 text-white bg-purple-500 rounded-lg hover:bg-gray-300 hover:text-gray-900"
            onClick={onSubmit}
          >
            Change password
          </button>
          <span className="mx-auto mt-1 align-baseline">
        
            © 2021 All Rights Reserved.
          </span>
        </form>
      
    </div>
  );
}
export default UpdatePassword;
