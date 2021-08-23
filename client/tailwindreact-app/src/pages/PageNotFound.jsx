import { Link } from "react-router-dom";

function PageNotFound(){
    return(
        <div className="mt-32 sm:mt-0">
            <div className="bg-gray-300 sm:p-24 sm:m-16">
            <img src="https://image.flaticon.com/icons/png/64/4457/4457164.png" alt=""  className="flex flex-row justify-around mx-auto"/>
            <h1  className="flex flex-row justify-around m-5 font-mono text-gray-900 sm:text-5xl">Page not found </h1>
            <h1 className="flex m-5 justify-evenly"> <Link to="/posts" className="text-xl text-blue-700 underline">Go to Home page </Link></h1>
            <h2 className="flex flex-row justify-around m-5 text-xl text-red-500 font-staatliches">Error 404</h2>
            
            </div>
        </div>
    );

}
export default PageNotFound;