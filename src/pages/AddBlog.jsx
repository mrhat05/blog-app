import React, { useState, useEffect,useRef } from "react";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import appwriteService from '../appwrite/database_storage'
// import ClearStorageButton from "../components/ClearBTN";
import {useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import CircularLoader from '../components/CircularLoader'
import RTE from '../components/RTE'
import { useSelector } from "react-redux";

function AddBlogForm() {
  const userData=JSON.parse(localStorage.getItem("userData"));
  const [heading, setHeading] = useState("");
  const [slug, setSlug] = useState("");
  const [allowUpload1,setAllowUpload1]=useState(false)
  const [allowUpload2,setAllowUpload2]=useState(false)
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("active");
  const [previewURL, setPreviewURL] = useState("")
  const [loader,setLoader]=useState(false)
  const [error,setError]=useState("")
  const navigate =useNavigate()
  const [imageType,setImageType]=useState("Import Image from Device")
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  useEffect(()=>{
    if(slug.length>36)setAllowUpload1(true)
    else setAllowUpload1(false)
  },[slug])

  useEffect(()=>{
    if(content.length>100000)setAllowUpload2(true)
    else setAllowUpload2(false)
  },[content])



  const handleHeadingChange = (e) => {
    const value = e.target.value;
    setHeading(value);
    setSlug(value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""))
  }

  const handlefileUpload = (e) => {
    if(imageType==="Import Image from Device"){
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setImage(selectedFile);
        setPreviewURL(URL.createObjectURL(selectedFile)); 
      }
    }
    else{
      setImage(e.target.value)
    }
  };

  const handleSize2=(e)=>{
    e.preventDefault()
    setError("The content should be at max of 900 characters.")
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleSize1=(e)=>{
    e.preventDefault()
    setError("The slug should be smaller than 36 characters.")
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'instant' });
    setError("")
    setLoader(true)
    let image_copy=image
    let imgID="!";
    if(imageType==="Import Image from Device"){

      const file = await appwriteService.uploadFile(image);
      imgID=file.$id
      image_copy="!"
    }
    if (!heading || !slug || !content || !image) {
      setError("Please fill all the required fields and upload an image.");
      return;
    }

    const blogData = {
      title:heading,
      slug,
      image_url:imgID,
      content,
      status,
      userID:userData?.userID || "guest",
      userName:userData?.name || "guest",
      image_real_url:image_copy,
    };
    try {
      const response=await appwriteService.createBlog(blogData)
      if(response){
        toast.success("Blog uploaded successfully!",{
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined
        })
        navigate(`/blog/${slug}`)
        setHeading("");
        setSlug("");
        setContent("");
        setImage(null);
        setStatus("active");
        setPreviewURL("")
      }
    } catch (error) {
      toast.error("Failed to submit blog. Please try again.!",{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined
    })
      navigate("/addBlog")
      console.error("Error submitting blog:", error);
    }
    setLoader(false)
  }

  return (
<div className={`overflow-hidden`}>
  <div>
  {loader ? (
    <div className="flex items-center flex-col m-10 min-h-screen ">
      <h2 className="text-xl text-gray-400 m-10">Uploading the blog....</h2>
      <CircularLoader />
    </div>
  ) : (
    <div className={`${isDarkMode?"bg-darkBgColor":"bg-white"}`}>
      <div className={`max-w-xl mb-52 mx-auto shadow-md rounded-lg my-5 mt-10  `}>
        {error && (
          <div className="flex p-2">
            <h2 className="text-red-600 text-sm">{error}</h2>
          </div>
        )}
        <div className={`p-5 rounded-lg ${isDarkMode?"bg-darkBoxColor   shadow-[0px_0px_8px_2px_rgba(0,0,0,0.05)] shadow-blue-800":"bg-gray-50 border border-gray-200"} shadow-lg`}>
        <h2 className={`text-2xl font-semibold text-blue-600 mb-6`}>Add Blog</h2>
        <form
          onSubmit={
            allowUpload1 || allowUpload2
              ? allowUpload1
                ? handleSize1
                : allowUpload2
                ? handleSize2
                : handleSubmit
              : handleSubmit
          }
          className="space-y-4"
        >
          <div className="relative">
            <Input 
            label={"Title"} 
            value={heading}
            onChange={handleHeadingChange}
            required
            />
            <span className="absolute right-2 top-2 text-sm text-gray-500">
              {heading.length}
            </span>
          </div>

          <div className="relative">
            <Input
              label="Slug"
              type="text"
              value={slug}
              readOnly
            />
            <span className="absolute right-2 top-2 text-sm text-gray-500">
              {slug.length}/36
            </span>
          </div>
          
          <RTE label={"Content"} value={content}
            onChange={(newContent)=>{
              setContent(newContent)
            }} />

          <div className="flex flex-col gap-6 items-center ">
            <Select
              label="Upload Image"
              value={imageType}
              onChange={(e) => setImageType(e.target.value)}
              options={["Import Image from Device", "Import Image from URL"]}
              required
              className="w-full"
            />
            {imageType === "Import Image from Device" ? (
              <Input
                label=""
                type="file"
                onChange={handlefileUpload}
                accept=".jpg,.png,.gif,.jpeg"
                required
                className="file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-700"
              />
            ) : (
              <Input
                label="Image URL"
                required
                onChange={handlefileUpload}
              />
            )}
          </div>

          {previewURL && (
            <div className="w-full mb-4 flex justify-center">
              <img src={previewURL} alt={heading} className="rounded-lg" />
            </div>
          )}

          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={["active", "inactive"]}
            required
            className="w-full"
          />

          <Button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </Button>
        </form>
        </div>
      </div>
      </div>
  )}
  </div>
</div>

  );
}

export default AddBlogForm;
