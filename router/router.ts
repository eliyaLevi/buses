import express, { IRouter, NextFunction, Request, Response } from "express";
import usersContoller from "../src/controllers/usersController";
import authController from "../src/controllers/authController";
import BusesController from "../src/controllers/busesController";
import routesController from "../src/controllers/routesController";
import { verifyAdmin, verifyUser } from "../helpers/jwt";
import { handleError } from "../utils/ErrorHandle";

const router: IRouter = express.Router();

router.use("/users", usersContoller);
router.use("/buses", BusesController);
router.use("/routs", routesController);
router.use("/auth", authController);

// router.use("/admin-role", verifyAdmin as NextFunction, dataContoller);

router.use((req: Request, res: Response) => {
  handleError(res, 404, "Miki is not found at Nimrodi Tower");
});

export default router;
