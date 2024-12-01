import mongoose, { Schema } from "mongoose";
import { Iusers } from "../interface/usersType";
import usersModel from "./usersModel";
import IBuses from "../interface/busesType";
import { IRoute } from "express";

const routesSchema: Schema = new Schema(
  {
    lineNumber: {
      type: String,
      required: true,
      maxlength: 3,
    },
    name: {
      type: String,
      required: true,
    },
    stations: {
      type: [String],
      required: true,
    },
    schedule: {
      type: [{ departureTime: String, arrivalTime: String, station: String }],
    },
    updateAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IRoute>("routes", routesSchema);
