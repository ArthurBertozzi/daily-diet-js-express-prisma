import express from "express";
import routes from "./routes/userRoutes.js";
import mealRoutes from "./routes/mealRoutes.js";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/", routes);
app.use("/", mealRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
