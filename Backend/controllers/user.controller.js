import errorHandler from "../helpers/error.handler.js";
import userModel from "../models/user.model.js";

const getUsers = async (req, res, next) => {
  const userId = req.params.id;
// console.log(userId)
  try {
    const user = await userModel.findOne({ _id:userId });
    console.log(user)
    res.status(200).send({
      success: true,
      user: user,
    });
} catch (error) {
    next(errorHandler(400, "something went wrong with server"));
  }
};



export const userController = {getUsers}
