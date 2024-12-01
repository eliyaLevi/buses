import mongoose, { Schema } from "mongoose";
import { Iusers } from "../interface/usersType";

const UsersSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["driver", "admin", "passenger"],
      default: "driver",
    },
    updateAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Iusers>("users", UsersSchema);
