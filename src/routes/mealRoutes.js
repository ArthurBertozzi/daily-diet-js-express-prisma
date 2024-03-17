import express from "express";
import { PrismaMealRepository } from "../repositories/prisma/prisma-meal-repository.js";
import { MealService } from "../services/meal.service.js";
import { parseReqId } from "./utils/parseIdToInt.js";
import { isAuthenticated } from "./utils/isAuthenticated.js";

const router = express.Router();
const mealService = new MealService(PrismaMealRepository);

// All meals from an user
router
  .route("/user/:user_id/meals")
  .get(parseReqId("user_id"), async (req, res) => {
    const user = await mealService.getUserMealData(req.params.user_id);
    res.json(user);
  });

// Metrics from an user
router
  .route("/user/:user_id/metrics")
  .get(isAuthenticated, async (req, res) => {
    const user = await mealService.consolidateUserMealData(req.params.user_id);
    res.json(user);
  });

// Meal endpoints
router
  .route("/meals/:meal_id")
  .get(parseReqId("meal_id"), async (req, res) => {
    const meal = await mealService.getSingleMeal(req.params.meal_id);
    res.json(meal);
  })
  .put(parseReqId("meal_id"), async (req, res) => {
    const meal = await mealService.updateMeal(req.params.meal_id, req.body);
    res.json(meal);
  })
  .delete(parseReqId("meal_id"), async (req, res) => {
    await mealService.deleteMeal(req.params.meal_id);
    res.json({ message: "Meal deleted." });
  });

router.route("/meals").post(isAuthenticated, async (req, res) => {
  const meal = await mealService.createMeal(req.body);
  res.json(meal);
});

export default router;
