import { Request, Response } from "express";
import Categories from "../../models/categories.model";

export const index = async (req: Request, res: Response) => {
  try {
    const categories = await Categories.findAll({
      where: {
        status: "active",
        deleted: false,
      },
      raw: true,
    });

    res.render("clients/pages/categories/index", {
      pageTitle: "Danh mục tour",
      categories,
    });
  } catch (error) {
    console.log(error);
  }
};
