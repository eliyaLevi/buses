import express, { IRouter, Request, Response } from "express";
import { handleError } from "../../utils/ErrorHandle";
import {
  addRoute,
  getAllroutes,
  getRouteById,
  patchRoute,
  deleteRoute,
} from "../services/routesService";

const router: IRouter = express.Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const route = await addRoute(req.body);
    res.status(201).json(route);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const routes = await getAllroutes();
    res.status(201).json(routes);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const route = await getRouteById(req.params.id);
    res.status(201).json(route);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.patch("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedRoute = await patchRoute(req.params.id, req.body);
    res.json(updatedRoute);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedRoute = await deleteRoute(req.params.id);
    res.json(deletedRoute);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});
export default router;
