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
    async addProfile(userID,imageID){
        try {
            return await this.databases.createDocument(config.appwriteDatabaseID,config.appwriteDatabaseDpID,userID,{
                imageID
            })
        } catch (error) {
            console.log("Appwrite Service :: addProfile() :: ",error)
            return false 
        }
    }
    async getProfile(userID){
        try {
            return await this.databases.getDocument(config.appwriteDatabaseID,config.appwriteDatabaseDpID,userID)
        } catch (error) {
            console.log("Appwrite Service :: getProfile() :: ",error)
            return false 
        }
    }
    async updateProfile(userID,imageID){
        try {
            return await this.databases.updateDocument(config.appwriteDatabaseID,config.appwriteDatabaseDpID,userID,{
                imageID
            }
        )
        } catch (error) {
            console.log("Appwrite Service :: updateProfile() :: ",error)
            return false 
        }
    }

    async deleteProfile(userID){
        try {
            return await this.databases.deleteDocument(config.appwriteDatabaseID,config.appwriteDatabaseDpID,userID)
        } catch (error) {
            console.log("Appwrite Service :: deleteProfile() :: ",error)
            return false 
        }
    }
    // storage service

    async uploadDP(file){
        try {
            return await this.bucket.createFile(config.appwriteDpBucketID,ID.unique(),file)

        } catch (error) {
            console.log("Appwrite Service :: uploadDP() :: ",error)
            return false 
        }
    }

    async deleteDP(fileID){
        try {
            return await this.bucket.deleteFile(config.appwriteDpBucketID,fileID)

        } catch (error) {
            console.log("Appwrite Service :: deleteDP() :: ",error)
            return false 
        }
    }

    async getDPPreview(fileID){
        try {
            return this.bucket.getFilePreview(
                config.appwriteDpBucketID,
                fileID
            )
        } catch (error) {
            console.log("Appwrite Service :: getDPPreview() :: ",error)
            return false 
        }
    }

}

const dataService=new DataService()

export default dataService;