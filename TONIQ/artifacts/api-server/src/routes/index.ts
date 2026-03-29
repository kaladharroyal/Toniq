import { Router, type IRouter } from "express";
import healthRouter from "./health";
import reservationsRouter from "./reservations";
import tablesRouter from "./tables";
import authRouter from "./auth";

const router: IRouter = Router();

router.use(healthRouter);
router.use(reservationsRouter);
router.use(tablesRouter);
router.use(authRouter);

export default router;
