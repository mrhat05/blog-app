import React, { useEffect, useId, useState } from "react";
import Input from "../components/Input";
import Button from '../components/Button'
import authService from "../appwrite/auth";
import {useDispatch} from'react-redux'
import {login} from '../store/authSlice'
import { Link,useNavigate } from "react-router-dom";
import CircularLoader from '../components/CircularLoader'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage,setErrorMessage]=useState("")
  const [loader,setLoader]=useState(false)
  const dispatch=useDispatch()
  const id1=useId()
  const [showPassword,setShowPassword]=useState(false)
  const navigate=useNavigate()
  const darkModeAns=localStorage.getItem("darkMode")
  const isDarkMode=darkModeAns?darkModeAns==="true":true
  const handleShowPassword=(e)=>{
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  const handleLogin =async (e) => {
    e.preventDefault();
    setLoader(true)
    try {
      const session= await authService.login({email,password})
      console.log("Login Successful")
      const acc=await authService.getCurrentUser()
      const name =acc.name
      const userID =acc.$id
      localStorage.setItem("authStatus", "true");
      localStorage.setItem("userData", JSON.stringify({ email,name,userID}))
      dispatch(login({ userData: { email, name,userID } }))
      
    } catch (error) {
      console.log("Login Unsucessful")
      
      let message = error?.response?.message 
      
      message? message= message.replace("param","").trim():message="Login failed. Please try again.";
      
      
      setLoader(false)
      setErrorMessage(message);
    }
  }
  return (
    <div className={`flex items-center justify-center min-h-screen ${isDarkMode?"bg-black":"bg-gray-100"}`}>
      {loader?
        (
          <CircularLoader/>
        )
        :(
      <div className={`w-full max-w-md p-8 space-y-4 ${isDarkMode?"bg-radial-dark  shadow-[0px_0px_10px_1px_rgba(0,0,0,0.05)] shadow-blue-800":"bg-white shadow-lg"}  rounded-lg`}>
        <h2 className={`text-2xl font-bold text-center ${isDarkMode?"text-darkPrimaryTextColor":"text-gray-800"}`}>
          Login to Your Account
        </h2>
        {
          errorMessage?(
            <h2 className="text-sm text-red-600">{errorMessage}</h2>
          ):null
        }
        <form onSubmit={handleLogin} className="space-y-6">
            <Input label={`Email`} placeholder='Enter your email' classNames='' onChange={(e) => setEmail(e.target.value)} required autoComplete={"on"} />


            <div className="flex flex-col">
              <label htmlFor={id1} className={`inline-block text-sm font-medium ${isDarkMode?"text-darkSecondaryTextColor":"text-gray-600"} mb-3 pl-1`}>Password</label>
              <div className={`relative w-full focus-within:ring-2 ${isDarkMode?"focus-within:ring-white":"focus-within:ring-blue-500"} rounded-lg`}>
                <input
                  type={showPassword?"text":"password"}
                  className={`px-3 py-2  focus:outline-none rounded-tl-lg rounded-bl-lg ${isDarkMode?"bg-darkButtonsTextColor text-white":"bg-white text-black"}  duration-200  w-11/12`}
                  id={id1}
                  placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)} required
                />
                <button onClick={handleShowPassword} type="button"
                  className={`w-1/12 border-r border-t border-b border-gray-200 px-2 py-2 bg-white rounded-tr-lg rounded-br-lg absolute right-0 top-0 h-full flex justify-center items-center`}
                >
                  <FontAwesomeIcon icon={showPassword?faEye:faEyeSlash} />
                </button>
              </div>

            </div>
          
            <Button  type="submit" classNames="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Login
            </Button>
            
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link 
            to="/signup"
            className="font-medium text-blue-500 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    )}
    </div>
  );
};

export default Login;
