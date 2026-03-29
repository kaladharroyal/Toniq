import { Router, type IRouter } from "express";
import healthRouter from "./health";
import reservationsRouter from "./reservations";
import tablesRouter from "./tables";

const router: IRouter = Router();

router.use(healthRouter);
router.use(reservationsRouter);
router.use(tablesRouter);

export default router;
