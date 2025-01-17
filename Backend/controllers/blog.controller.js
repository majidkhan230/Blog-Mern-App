import errorHandler from "../helpers/error.handler.js";
import blogModel from "../models/blog.model.js";

const addBlog = async (req, res, next) => {
  try {
    const { category,title,slug,blogContent } = req.body;
    const file = req.files[0]
    console.log(file)
    const Blog = await blogModel.create({
      category,
      title,
      slug,
      blogContent,
    });

    if (file) {
      blogModel.featuredImage.data = file
      await blogModel.save();
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
    const Blog = await Blog.findById(req.params.BlogId);
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

    const Blog = await Blog.findByIdAndUpdate(
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
    const { BlogId } = req.params;
    // console.log(BlogId)
    const Blog = await Blog.findByIdAndDelete(BlogId);

    if (!Blog) return next(errorHandler(404, "Blog not found"));

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
    const categories = await Blog.find({});

    res.status(200).send({
      success: true,
      categories,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

const blogController = {
  addBlog,
  updateBlog,
  showBlog,
  deleteBlog,
  getAllBlog,
};

export default blogController;
