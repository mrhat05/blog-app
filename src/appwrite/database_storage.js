import config from '../conf/config'
import {Client, Databases, Storage, Query, ID} from 'appwrite'

export class DataService{
    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectID)

        this.databases= new Databases(this.client)
        this.bucket=new Storage(this.client)
    }

    // database service
    async getBlogDate(slug) {
        try {
          const doc = await this.databases.getDocument(
            config.appwriteDatabaseID,
            config.appwriteCollectionID,
            slug
          );
          return new Date(doc.$createdAt).toLocaleString();
        } catch (error) {
          console.log("Appwrite Service :: getBlogDate() :: Error:", error.message);
          return null;
        }
      }

    async getBlog(slug){
        try {
            return await this.databases.getDocument(config.appwriteDatabaseID,config.appwriteCollectionID,slug)

        } catch (error) {
            console.log("Appwrite Service :: getBlog() :: ",error)
            return false
        }
    }

    async getBlogsOfUser(userID){
        try {
            return this.databases.listDocuments(config.appwriteDatabaseID,config.appwriteCollectionID,[
                Query.equal('userID',userID)
            ])
        } catch (error) {
            console.log("Appwrite Service :: getBlogsofUser() :: ",error)
            return false
        }
    }
    async getBlogs(){
        try {
            return await this.databases.listDocuments(config.appwriteDatabaseID,config.appwriteCollectionID,
                [
                    Query.equal("status","active")
                ]
            )

        } catch (error) {
            console.log("Appwrite Service :: getBlogs() :: ",error)
            return false
        }
    }

    async createBlog({title,slug,image_url,content,status,userID,userName,image_real_url}){
        try {
            return await this.databases.createDocument(config.appwriteDatabaseID,config.appwriteCollectionID,slug,
                {
                    title,content,image_url,status,userID,userName,image_real_url,
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: createBlog() :: ",error)
            return false 
        }
    }

    async updatBlog(slug,{title,image_url,content,status,image_real_url}){
        try {
            return await this.databases.updateDocument(config.appwriteDatabaseID,config.appwriteCollectionID,slug,
                {
                    title,image_url,content,status,image_real_url
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: updateBlog() :: ",error)
            return false 
        }
    }

    async deleteBlog(slug){
        try {
            await this.databases.deleteDocument(config.appwriteDatabaseID,config.appwriteCollectionID,slug)
        } catch (error) {
            console.log("Appwrite Service :: deleteBlog() :: ",error)
            return false 
        }
    }

    // storage service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(config.appwriteBucketID,ID.unique(),file)

        } catch (error) {
            console.log("Appwrite Service :: uploadFile() :: ",error)
            return false 
        }
    }

    async deleteFile(fileID){
        try {
            return await this.bucket.deleteFile(config.appwriteBucketID,fileID)

        } catch (error) {
            console.log("Appwrite Service :: deleteFile() :: ",error)
            return false 
        }
    }

    async getFilePreview(fileID){
        try {
            return this.bucket.getFilePreview(
                config.appwriteBucketID,
                fileID
            )
        } catch (error) {
            console.log("Appwrite Service :: getFilePreview() :: ",error)
            return false 
        }
    }

}

const dataService=new DataService()

export default dataService;