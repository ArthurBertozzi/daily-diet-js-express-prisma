import express from "express";
import userRoutes from "./routes/userRoutes.js";
import mealRoutes from "./routes/mealRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/", userRoutes);
app.use("/", mealRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
