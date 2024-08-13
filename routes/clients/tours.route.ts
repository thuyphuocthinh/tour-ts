import { Router } from "express";
const router: Router = Router();
import * as controller from "../../controllers/clients/tours.controller";

router.get("/:slugCategory", controller.index);
router.get("/detail/:slugTour", controller.detail);

export const toursRoutes: Router = router;
