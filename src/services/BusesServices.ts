import { handleBadRequest } from "../../utils/ErrorHandle";
import IBuses from "../interface/busesType";
import busesModel from "../models/busesModel";

const addBus = async (dataBus: IBuses) => {
  try {
    if (
      !dataBus.licensePlate ||
      !dataBus.busmodel ||
      !dataBus.capacity ||
      !dataBus.driverId ||
      !dataBus.routId
    ) {
      throw new Error("One of the details is missing");
    }
    const newBus = new busesModel(dataBus);
    await newBus.save();
    return newBus;
  } catch (error) {
    return handleBadRequest("MongoDB", error);
  }
};

const getAllBuses = async () => {
  try {
    const buses = await busesModel.find();
    return buses;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const getBusById = async (busId: string) => {
  try {
    const bus = await busesModel.findById(busId);
    if (!bus) {
      throw new Error("bus not found");
    }
    return bus;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const patchBus = async (busId: string, updateData: Partial<IBuses>) => {
  try {
    const existingBus = await busesModel.findById(busId);
    if (!existingBus) {
      throw new Error("bus not found");
    }

    const updatedBus = await busesModel.findByIdAndUpdate(
      busId,
      {
        ...updateData,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return updatedBus;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const deleteBus = async (busId: string) => {
  try {
    const deletedBus = await busesModel.findByIdAndDelete(busId);
    if (!deletedBus) {
      throw new Error("bus not found");
    }
    return { message: "bus deleted successfully" };
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

export { addBus, getAllBuses, getBusById, patchBus, deleteBus };
