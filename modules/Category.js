import mongoose from "mongoose";

const categoriesSchama= new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
    }

},{timestamps:true});

export default mongoose.model("category",categoriesSchama)