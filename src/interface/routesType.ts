import { Document } from "mongoose";

export interface IRoutes extends Document {
  lineNumber: string;
  name: string;
  stations: [string];
  schedule: [{ departureTime: string; arrivalTime: string; station: string }];
  updateAt: Date;
}
export default IRoutes;
