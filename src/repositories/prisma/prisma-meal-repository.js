import { prisma_db } from "../../utils/db.js";

export class PrismaMealRepository {
  // podemos instanciar o prisma client pelo construtor (dependencia) constructor() {}
  #mealvalidation(meal) {
    if (!meal) {
      return false;
    }
    return true;
  }

  async findUserMeals(userId) {
    const userMeals = await prisma_db.meal.findMany({
      where: {
        userId,
      },
    });

    return userMeals;
  }

  async updateMeal(id, data) {
    let meal = await this.getMealById(id);
    meal = {
      ...meal,
      data,
    };

    if (this.#mealvalidation(meal) === false) {
      return { message: `meal with id ${id} does not exist.` };
    }

    const updated_meal = prisma_db.meal.update({
      where: {
        id,
      },
      data,
    });

    return updated_meal;
  }

  async createMeal(data) {
    const meal = await prisma_db.meal.create({ data });

    return meal;
  }

  async getMealById(id) {
    const meal = await prisma_db.meal.findFirst({
      where: {
        id,
      },
    });
    return meal;
  }

  async getMealByName(name) {
    const meal = await prisma_db.meal.findFirst({
      include: {
        name,
      },
    });

    return meal;
  }

  async deleteMealById(id) {
    await prisma_db.meal.delete({
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
