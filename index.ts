import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import clientRoutes from "./routes/clients/index.route";
import moment from "moment";

const app: Express = express();

// env
dotenv.config();

// public
app.use(express.static("public"));

// moment
app.locals.moment = moment;

// pug
app.set("views", "./views");
app.set("view engine", "pug");

// routes
clientRoutes(app);

const port: string | number = process.env.PORT;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
