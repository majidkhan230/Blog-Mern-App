import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
},
category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category'
},
title:{
    type:String,
    required:true
},
slug:{
    type:String,
    required:true,
},
blogContent:{
    type:String,
    required:true
},
featuredImage:{
    type:String
}
},{timestamps: true})



const blogModel = mongoose.model("Blog",blogSchema)

export default blogModel

