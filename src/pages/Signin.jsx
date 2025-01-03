import React, { useId, useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import CircularLoader from "../components/CircularLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from'react-redux'
import {login} from '../store/authSlice'

const SignUp = () => {
    const [formData, setFormData] = useState({ email: "", password: "", name: "" });
    const [loader, setLoader] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const id1 = useId();
    const [showPassword, setShowPassword] = useState(false);  const darkModeAns=localStorage.getItem("darkMode")
    const isDarkMode=darkModeAns?darkModeAns==="true":true

    const handleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.name || !formData.email || !formData.password) {
          setErrorMessage("All fields are required.");
          return;
      }
  //ha
      setLoader(true);
      try {
          const response=await authService.createAccount(formData);
          try {
            const session = await authService.login({ email: response.email, password: formData.password })
            localStorage.setItem("authStatus", "true");
            localStorage.setItem("userData", JSON.stringify({ email:response.email,name:response.name,userID:response.$id}))
            dispatch(login({ userData: { email:response.email,name:response.name,userID:response.userID} }))
            navigate('/')
          } catch (error) {
            setErrorMessage("Login Error")
            console.log("Error in signup login () :: ",error)
            
          }
          console.log(response)
      } catch (signUpError) {
          setErrorMessage(signUpError.message || "Sign-up failed. Please try again.")
      } finally {
          setLoader(false);
      }
  }  

    return (
        <div className={`min-h-screen flex items-center justify-center ${isDarkMode?"bg-black ":"bg-gray-100"}`}>
            {loader ? (
                <div className="flex justify-center items-center">
                    <CircularLoader />
                </div>
            ) : (
                <div className={`w-full max-w-md p-8 space-y-4 ${isDarkMode?"bg-radial-dark  shadow-[0px_0px_10px_1px_rgba(0,0,0,0.05)] shadow-blue-800":"bg-white shadow-lg"}  rounded-lg`}>
                    <h2 className={`text-2xl font-bold mb-6 text-center ${isDarkMode?"text-darkPrimaryTextColor":"text-gray-800"}`}>
                        Create an Account
                    </h2>
                    {errorMessage && (
                        <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
                    )}
                    <form className="space-y-6" onSubmit={handleSubmit} autoComplete={"on"}>
                        <Input
                            label="Name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                        <div className="flex flex-col">
                            <label htmlFor={id1} className={`inline-block text-sm font-medium ${isDarkMode?"text-darkSecondaryTextColor":"text-gray-600"} mb-3 pl-1`}>Password</label>
                            <div className={`relative w-full focus-within:ring-2 ${isDarkMode?"focus-within:ring-white":"focus-within:ring-blue-500"} rounded-lg`}>
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    className={`px-3 py-2  focus:outline-none rounded-tl-lg rounded-bl-lg ${isDarkMode?"bg-darkButtonsTextColor text-white":"bg-white text-black"}  duration-200  w-11/12`}
                                    id={id1}
                                    placeholder="Enter your Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className={`w-1/12 border-r border-t border-b border-gray-200 px-2 py-2 bg-white rounded-tr-lg rounded-br-lg absolute right-0 top-0 h-full flex justify-center items-center`}
                                    onClick={handleShowPassword}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg mt-6"
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className="mt-4 text-sm text-center text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-500 hover:underline font-medium">
                            Log In
                        </Link>
                    </p>
                </div>
            )}
        </div>
    );
};

export default SignUp;
