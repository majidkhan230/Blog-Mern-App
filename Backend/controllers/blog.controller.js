import errorHandler from "../helpers/error.handler.js";
import blogModel from "../models/blog.model.js";
import Category from "../models/category.model.js";

const addBlog = async (req, res, next) => {
  try {
    const { category,title,slug,blogContent,author } = req.body;
    const file = req.file
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
export const updateBlog = async (req, res, next) => {
const {category,title,slug,blogContent} = req.body
// console.log(category,title,slug,blogContent)
  try {
      const { blogId } = req.params
// console.log('hitted')
const Blog = await blogModel.findByIdAndUpdate(blogId,{
  category,
  title,
  slug,
  blogContent,
});




if(req.file){
  Blog.featuredImage = req.file.path
}

await Blog.save()


      res.status(200).send({
          success: true,
          message: 'Blog updated successfully.'
      })

  } catch (error) {
      next(errorHandler(500, error.message))
  }
}

//delete Blog

const deleteBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    // console.log(blogId)
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
    const {slug,blogId}  = req.params
    // console.log(slug,blogId)
const query  = blogId ? {_id:blogId} : {slug}
// console.log(query)
    const blog = await blogModel.findOne(query).populate('author', 'name avatar role').populate('category', 'name slug')
// console.log(blog)
    res.status(200).send({
      success: true,
      blog,
    })
    
  } catch (error) {
    next(errorHandler(500, error.message));
  }
}

 const getRelatedBlog = async (req, res, next) => {
  try {
      const { category, slug } = req.params
      
      const categoryData = await Category.findOne({ slug: category })
      
      // console.log(categoryData,"hitted")
      if (!categoryData) {
          return next(errorHandler(404, 'Category data not found.'))
      }
      const categoryId = categoryData._id
      const relatedBlog = await blogModel.find({ category: categoryId, slug: { $ne: slug } })
      res.status(200).send({
          success:true,
          relatedBlog
      })
  } catch (error) {
      next(errorHandler(500, error.message))
  }
}

const getRelatedBlogsByCategory = async (req, res, next) => {
  try {
    // console.log("hitting hgitt")
      const { category } = req.params
    const categoryId = await Category.find({slug:category})
      // console.log(category)
      const relatedBlogs = await blogModel.find({ category:categoryId}).populate('category','slug')
      res.status(200).send({
          success:true,
          relatedBlogs
      })
  } catch (error) {
      next(errorHandler(500, error.message))
  }
}

export const search = async (req, res, next) => {
  try {
      const { q } = req.query

      const blog = await blogModel.find({ title: { $regex: q, $options: 'i' } }).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec()
      res.status(200).send({
          success:true,
          blog,
      })
  } catch (error) {
      next(errorHandler(500, error.message))
  }
}



const editBLog = async(req,res,next) =>{
  try {
    const {blogId}  = req.params
    const blog = await blogModel.findOne({_id:blogId}).populate('author', 'name avatar role').populate('category', 'name slug')
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
  editBLog,
  getRelatedBlog,
  getRelatedBlogsByCategory,
  search
};

export default blogController;
