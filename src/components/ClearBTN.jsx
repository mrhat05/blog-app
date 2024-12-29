import React from "react";
import { Client, Storage } from "appwrite";
import config from '../conf/config'

const ClearStorageButton = () => {
  const client = new Client();
  const storage = new Storage(client);

  client
    .setEndpoint(config.appwriteURL) 
    .setProject(config.appwriteProjectID);

  const clearAllStorage = async () => {
    const bucketId = config.appwriteBucketID; 

    try {
      const files = await storage.listFiles(bucketId);

      for (const file of files.files) {
        await storage.deleteFile(bucketId, file.$id);
        console.log(`Deleted file: ${file.$id}`);
      }

      alert("All files cleared from storage.");
    } catch (error) {
      console.error("Error clearing storage:", error.message);
      alert("Error clearing storage. Check console for details.");
    }
  };

  return (
    <div>
      <button onClick={clearAllStorage} style={buttonStyle}>
        Clear All Storage
      </button>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: "#FF0000",
  color: "#FFFFFF",
  border: "none",
  padding: "10px 20px",
  cursor: "pointer",
  fontSize: "16px",
  borderRadius: "5px",
};

export default ClearStorageButton;
