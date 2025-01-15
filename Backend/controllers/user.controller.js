import errorHandler from "../helpers/error.handler.js";
import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt';
const getUsers = async (req, res, next) => {
  const userId = req.params.id;
  // console.log(userId)
  // console.log(userId)
  try {
    const user = await userModel.findOne({ _id: userId });
    console.log(user);
    res.status(200).send({
      success: true,
      user: user,
    });
  } catch (error) {
    next(errorHandler(error));
  }
};
const updateUser = async (req, res, next) => {
  const { name, email, bio, password } = req.body;
  const userId = req.params.id;
console.log(userId)
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    const avatar = req.file ? req.file.path : user.avatar; 
    const updateData = {
      name: name || user.name,
      email: email || user.email,
      bio: bio || user.bio,
      avatar,
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true });
    res.status(200).send({
      success: true,
      message: "Successfully updated",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    next(errorHandler(error));
  }
};

export const userController = { getUsers, updateUser };
