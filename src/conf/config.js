const config={
    appwriteURL:String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectID:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseID:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionID:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketID:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteDpBucketID:String(import.meta.env.VITE_APPWRITE_BUCKET_DP_ID),
    appwriteDatabaseDpID:String(import.meta.env.VITE_APPWRITE_DATABASE_DP_ID),
    tinymceAPIkey:String(import.meta.env.VITE_TINY_MCE_API_KEY),
    appwriteIsLikedCollectionID:String(import.meta.env.VITE_APPWRITE_LIKED_COLLECTION_ID)
}

export default config