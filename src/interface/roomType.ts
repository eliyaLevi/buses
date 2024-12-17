import { Document } from "mongoose";
import IMessage from "./messageType";

export interface IRoom extends Document {
  roomName: string;
  massages: IMessage[];
}
export default IRoom;
