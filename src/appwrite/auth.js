import config from '../conf/config'
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client=new Client()
    account;

    constructor(){
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectID)
        this.account=new Account(this.client)
    }

    async createAccount({email,password,name}){
        try {
            const userAccount=await this.account.create(ID.unique(),email,password,name)
        } catch (error) {
            throw error
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password)
            
        }
        catch(error){
            throw error 
            
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser() :: ",error)
        }
        return null
    }

    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite Service :: logout() :: ",error)
        }
    }
}

const authService=new AuthService()

export default authService
