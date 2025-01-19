import errorHandler from "../helpers/error.handler.js";
import CommentModel from "../models/comment.model.js";

const addComment =async(req,res,next)=>{
    const {user,blogid,comment} = req.body;
    console.log(user,blogid,comment);
try {
    const addComment = await CommentModel.create({
        user,
        blogid,
        comment
    })

    res.status(200).send({
        success: true,
        message: "Comment added successfully",
        comment: addComment
    })
    
} catch (error) {
    next(errorHandler(500,error.message));
}
}
const getComment =async(req,res,next)=>{
    
    const {id:blogid} = req.params;
    console.log(blogid)
try {
    const getComments = await CommentModel.find({blogid}).populate('user', 'name avatar').sort({ createdAt: -1 })

    res.status(200).send({
        success: true,
        message: "Comment fetch successfully",
        comments: getComments
    })
    
} catch (error) {
    next(errorHandler(500,error.message));
}
}

const commmentController = {
    addComment,getComment
}

export default commmentController;