import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/database_storage';
import BlogCard from '../components/BlogCard';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isDarkMode=useSelector((state)=>state.darkMode.isDarkMode)
  
  function makeSlug(title){
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  }

  useEffect(() => {
    fetchBlogs();

    return () => {
      setBlogs([]);
      setLoading(false);
      setError(null);
    };
  }, []); 


  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await appwriteService.getBlogsOfUser(userData?.userID);
      if(response){
      const blogsWithImages = await Promise.all(
        response.documents.map(async (doc) => {
          let image_URL=""
          if(doc.image_url !='!'){
            image_URL = await appwriteService.getFilePreview(doc.image_url)
            image_URL=image_URL.replace("preview","view")
          }
          else{
            image_URL=doc.image_real_url
          }

          return {
            heading: doc.title,
            content: doc.content,
            image: image_URL,
            createdAt:doc.$createdAt,
            status:doc.status,
            userID:doc.userID,
            comments:doc.comments,
            likes:doc.likes,
            isLikedList:doc.isLikedList,
          };
        })
      );

      setBlogs(blogsWithImages);
    }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to load blogs. Please try again later.");
      setBlogs([])
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='overflow-hidden'>
    <div className={`${isDarkMode?"bg-black":"bg-white"} ${blogs.length>0 ? "mb-48 ":""}`}>
      <header className={`py-10 ${isDarkMode?"rounded-lg shadow-md ":"bg-white shadow-md"} text-center m-`}>
        <h2 className="text-3xl font-bold text-blue-600">
          {`Dashboard`}
        </h2>
        <p className="text-gray-600 mt-2">Here are the blogs you've uploaded.</p>
      </header>
      <div>
        {loading ? (
          <section className="max-w-5xl mx-auto py-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
              key={index}
              className={`h-80 ${isDarkMode?"bg-darkBoxColor":"bg-gray-200"} animate-pulse rounded-md`}
              ></div>
            ))}
          </section>
        ) : error ? (
          <div className='min-h-screen mt-10 flex justify-center '>
            <p className="text-red-600 text-xl col-span-full">
              {error}
            </p>
          </div>
        ) : blogs.length > 0 ? (
          <section className="max-w-5xl mx-auto py-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              blogs.map((blog, index) => (
                <BlogCard $id={makeSlug(blog.heading)} name={`${userData.name}`} title={blog.heading} image={blog.image} key={index} keys={index} uploadTime={blog.createdAt} isActive={blog.status} userID={blog.userID} comments={blog.comments} likes={blog.likes} isLikedList={blog.isLikedList} showActiveState={true} />
              ))
          }
          </section>
        ) : (
          <div className='min-h-screen'>
            <div className='flex flex-col items-center'>
              <p className="text-gray-600 m-10 text-xl">
                You haven't uploaded any blogs yet.
              </p>
              <Link to={'/addBlog'}>
                <Button classNames='w-28'>Add Blog</Button>
              </Link>
            </div>
          </div>
        )}
        </div>
    </div>
    </div>
  );
};

export default Home;
