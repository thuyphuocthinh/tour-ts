import { Request, Response } from "express";
import Tours from "../../models/tours.model";
import Categories from "../../models/categories.model";
import sequelize from "../../config/database.config";
import { QueryTypes } from "sequelize";

export const index = async (req: Request, res: Response) => {
  try {
    const slugCategory: string = req.params.slugCategory;

    const tours = await sequelize.query(
      `
        SELECT tours.*, ROUND(price * (1-discount/100), 0) AS price_special
        FROM tours
        JOIN tours_categories on tours.id = tours_categories.tourId
        JOIN categories on tours_categories.categoryId = categories.id
        WHERE
          categories.slug = '${slugCategory}'
          AND categories.deleted = false
          AND categories.status = "active"
          AND tours.deleted = false
          AND tours.status = "active";
      `,
      {
        type: QueryTypes.SELECT,
      }
    );

    tours.forEach((item) => {
      if (item["images"]) {
        const images = JSON.parse(item["images"]);
        item["image"] = images[0];
      }
      item["price_special"] = parseFloat(item["price_special"]);
    });

    res.render("clients/pages/tours/index", {
      pageTitle: "Danh sách tour",
      tours: tours,
    });
  } catch (error) {
    console.log(error);
  }
};

export const detail = async (req: Request, res: Response) => {
  try {
    const slugTour = req.params.slugTour;

    const tourDetail = await Tours.findOne({
      where: {
        slug: slugTour,
        status: "active",
        deleted: false,
      },
      raw: true,
    });

    if (tourDetail["images"]) {
      tourDetail["images"] = JSON.parse(tourDetail["images"]);
    }
    tourDetail["price_special"] =
      tourDetail["price"] * (1 - tourDetail["discount"] / 100);

    res.render("clients/pages/tours/detail", {
      tour: tourDetail,
      pageTitle: "Chi tiết tour",
    });
  } catch (error) {
    console.log(error);
  }
};
