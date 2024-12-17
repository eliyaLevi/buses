import mongoose, { Document, Schema } from "mongoose";
import { Iusers } from "../interface/usersType";
import IRoom from "../interface/roomType";

const roomSchema: Schema = new Schema(
  {
    roomName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    massages: {
      type: [{ userName: String, message: String, timastamp: String }],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IRoom>("rooms", roomSchema);
