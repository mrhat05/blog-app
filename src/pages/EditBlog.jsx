import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import appwriteService from '../appwrite/database_storage'
import {useNavigate, useParams } from "react-router-dom";
import {toast} from 'react-toastify'
import CircularLoader from '../components/CircularLoader'
import RTE from '../components/RTE'
import { useSelector } from "react-redux";

function EditBlog() {
  const {slug}=useParams()
  const userData=JSON.parse(localStorage.getItem("userData"));
  const [loader2,setLoader2]=useState(true)
  const [heading, setHeading] = useState("");
  const [new_slug, setSlug] = useState(slug);
  const [allowUpload1,setAllowUpload1]=useState(false)
  const [allowUpload2,setAllowUpload2]=useState(false)
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [imageId, setImageId] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [status, setStatus] = useState("active");
  const [previewURL, setPreviewURL] = useState("")
  const [loader,setLoader]=useState(false)
  const [error,setError]=useState("")
  const [noImageChange,setNoImageChange]=useState(true)
  const [noTitleChange,setNoTitleChange]=useState(true)
  const [imageType,setImageType]=useState("Import Image from Device")
  const [fileName, setFileName] = useState("No file Chosen");
  const navigate =useNavigate()
  const isDarkMode=useSelector((state)=>state.darkMode.isDarkMode)


  const truncateFileName = (name) => {
    const maxLength = 15; 
    const dotIndex = name.lastIndexOf(".");

    if (dotIndex === -1) return name;
    const extension = name.slice(dotIndex);
    const baseName = name.slice(0, dotIndex);

    return baseName.length > maxLength
      ? baseName.slice(0, maxLength) + "..." + extension
      : baseName + extension;
  };
  const fetchBlog=async()=>{
    try {
      setLoader2(true)
      const response=await appwriteService.getBlog(slug)

      let image_URL=""
      if(response.image_url !='!'){
        image_URL = await appwriteService.getFilePreview(response.image_url)
        image_URL=image_URL.replace("preview","view")
      }
      else{
        image_URL=response.image_real_url
        setImageType("Import Image from URL")
      }
      const data={
        title:response.title,
        content:response.content,
        image_url:image_URL,
        imageID:response.image_url,
        status:response.status,
        userID:response.userID,
        userName:response.userName,
        createdAt:response.$createdAt,
        updatedAt:response.$updatedAt,
        image_real_url:response.image_real_url
      }
      setHeading(data.title)
      setContent(data.content)
      setStatus(data.status)
      setImageId(data.imageID)
      if(data.image_real_url!="!")setImageURL(data.image_real_url)
      setPreviewURL(data.image_url)
    } catch (error) { 
      console.log("Error ::fetchBlogs()")
      setError("Blog not found. Please try again")
    }finally{
      setLoader2(false)
    }
  }
  useEffect(()=>{
    fetchBlog()
  },[])

  useEffect(()=>{
    if(new_slug.length>36)setAllowUpload1(true)
    else setAllowUpload1(false)
  },[new_slug])

  useEffect(()=>{
    if(content.length>100000)setAllowUpload2(true)
    else setAllowUpload2(false)
  },[content])

  const handleHeadingChange = (e) => {
    setNoTitleChange(false)
    const value = e.target.value;
    setHeading(value);
    setSlug(value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
  };

  const imageChangingDefinetly=async()=>{
    if(imageId!="!" && noImageChange){
      await appwriteService.deleteFile(imageId)
    }
    setNoImageChange(false)
  }

  const handleChangeInURL=(e)=>{
    imageChangingDefinetly()
    setImageURL(e.target.value)
  }
  const handlefileUpload = async(e) => {
    imageChangingDefinetly()
    let selectedFile=null
      if(e.target.files){
        selectedFile = e.target.files[0]
        setFileName(e.target.files[0].name)
      }
      else setImageURL(e.target.value)

    if (selectedFile) {
      setFile(selectedFile);
      setPreviewURL(URL.createObjectURL(selectedFile)); 
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
      let img;
      if(noImageChange){
        if(imageId!="!")img=imageId
        else img=imageURL
      }
      else{
          if(file){
            const curr_file = await appwriteService.uploadFile(file);
            img=curr_file.$id
          }
          else img=imageURL
        }
    
    if (!heading || !new_slug || !content || !img) {
      setLoader(false)
      setError("Please fill all the required fields and upload an image.");
      console.log({heading,new_slug,content,img})
      return;
    }
    let newblogData;
    if(noTitleChange){
          if(file){
            newblogData = {
              title:heading,
              image_url:img,
              content,
              status,
              image_real_url:"!"
            }
          }
          else if(imageURL){
            newblogData = {
              title:heading,
              image_url:"!",
              content,
              status,
              image_real_url:img
            }
          }
          else{
            newblogData = {
              title:heading,
              image_url:img,
              content,
              status,
              image_real_url:"!"
            }
          }
    }
    else{
        if(file){
          newblogData = {
            title:heading,
            slug:new_slug,
            image_url:img,
            content,
            status,
            userID:userData?.userID || "guest",
            userName:userData?.name || "guest",
            image_real_url:"!"
          };
        }
        else if(imageURL){
          newblogData = {
            title:heading,
            slug:new_slug,
            image_url:"!",
            content,
            status,
            userID:userData?.userID || "guest",
            userName:userData?.name || "guest",
            image_real_url:img
          };
        }
        else{
          newblogData = {
            title:heading,
            slug:new_slug,
            image_url:img,
            content,
            status,
            userID:userData?.userID || "guest",
            userName:userData?.name || "guest",
            image_real_url:"!"
          };
        }
    }
    try {
      let response
      if(noTitleChange){
        response=await appwriteService.updatBlog(slug,newblogData)
      }
      else{
      await appwriteService.deleteBlog(slug)
      response=await appwriteService.createBlog(newblogData)
      }
      if(response){
        toast.success("Blog updated successfully!",{
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined
        })
        navigate(`/blog/${new_slug}`)
        setHeading("");
        setSlug("");
        setContent("");
        setImageId(null);
        setStatus("active");
        setPreviewURL("")
      }
    } catch (error) {
      toast.error("Failed to update blog. Please try again.!",{
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
<div>
  {loader ? (
    <div className="flex items-center flex-col m-10 min-h-screen">
      <h2 className="text-xl text-gray-400 m-10">Updating the blog....</h2>
      <CircularLoader />
    </div>
  ) : loader2 ? (
    <div className="min-h-screen flex justify-center m-10">
      <CircularLoader />
    </div>
  ) : (
    <div className="overflow-hidden">
      <div className={`max-w-xl mb-52 mx-auto p-6 ${isDarkMode?"bg-darkBoxColor shadow-[0px_0px_10px_1px_rgba(0,0,0,0.05)] shadow-blue-800 ":"bg-white shadow-lg"} rounded-lg my-5 mt-10`}>
        {error && (
          <div className="flex p-2">
            <h2 className="text-red-600 text-sm">{error}</h2>
          </div>
        )}
        <h2 className="text-2xl font-semibold text-blue-700 mb-6">Edit Blog</h2>
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
              label="Heading"
              type="text"
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
              value={new_slug}
              readOnly
            />
            <span className="absolute right-2 top-2 text-sm text-gray-500">
              {new_slug.length}/36
            </span>
          </div>

          <RTE label={"Content"} value={content}
            onChange={(newContent)=>{
              setContent(newContent)
            }} />
          

          <div className="flex flex-col gap-6 items-center">
            <Select
              label="Upload Image"
              value={imageType}
              onChange={(e) => setImageType(e.target.value)}
              options={["Import Image from Device", "Import Image from URL"]}
              required
              className="w-full"
            />
            {imageType === "Import Image from Device" ? (
              <div className="flex w-full justify-between">
                <input
                  type="file"
                  accept=".jpg,.png,.gif,.jpeg"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handlefileUpload}
                />
                <label
                  htmlFor="fileInput"
                  className="bg-blue-600 rounded-lg"
                  style={{
                    cursor: "pointer",
                    padding: "10px",
                    color: "white",
                    display: "inline-block",
                  }}
                >
                  Choose Image
                </label>
                <p>{truncateFileName(fileName)}</p>
              </div>
            ) : (
              <Input
                value={imageURL}
                label="Image URL"
                onChange={handleChangeInURL}
              ></Input>
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
  )}
</div>

  );
}

export default EditBlog
