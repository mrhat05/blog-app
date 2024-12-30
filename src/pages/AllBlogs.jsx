import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/database_storage';
import BlogCard from '../components/BlogCard';
function AllBlogs() {

    // const userData = JSON.parse(localStorage.getItem("userData"));
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
      const response = await appwriteService.getBlogs();
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
            userName:doc.userName,
            createdAt:doc.$createdAt,
          };
        })
      );
      // const shuffledBlogsWithImages=await shuffleArray(blogsWithImages)
      setBlogs(blogsWithImages);
      // console.log(response)
      // console.log(blogsWithImages)
    }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to load blogs. Please try again later.");
      setBlogs([])
    } finally {
      setLoading(false);
    }
  };

  // const shuffleArray = (arr) => {
  //   return arr.sort(() => Math.random() - 0.5);
  // };
  
  return (
    <div className='mb-48'>
    {loading ? (
      <section className="max-w-5xl mx-auto py-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
        key={index}
        className="h-80 bg-gray-200 animate-pulse rounded-md"
        ></div>
      ))}
      </section>
    ) : error ? (
      
      <p className="text-red-600 text-center col-span-full">{error}</p>
    ) : blogs.length > 0 ? (
      <section className="max-w-5xl mx-auto py-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-screen">
      {
        blogs.map((blog, index) => (
          <BlogCard $id={makeSlug(blog.heading)} title={blog.heading} image={blog.image} key={index} keys={index} name={blog.userName} uploadTime={blog.createdAt}/>
        ))
      }
      </section>
    ) : (
        <div className='min-h-screen flex m-10 justify-center'>
          <p className="text-gray-600 text-center col-span-full text-lg">
            Stay tuned—exciting blogs are on the way!
          </p>
        </div>
    )}
  </div>
  )
}

export default AllBlogs