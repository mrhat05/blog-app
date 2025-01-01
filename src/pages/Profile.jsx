import React, { useEffect, useState } from "react";
import appwriteService from '../appwrite/dp_database_storage';
import CircularLoader from '../components/CircularLoader';
import Input from "../components/Input";

function ProfilePage() {
  window.scrollTo({ top: 0, behavior: 'instant' });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoURL, setProfilePhotoURL] = useState("");
  const [profileImageID, setProfileImageID] = useState("");
  const [loader, setLoader] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { name, email, userID } = userData;

  useEffect(() => {
    fetchProfilePhoto();
  }, []);

  const fetchProfilePhoto = async () => {
    try {
      const response = await appwriteService.getProfile(userID);
      if (response.imageID) {
        setProfileImageID(response.imageID);
        const URL = await appwriteService.getDPPreview(response.imageID);
        setProfilePhotoURL(URL.replace("preview", "view"));
      }
    } catch (error) {
      console.log("Error :: fetchProfilePhoto()", error);
    }
    setLoader(false);
  };

  const handleRemovePhoto = async () => {
    try {
      setLoader(true)
      setRemoving(true);
      await appwriteService.deleteProfile(userID);
      await appwriteService.deleteDP(profileImageID);
    } catch (error) {
      console.log("Error :: handleRemovePhoto()", error);
    } finally {
      setProfileImageID("");
      setProfilePhotoURL("");
      setLoader(false)
      setRemoving(false);
    }
  };

  const handlePhotoChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);

      try {
        setUploading(true);
        setLoader(true)
        const response = await appwriteService.uploadDP(file);
        let response2;
        if (!profileImageID) {
          response2 = await appwriteService.addProfile(userID, response.$id);
        } else {
          response2 = await appwriteService.updateProfile(userID, response.$id);
          await appwriteService.deleteDP(profileImageID);
        }
        setProfileImageID(response.$id);
        console.log("File uploaded successfully:", response);
      } catch (error) {
        console.error("File upload failed:", error);
      } finally {
        setLoader(false)
        setUploading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {loader ? (
        uploading ? (
          <div className="flex flex-col items-center gap-3">
            <p className="text-gray-400 text-xl">Uploading...</p>
            <CircularLoader />
          </div>
        ) : removing ? (
            <div className="flex flex-col items-center gap-3">
            <p className="text-gray-400 text-xl">Removing...</p>
            <CircularLoader />
          </div>
        ) : (
            <CircularLoader />
        )
      ) :(
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
          <div className="flex flex-col items-center gap-5">
            {profilePhoto || profilePhotoURL ? (
              <img
                src={profilePhoto || profilePhotoURL}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover shadow-md"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-300 bg-opacity-50 flex items-center justify-center shadow-md">
                <span className="text-gray-500 text-sm">No Photo</span>
              </div>
            )}

            <div className="flex gap-3 items-center">
              <div className="">
                <label
                  htmlFor="profilePhotoInput"
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 w-full text-center"
                >
                  {profilePhoto || profilePhotoURL ? "Edit Photo" : "Add Photo"}
                </label>
                <Input
                  type="file"
                  id="profilePhotoInput"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>
              {(profilePhotoURL || profileImageID) && (
                <div className="flex-1">
                  <button
                    onClick={handleRemovePhoto}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-600"
                  >
                    {"Remove"}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <div className="bg-gray-100 p-3 rounded-md">{name}</div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <div className="bg-gray-100 p-3 rounded-md">{email}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
