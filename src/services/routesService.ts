import { handleBadRequest } from "../../utils/ErrorHandle";
import Iroutes from "../interface/routesType";
import routesModel from "../models/routesModel";

const addRoute = async (dataroute: Iroutes) => {
  try {
    if (!dataroute.lineNumber || !dataroute.name || !dataroute.stations) {
      throw new Error("One of the details is missing");
    }
    const newRoute = new routesModel(dataroute);
    await newRoute.save();
    return newRoute;
  } catch (error) {
    return handleBadRequest("MongoDB", error);
  }
};

const getAllroutes = async () => {
  try {
    const routes = await routesModel.find();
    return routes;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const getRouteById = async (routeId: string) => {
  try {
    const route = await routesModel.findById(routeId);
    if (!route) {
      throw new Error("route not found");
    }
    return route;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const patchRoute = async (routeId: string, updateData: Partial<Iroutes>) => {
  try {
    const existingRoute = await routesModel.findById(routeId);
    if (!existingRoute) {
      throw new Error("route not found");
    }

    const updatedRoute = await routesModel.findByIdAndUpdate(
      routeId,
      {
        ...updateData,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return updatedRoute;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const deleteRoute = async (routeId: string) => {
  try {
    const deletedRoute = await routesModel.findByIdAndDelete(routeId);
    if (!deletedRoute) {
      throw new Error("route not found");
    }
    return { message: "route deleted successfully" };
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

export { addRoute, getAllroutes, getRouteById, patchRoute, deleteRoute };
