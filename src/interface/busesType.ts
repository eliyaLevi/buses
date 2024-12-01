import { Document, ObjectId } from "mongoose";

export interface IBuses extends Document {
  licensePlate: string;
  busmodel: string;
  capacity: number;
  status: string;
  driverId: ObjectId;
  routId: ObjectId;
  updateAt: Date;
}
export default IBuses;
