import { Express } from "express";
import { toursRoutes } from "./tours.route";
import { categoriesRoutes } from "./categories.route";
import { cartRoutes } from "./cart.route";

const clientRoutes = (app: Express): void => {
  app.use("/tours", toursRoutes);
  app.use("/categories", categoriesRoutes);
  app.use("/cart", cartRoutes);
};

export default clientRoutes;
