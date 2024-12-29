import React, { useEffect, useState } from 'react'
import BlogComponent from '../components/BlogComponent'
import appwriteService from '../appwrite/database_storage'
import { useParams } from 'react-router-dom'

function Blog() {
  const {slug}=useParams()
  const[blogData,setBlogData]=useState(null)
  const [loader,setLoader]=useState(true)
  const [error,setError]=useState(null)


  useEffect(()=>{
    fetchBlog()
    return ()=>{
      setBlogData(null);
      setLoader(false);
      setError(null);
    }
  },[])


  const fetchBlog=async()=>{
    try {
      setLoader(true)
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
      setBlogData(data)
    } catch (error) {
      console.log("Error ::fetchBlogs()")
      setError("Blog not found. Please try again")
      setBlogs(null)
    }finally{
      setLoader(false)
    }
  }


  return (
    <div>
      {
        loader ?(
          <div className='min-h-screen flex justify-center m-5 shadow-lg rounded-lg max-w-3xl mx-auto p-4 sm:p-6 my-4 w-full bg-gray-200 bg-opacity-35'></div>
        ): error ?(
          <div className='min-h-screen text-xl flex justify-center m-10'>{error}</div>
        ):!blogData?(
          <div className='min-h-screen text-xl flex justify-center m-10'>Blog not found.</div>
        ):(
          <div className='mb-52 mt-10'>
            <BlogComponent uploaderName={blogData.userName} uploadTime={blogData.createdAt} blogTitle={blogData.title} blogContent={blogData.content} blogImage={blogData.image_url} userID={blogData.userID} slug={slug} imageID={blogData.imageID} isActive={blogData.status} />
          </div>
        )
      }
    </div>
  )
}

export default Blog