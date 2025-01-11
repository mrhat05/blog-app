import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LikeComponent from "../components/Like";
import CommentComponent from "./Comment";
import appwriteService from "../appwrite/database_storage";

function BlogCard({ $id, title, image, keys, name, classnames, uploadTime, isActive, userID, likes, comments, isLikedList,showActiveState }) {
  const uploadDate = uploadTime.split("T")[0];
  const curr_userID = JSON.parse(localStorage.getItem("userData")).userID;
  const curr_userName = JSON.parse(localStorage.getItem("userData")).name;
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
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
      await appwriteService.likeBlog($id, updatedLikesCnt, updatedIsLikedList);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };
  

  return (
    <div key={keys} className={`${isDarkMode ? "bg-darkBoxColor" : "shadow-[0px_0px_10px_2px_rgba(0,0,0,0.1)]"} h-82 p-4 rounded-lg ${classnames}`}>
      <Link to={`/blog/${$id}`}>
        <div className="flex flex-col">
          {showActiveState && (userID === curr_userID) && (
            <div className="flex items-center space-x-2">
              <span className={`w-3 h-3 rounded-full ${isActive === "active" ? "bg-green-500" : "bg-red-500"}`} />
              <span className={`text-sm font-medium ${isActive === "active" ? "text-green-600" : "text-red-600"}`}>
                {isActive === "active" ? "Active" : "Inactive"}
              </span>
            </div>
          )}
          <div className={`flex`}>
            <h3 style={{ color: "#007BFF" }} className="text-lg font-bold m-2">
              {name}
            </h3>
          </div>
        </div>
        <img src={image} alt={title} className="w-full h-40 object-cover rounded-t-lg" />
      </Link>
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
          <CommentComponent slug={$id} comments={comments} blogImg={image} blogTitle={title} userID={curr_userID} userName={curr_userName} />
        </div>
      </div>
      <Link to={`/blog/${$id}`}>
        <div>
          <h3 className={`${isDarkMode ? "text-darkPrimaryTextColor" : ""} text-lg font-semibold mb-1`}>{title}</h3>
        </div>
        <div className="mb-3">
          <p className={`${isDarkMode ? "text-gray-400" : "text-black"} text-sm`}>{`${likesCnt} likes`}</p>
        </div>
        <p className={`${isDarkMode ? "text-darkSecondaryTextColor" : "text-gray-600"} text-sm`}>
          Posted on: <span className="font-medium">{uploadDate}</span>
        </p>
      </Link>
    </div>
  );
}

export default BlogCard;
