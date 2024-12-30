import React, { useId, useState } from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import  authService  from "../appwrite/auth";
import CircularLoader from '../components/CircularLoader'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loader,setLoader]=useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const id1=useId()
  const [showPassword,setShowPassword]=useState(false)
  
  const handleShowPassword=(e)=>{
      e.preventDefault()
      setShowPassword(!showPassword)
  }
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)
    setErrorMessage("");

    try {
      await authService.createAccount(formData)

      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message || "Sign-up failed. Please try again.");
    }
    setLoader(false)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {loader?(
        <CircularLoader/>
      )
      :(
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Create an Account
        </h2>
        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          
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
                        <label htmlFor={id1} className='inline-block text-sm font-medium text-gray-600 mb-3 pl-1'>Password</label>
                        <div className="relative w-full focus-within:ring-2 focus-within:ring-blue-500 rounded-lg">
                          <input
                            type={showPassword?"text":"password"}
                            className="px-3 py-2  focus:outline-none rounded-tl-lg rounded-bl-lg bg-white text-black focus:bg-gray-50 duration-200 border border-gray-200 w-11/12"
                            id={id1}
                            placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)} required
                          />
                          <button type="button"
                            className="w-1/12 border-r border-t border-b border-gray-200 px-2 py-2 rounded-tr-lg rounded-br-lg absolute right-0 top-0 h-full flex justify-center items-center"
                          >
                            <FontAwesomeIcon onClick={handleShowPassword} icon={showPassword?faEye:faEyeSlash} />
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
          <a
            href="/login"
            className="text-blue-500 hover:underline font-medium"
          >
            Log In
          </a>
        </p>
      </div>)
}
    </div>
  )
};

export default SignUp;
