import express, { IRouter, Request, Response } from "express";
import { handleError } from "../../utils/ErrorHandle";
import {
  addBus,
  getAllBuses,
  getBusById,
  patchBus,
  deleteBus,
} from "../services/BusesServices";

const router: IRouter = express.Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const bus = await addBus(req.body);
    res.status(201).json(bus);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const buses = await getAllBuses();
    res.status(201).json(buses);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const bus = await getBusById(req.params.id);
    res.status(201).json(bus);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.patch("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedBus = await patchBus(req.params.id, req.body);
    res.json(updatedBus);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedBus = await deleteBus(req.params.id);
    res.json(deletedBus);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});
export default router;
