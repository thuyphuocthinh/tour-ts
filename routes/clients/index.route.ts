import { Express } from "express";
import { toursRoutes } from "./tours.route";
import { categoriesRoutes } from "./categories.route";

const clientRoutes = (app: Express): void => {
  app.use("/tours", toursRoutes);
  app.use("/categories", categoriesRoutes);
};

export default clientRoutes;
