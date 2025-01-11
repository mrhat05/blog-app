import React, { useState,useEffect } from 'react';
import Button from './Button';
import DialogBox from './DialogueBox';
import { useNavigate } from 'react-router-dom'
import appwriteService from '../appwrite/database_storage'
import {toast} from 'react-toastify'
import { useSelector } from 'react-redux';
import LikeComponent from "../components/Like";
import CommentComponent from "./Comment";

function BlogComponent({ uploaderName, uploadTime, blogTitle, blogContent, blogImage,userID,slug,imageID,isActive,likes, comments, isLikedList,showActiveState}) {

    const navigate=useNavigate()
    const userData = JSON.parse(localStorage.getItem("userData"));
    const uploadDate=uploadTime.split('T')[0]
    const [isOpen,setIsOpen]=useState(false)
    const isDarkMode=useSelector((state)=>state.darkMode.isDarkMode)
    const [likesCnt, setLikesCnt] = useState(likes || 0);
    const [isLikedListM,setIsLikedListM]=useState(isLikedList || [])
    const [isLikedM, setIsLikedM] = useState(false);
  
    useEffect(()=>{
      const ans=isStringInArray(isLikedList,userID)
      setIsLikedM(ans)
    },[])
  
    function addStringToArray(array, string) {
      if (!array.includes(string)) {
          array.push(string);
      }
      return array;
    }
  
    function isStringInArray(array, string) {
      return array.includes(string);
    }
  
    function removeStringFromArray(array, string) {
      const index = array.indexOf(string);
      if (index !== -1) {
          array.splice(index, 1);
      }
      return array;
    }
  
  
  
    const changeLikes = async (e) => {
      e.stopPropagation();
    
      const updatedLikesCnt = isLikedM ? likesCnt - 1 : likesCnt + 1;
      setLikesCnt(updatedLikesCnt);
    
      const updatedIsLikedList = isLikedM
        ? removeStringFromArray([...isLikedListM], userID)
        : addStringToArray([...isLikedListM], userID);
      setIsLikedListM(updatedIsLikedList);
    
      setIsLikedM((prev) => !prev);
    
      try {
        await appwriteService.likeBlog(slug, updatedLikesCnt, updatedIsLikedList);
      } catch (error) {
        console.error("Error updating likes:", error);
      }
    };
    
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
    
    <div className={`${isDarkMode?"bg-darkBoxColor ":"bg-white shadow-lg"}  rounded-lg max-w-3xl mx-auto p-4 sm:p-6 my-4 `}>
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
        <div className='flex flex-col align-middle'>
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
                <h2 className="text-xl font-semibold text-blue-500 ">{uploaderName}</h2>
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
        {blogImage?(
          <img src={blogImage} alt={blogTitle} className="w-full object-cover rounded-lg shadow-md" />
        ):(
          <div className={`w-full h-96 object-cover rounded-lg shadow-md ${isDarkMode?"bg-zinc-700 bg-opacity-30":"bg-gray-200"} bg-opacity-50 animate-pulse`}></div>
        )
        }
      </div>
      <div className="flex gap-2 mb-1 mt-1">
              <div
                onClick={(e) => changeLikes(e)}
              >
                <LikeComponent isLiked={isLikedM} />
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <CommentComponent slug={slug} comments={comments} blogImg={blogImage} blogTitle={blogTitle} userID={userData.userID} userName={userData.name} />
              </div>
            </div>

            <div className="mb-3">
              <p className={`${isDarkMode ? "text-gray-400" : "text-black"} text-sm`}>{`${likesCnt} likes`}</p>
            </div>

      <div className={`border-l-4 border-blue-500  pl-4 mt-4`}>
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
// shadow-[0px_0px_30px_6px_rgba(0,0,0,0.05)] shadow-blue-800