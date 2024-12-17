import mongoose, { Schema } from "mongoose";
import { Iusers } from "../interface/usersType";
import usersModel from "./usersModel";
import IBuses from "../interface/busesType";
import routesModel from "./routesModel";

const BusesSchema: Schema = new Schema(
  {
    licensePlate: {
      type: String,
      required: true,
      maxlength: 10,
      unique: true,
    },
    busmodel: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["service", "out of sevice", "maintenance"],
      default: "service",
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    routId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "routes",
      required: true,
    },
    updateAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBuses>("buses", BusesSchema);
