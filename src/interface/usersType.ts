import { Document } from "mongoose";

export interface Iusers extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  updateAt: Date;
}
export default Iusers;
