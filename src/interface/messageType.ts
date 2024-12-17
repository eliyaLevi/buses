import { Document } from "mongoose";

export interface IMessage extends Document {
  userName: string;
  message: string;
  timestamp: string;
}
export default IMessage;
