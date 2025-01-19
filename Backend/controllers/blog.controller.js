import errorHandler from "../helpers/error.handler.js";
import blogModel from "../models/blog.model.js";

const addBlog = async (req, res, next) => {
  try {
    const { category,title,slug,blogContent,author } = req.body;
    const file = req.file
    console.log(file)
    const Blog = await blogModel.create({
      author,
      category,
      title,
      slug,
      blogContent,
    });

    if (file) {
      Blog.featuredImage = file.path
      await Blog.save();
    }

    res.status(201).send({
      success: true,
      message: "Blog added successfully",
      Blog,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

// show Blog

const showBlog = async (req, res, next) => {
  try {
    const Blog = await blogModel.findById(req.params.BlogId);
    if (!Blog) return next(errorHandler(404, "Blog not found"));

    res.status(200).send({
      success: true,
      Blog,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

// update Blog
const updateBlog = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    const { BlogId } = req.params;

    const Blog = await blogModel.findByIdAndUpdate(
      BlogId,
      {
        name,
        slug,
      },
      { new: true }
    );

    if (!Blog) return next(errorHandler(404, "Blog not found"));

    res.status(200).send({
      success: true,
      message: "Blog updated successfully",
      Blog,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

//delete Blog

const deleteBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    console.log(blogId)
    const resp = await blogModel.findByIdAndDelete(blogId);

    // if (!resp) return next(errorHandler(404, "Blog not found"));

    res.status(200).send({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

// get all categories

const getAllBlog = async (req, res, next) => {
  try {
    const blogs = await blogModel.find().populate('author', 'name avatar role').populate('category', 'name slug').sort({ createdAt: -1 })
    res.status(200).send({
      success: true,
      blogs,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

const getBlog = async(req,res,next) =>{
  try {
    const {slug}  = req.params
console.log(slug)
    const blog = await blogModel.findOne({slug}).populate('author', 'name avatar role').populate('category', 'name slug')

    res.status(200).send({
      success: true,
      blog,
    })
    
  } catch (error) {
    next(errorHandler(500, error.message));
  }
}



const blogController = {
  addBlog,
  updateBlog,
  showBlog,
  deleteBlog,
  getAllBlog,
  getBlog,  
};

export default blogController;
