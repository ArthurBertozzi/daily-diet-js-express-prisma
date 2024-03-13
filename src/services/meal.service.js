import { PrismaMealRepository } from "../repositories/prisma/prisma-meal-repository.js";

export class MealService {
  constructor(mealRepository) {
    this.mealRepository = new mealRepository();
  }

  async getUserMealData(userId) {
    const meals = await this.mealRepository.findUserMeals(userId);
    return meals;
  }

  async createMeal(data) {
    const meal = await this.mealRepository.createMeal(data);
    return meal;
  }

  async getSingleMeal(mealId) {
    const meal = await this.mealRepository.getMealById(mealId);
    return meal;
  }

  async updateMeal(mealId, data) {
    const updatedMeal = await this.mealRepository.updateMeal(mealId, data);
    return updatedMeal;
  }

  async deleteMeal(mealId) {
    await this.mealRepository.deleteMealById(mealId);
  }

  async #getBestMealStreak(meals) {
    // Precisa do async aqui?
    let currentStreak = 0;
    let bestStreak = 0;

    // Essa seria uma boa forma de ordenar usando js? Preciso ordernar antes de obter o best streak
    meals.sort((a, b) => a.id - b.id);

    for (const meal of meals) {
      // Quando usar for...of ou for normal (let i ...)
      if (meal.is_in_diet) {
        currentStreak++;
      } else {
        currentStreak = 0;
      }
      bestStreak = Math.max(bestStreak, currentStreak);
    }

    return bestStreak;
  }

  async consolidateUserMealData(userId) {
    const meals = await this.getUserMealData(userId);
    if (meals.length === 0) {
      return { Error: { Message: "User doesn't have any meals." } };
    }

    console.log(meals);

    const userMealQuantity = meals.length;
    const userMealQuantityInDiet = meals.filter(
      (meal) => meal.is_in_diet === true
    ).length;
    const userMealQuantityNotInDiet = meals.filter(
      (meal) => meal.is_in_diet === false
    ).length;

    const bestStreak = await this.#getBestMealStreak(meals);

    const returnInfo = {
      "Meal Quantity": userMealQuantity,
      "Total meals in diet": userMealQuantityInDiet,
      "Total meals not in diet": userMealQuantityNotInDiet,
      "Best meals in diet streak": bestStreak,
    };

    return returnInfo;
  }
}

// const test = new MealService(PrismaMealRepository);
// console.log(await test.consolidateUserMealData(3));
