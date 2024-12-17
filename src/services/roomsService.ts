import { handleBadRequest } from "../../utils/ErrorHandle";
import IBuses from "../interface/busesType";
import IMessage from "../interface/messageType";
import roomsModel from "../models/roomModel";

const getAllrooms = async () => {
  try {
    const rooms = await roomsModel.find();

    return rooms;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const getRoomByName = async (roomname: string) => {
  try {
    const room = await roomsModel.findOne({ roomName: roomname });

    if (!room) {
      throw new Error("room not found");
    }
    return room;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const patchRoom = async (roomName: string, message: IMessage) => {
  try {
    const existingRoom = await roomsModel.findOne({ roomName: roomName });
    if (!existingRoom) {
      throw new Error("room not found");
    }
    existingRoom.massages.push(message);
    await existingRoom.save();

    return existingRoom;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

export { getAllrooms, getRoomByName, patchRoom };
