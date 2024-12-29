import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import appwriteService from '../appwrite/database_storage'
import {useNavigate, useParams } from "react-router-dom";
import {toast} from 'react-toastify'
import CircularLoader from '../components/CircularLoader'


function EditBlog() {
  const {slug}=useParams()
  const userData=JSON.parse(localStorage.getItem("userData"));
  const [loader2,setLoader2]=useState(true)
  const [heading, setHeading] = useState("");
  const [new_slug, setSlug] = useState(slug);
  const [allowUpload1,setAllowUpload1]=useState(false)
  const [allowUpload2,setAllowUpload2]=useState(false)
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("active");
  const [previewURL, setPreviewURL] = useState("")
  const [loader,setLoader]=useState(false)
  const [error,setError]=useState("")
  const [noImageChange,setNoImageChange]=useState(true)
  const [noTitleChange,setNoTitleChange]=useState(true)
  const navigate =useNavigate()


  const fetchBlog=async()=>{
    try {
      setLoader2(true)
      const response=await appwriteService.getBlog(slug)

      const image=await appwriteService.getFilePreview(response.image_url)
      const image_URL=image.replace("preview","view")

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
      }
      setHeading(data.title)
      setContent(data.content)
      setStatus(data.status)
      setImage(data.imageID)
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
    if(content.length>900)setAllowUpload2(true)
    else setAllowUpload2(false)
  },[content])

  const handleHeadingChange = (e) => {
    setNoTitleChange(false)
    const value = e.target.value;
    setHeading(value);
    setSlug(value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
  };

  const handlefileUpload = async(e) => {
    setNoImageChange(false)
    const selectedFile = e.target.files[0];
    await appwriteService.deleteFile(image)
    if (selectedFile) {
      setImage(selectedFile);
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
      let imgID;
      if(noImageChange){
        imgID=image
      }
      else{
        const file = await appwriteService.uploadFile(image);
        imgID=file.$id
      }
    
    if (!heading || !new_slug || !content || !imgID) {
      setError("Please fill all the required fields and upload an image.");
      console.log({heading,new_slug,content,imgID})
      return;
    }
    let newblogData;
    if(noTitleChange){
      newblogData = {
        title:heading,
        image_url:imgID,
        content,
        status,
      };
    }
    else{
      newblogData = {
        title:heading,
        slug:new_slug,
        image_url:imgID,
        content,
        status,
        userID:userData?.userID || "guest",
        userName:userData?.name || "guest"
      };
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
        setImage(null);
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
      {loader?(
        <div className="flex items-center flex-col m-10 min-h-screen">
          <h2 className="text-xl text-gray-400 m-10">Updating the blog....</h2>
          <CircularLoader/>
        </div>
      ):loader2?(
        <div className="min-h-screen flex justify-center m-10">
          <CircularLoader/>
        </div>
      )
      :(
        <div>
    <div className="max-w-xl mb-52 mx-auto p-6 bg-white shadow-md rounded-lg my-5 mt-10">
      {error &&(
        <div className="flex p-2">
          <h2 className="text-red-600 text-sm">{error}</h2>
        </div>
      )
      }
      <h2 className="text-2xl font-semibold text-blue-700 mb-6">Edit Blog</h2>
      <form onSubmit={(allowUpload1 || allowUpload2)
        ?allowUpload1?handleSize1:allowUpload2?handleSize2:handleSubmit:handleSubmit
      } className="space-y-4">
        <Input
          label="Heading"
          type="text"
          value={heading}
          onChange={handleHeadingChange}
          required
          className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg h-8"
        />

        <Input
          label="Slug"
          type="text"
          value={new_slug}
          readOnly
          className="w-full h-8 bg-gray-100 outline-none rounded-lg"
        />

        <label className="inline-block text-sm font-medium text-gray-600 mb-3 pl-1" htmlFor="ta-1">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          id="ta-1"
          className="w-full h-40 p-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none overflow-y-auto text-gray-800"
          placeholder="Type something..."
        ></textarea>

        <Input
          label="Upload Image (If you don't choose an image, the previous one will be retained.)"
          type="file"
          onChange={handlefileUpload}
          accept=".jpg,.png,.gif"
          className="file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-700"
        />

        {previewURL && (
          <div className="w-full mb-4 flex justify-center">
            <img
              src={previewURL}
              alt={heading}
              className="rounded-lg"
            />
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
    </div>)
    }
    </div>
  );
}

export default EditBlog
