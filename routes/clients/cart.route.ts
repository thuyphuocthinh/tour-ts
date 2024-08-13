import { Router } from "express";
const router: Router = Router();
import * as controller from "../../controllers/clients/cart.controller";

router.get("/", controller.index);

export const cartRoutes: Router = router;
