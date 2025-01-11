import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CommentIcon from "@mui/icons-material/Comment";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/database_storage";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SendBtn from '../components/SendBtn'

const isValidJSON = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

function CommentComponent({ slug, comments, blogImg, blogTitle, userName }) {
  const parsedComments = comments.map((item) => (isValidJSON(item) ? JSON.parse(item) : item));
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState(comments);
  const [objectCommentsList, setObjectCommentList] = useState(parsedComments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (comment.trim() !== "") {
      setIsSubmitting(true);

      const newComment = { username: userName, text: comment };
      const newCommentStr = JSON.stringify(newComment);

      try {
        setCommentsList([...commentsList, newCommentStr]);
        setObjectCommentList([...objectCommentsList, newComment]);
        await appwriteService.addComments(slug, [...commentsList, newCommentStr]);
        setComment("");
      } catch (error) {
        console.error("Failed to add comment:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  React.useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  return (
    <div>
      <Tooltip title="Comment">
        <Checkbox
          icon={<CommentIcon />}
          checkedIcon={<CommentIcon />}
          sx={{
            color: isDarkMode ? "gray" : "black",
            "&.Mui-checked": {
              color: isDarkMode ? "gray" : "black",
            },
          }}
          onClick={() => setShowModal(true)}
        />
      </Tooltip>

      {showModal && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-hidden"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          transition={{ duration: 0.15 }}
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className={`relative w-full max-w-4xl h-[70vh] flex flex-col sm:flex-row rounded-lg  ${
              isDarkMode ? "bg-zinc-900 text-white" : "bg-white text-black"
            } rounded-lg shadow-lg`}
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
          >
            <div className="w-full bg-gray-300 rounded-lg">
              <Link to={`/blog/${slug}`}>
                <div className="relative w-full">
                <img
              src={blogImg}
              alt="Post"
              className="w-full h-[30vh] sm:h-[70vh]  object-cover object-center rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
            />



                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white p-3 rounded-md max-w-full">
                    <h2
                      className="text-lg font-bold text-center truncate"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {blogTitle}jjoj
                    </h2>
                  </div>
                </div>
              </Link>

              <button
                style={{ color: "white" }}
                className="text-lg font-bold absolute block sm:hidden top-0 left-0 bg-darkBgColor p-1 w-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(false);
                }}
              >
                &times;
              </button>

            </div>

            {/* Comments Section */}
            <div className="w-full flex flex-col p-6">
              <div className="flex justify-between items-center mb-4 ">
                <h2 className="text-lg font-bold">Comments</h2>
                <button
                  className="text-lg font-bold hidden sm:block"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
              </div>

              <div
                className="overflow-y-scroll flex-grow border-b border-gray-300 mb-4 max-h-12 sm:max-h-full"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: isDarkMode ? "#333 #555" : "#ddd #fff",
                  minHeight: "150px",
                }}
              >
                {objectCommentsList.length > 0 ? (
                  objectCommentsList.map((item, ind) => (
                    <div
                      key={ind}
                      className={`flex items-center space-x-3 p-2 rounded ${
                        isDarkMode
                          ? "bg-zinc-800 hover:bg-zinc-700"
                          : "bg-gray-100 hover:bg-gray-200"
                      } mb-2`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full ${
                          isDarkMode ? "bg-zinc-700" : "bg-gray-300"
                        } flex items-center justify-center font-bold text-xs`}
                      >
                        {item.username?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold">{item.username}</p>
                        <p className="text-sm">{item.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No comments</p>
                )}
              </div>

              <form
                onSubmit={handleAddComment}
                className="flex items-center space-x-2 mt-4"
              >
                <TextField
                  size="small"
                  variant="outlined"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your comment..."
                  InputProps={{
                    style: {
                      backgroundColor: isDarkMode ? "#333" : "#fff",
                      color: isDarkMode ? "white" : "black",
                      borderRadius: "8px",
                    },
                  }}
                  fullWidth
                />
                {/* <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  className="transition-all duration-300 hover:scale-105"
                >
                  {isSubmitting ? "Posting..." : "Post"}
                </Button> */}
                <SendBtn
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  className=""
                />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default CommentComponent;
