import React, { useState } from 'react';
import Button from './Button';
import DialogBox from './DialogueBox';
import { useNavigate } from 'react-router-dom'
import appwriteService from '../appwrite/database_storage'
import {toast} from 'react-toastify'
import { useSelector } from 'react-redux';

function BlogComponent({ uploaderName, uploadTime, blogTitle, blogContent, blogImage,userID,slug,imageID,isActive}) {

    const navigate=useNavigate()
    const userData = JSON.parse(localStorage.getItem("userData"));
    const uploadDate=uploadTime.split('T')[0]
    const [isOpen,setIsOpen]=useState(false)
    const isDarkMode=useSelector((state)=>state.darkMode.isDarkMode)
    
    const handleDelete=async()=>{
        try {
            toast.success("Blog deleted successfully!",{
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined
              })
              await appwriteService.deleteBlog(slug)
              await appwriteService.deleteFile(imageID)
              navigate('/home')
        } catch (error) {
            console.log("error :: handleDelete()",error)
            toast.error("Failed to delete the blog.",{
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined
              })
        }
    }
    const handleDeleteAsk=()=>{
        setIsOpen(true)
    }
    const handleEdit=()=>{
        navigate(`/editBlog/${slug}`)
    }

  return (
    
    <div className={`${isDarkMode?"bg-darkBoxColor shadow-[0px_0px_10px_1px_rgba(0,0,0,0.05)] shadow-blue-800  ":"bg-white shadow-lg"}  rounded-lg max-w-3xl mx-auto p-4 sm:p-6 my-4 `}>
        { isOpen && (
            <DialogBox isOpen={true}   options ={ [
                { label: "Yes", action: () =>{
                    setIsOpen(false)
                    handleDelete()
                }},
                { label: "No", action: () => setIsOpen(false) }
              ] } />
        )}
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
            <div className='flex flex-col gap-4'>
                {userID===userData.userID &&(
                <div className="flex items-center space-x-2">
                        <span
                            className={`w-3 h-3 rounded-full ${
                                isActive==='active' ? "bg-green-500" : "bg-red-500"
                            }`}
                        />
                        <span
                            className={`text-sm font-medium ${
                                isActive==='active' ? "text-green-600" : "text-red-600"
                            }`}>
                            {isActive==='active' ? "Active" : "Inactive"}
                        </span>
                </div>
                )}
                <h2 className="text-xl font-semibold text-blue-500">{uploaderName}</h2>
            </div>

            <p className={`text-sm ${isDarkMode?"text-darkSecondaryTextColor":"text-gray-600"}`}>Posted on: <span className={`${isDarkMode?"text-darkSecondaryTextColor":"text-gray-600"} font-medium`}>{uploadDate}</span></p>
        </div>
        {(userID===userData.userID)&&(
        <div className='flex align-middle gap-4'>
        <Button onClick={handleEdit}>Edit</Button>
        <Button onClick={handleDeleteAsk}>Delete</Button>
        </div>
        )
        }
      </div>

      <div className="mb-4">
        {blogImage && (
          <img src={blogImage} alt={blogTitle} className="w-full object-cover rounded-lg shadow-md" />
        )}
      </div>

      <div className="border-l-4 pl-4 border-blue-500 mt-4">
        <h1 className={`text-3xl font-bold ${isDarkMode?"text-darkPrimaryTextColor":"text-gray-800"} mb-4`}>{blogTitle}</h1>
        <div  
        dangerouslySetInnerHTML={{ __html: blogContent }}
        className={`text-lg ${isDarkMode?"text-darkPrimaryTextColor":"text-gray-700"} break-words`}>
        </div>
      </div>
    </div>
    </div>
  );
}

export default BlogComponent;
