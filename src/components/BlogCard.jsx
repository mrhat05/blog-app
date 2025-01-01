import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/database_storage.js'
function BlogCard({$id,title,image,keys,name,classnames,uploadTime,isActive,userID}) {
  const uploadDate=uploadTime.split('T')[0]
  const curr_userID = JSON.parse(localStorage.getItem("userData")).userID;
  return (
    <Link to={`/blog/${$id}`}>
    <div key={keys} className={`h-82 p-4 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.1)] rounded-lg ${classnames} `}>

        <div className='flex flex-col '>
          {userID===curr_userID&&(
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
          )
          }
            <h3 style={{color:'#007BFF'}} className='text-xl font-bold m-2'>{name}</h3>
        </div>
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-t-lg"
          />
          <h3 className="text-xl font-semibold mt-2 min-h-16">{title}</h3>

          <p className="text-sm text-gray-600">Posted on: <span className="font-medium">{uploadDate}</span></p>
    </div>
  </Link>
  )
}

export default BlogCard


