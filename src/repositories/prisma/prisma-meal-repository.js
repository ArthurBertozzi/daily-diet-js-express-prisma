import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaMealRepository {
  #mealvalidation(meal, id) {
    if (!meal) {
      throw new Error(`Meal with id ${id} does not exist.`);
    }
  }

  async findUserMeals(userId) {
    const userMeals = await prisma.meal.findMany({
      where: {
        userId,
      },
    });

    return userMeals;
  }

  async updateMeal(id, data) {
    let meal = await this.findById(id);
    meal = {
      ...meal,
      data,
    };
    this.#mealvalidation(id, meal);

    const updated_meal = prisma.meal.update({
      where: {
        id,
      },
      data,
    });

    return updated_meal;
  }

  async createMeal(data) {
    const meal = await prisma.meal.create({ data });

    return meal;
  }

  async getMealById(id) {
    const meal = await prisma.meal.findFirst({
      where: {
        id,
      },
    });
    return meal;
  }

  async getMealByName(name) {
    const meal = await prisma.meal.findFirst({
      include: {
        name,
      },
    });

    return meal;
  }

  async deleteMealById(id) {
    await prisma.meal.delete({
      where: {
        id,
      },
    });
  }
}

// const test = new PrismaMealRepository();
// console.log(
//   await test.createMeal({
//     description: "arroz com feijao2",
//     name: "arroz2",
//     userId: 2,
//     is_in_diet: true,
//   })
// );

// console.log(await test.findUserMeals(1));
// console.log(await test.getMealById(1));
// console.log(await test.findUserMeals(2));
