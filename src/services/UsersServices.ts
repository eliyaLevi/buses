import { generateUserPassword } from "../../helpers/bcrypt";
import { handleBadRequest } from "../../utils/ErrorHandle";
import Iusers from "../interface/usersType";
import usersModel from "../models/usersModel";
import UserModel from "../models/usersModel";

const addUser = async (dataUser: Iusers) => {
  try {
    if (!dataUser.name || !dataUser.email || !dataUser.password) {
      throw new Error("One of the details is missing");
    }
    const newUser = new UserModel(dataUser);
    newUser.password = generateUserPassword(newUser.password);
    await newUser.save();
    return newUser;
  } catch (error) {
    return handleBadRequest("MongoDB", error);
  }
};

const getAllUsers = async () => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const getUserById = async (userId: string) => {
  try {
    const user = await usersModel.findById(userId);
    if (!user) {
      throw new Error("user not found");
    }
    return user;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const patchUser = async (userId: string, updateData: Partial<Iusers>) => {
  try {
    if (updateData.password) {
      throw new Error("Password cannot be updated through this endpoint");
    }

    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      throw new Error("user not found");
    }

    const updatedUser = await usersModel.findByIdAndUpdate(
      userId,
      {
        ...updateData,
        password: existingUser.password,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return updatedUser;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const deleteUser = async (userId: string) => {
  try {
    const deletedUser = await usersModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new Error("user not found");
    }
    return { message: "user deleted successfully" };
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const getUsersByCall = async (page: number = 1, limit: number = 10) => {
  try {
    const skip = (page - 1) * limit;
    const users = await usersModel.find().skip(skip).limit(limit);
    const totalUsers = await usersModel.countDocuments();
    return {
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
      totalUsers,
    };
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

export {
  addUser,
  getAllUsers,
  getUserById,
  patchUser,
  deleteUser,
  getUsersByCall,
};
