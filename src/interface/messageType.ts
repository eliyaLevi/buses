import { Document } from "mongoose";

export interface IMessage extends Document {
  userName: string;
  message: string;
  timastamp: string;
}
export default IMessage;
