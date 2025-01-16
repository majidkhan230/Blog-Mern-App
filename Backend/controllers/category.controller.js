import errorHandler from "../helpers/error.handler.js";
import Category from "../models/category.model.js";

const addCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    const category = await Category.create({
      name,
      slug,
    });

    res.status(201).send({
      success: true,
      message: "Category added successfully",
      category,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

// show category

const showCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) return next(errorHandler(404, "Category not found"));

    res.status(200).send({
      success: true,
      category,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

// update category
const updateCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    const { categoryId } = req.params;

    const category = await Category.findByIdAndUpdate(categoryId, {
      name,
      slug,
    },{new:true});

    if (!category) return next(errorHandler(404, "Category not found"));
    
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });

  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

//delete category

const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    console.log(categoryId)
    const category = await Category.findByIdAndDelete(categoryId);

    if (!category) return next(errorHandler(404, "Category not found"));

    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

// get all categories

const getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.find({});

    res.status(200).send({
      success: true,
      categories,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};


const categoryController = {
  addCategory,
  updateCategory,
  showCategory,
  deleteCategory,
  getAllCategory,
};

export default categoryController;
