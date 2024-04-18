import { Request, Response } from 'express'; // Assuming you are using Express.js
import IngredientModel from "@/Model/ingredient.model";
import RecipeModel, { Shape } from "@/Model/recipe.model";
import {Ingredient} from "@/Computation/GetLatestInventory";

const ingredientsData: Ingredient[] = [
    {
        name: "soda",
        unit: "mg",
        cost: 2,
        stock: 60,
        calories: 4,
        bakingTime: 3
    },
    {
        name: "nuts",
        unit: "mg",
        cost: 1,
        stock: 50,
        calories: 15,
        bakingTime: 2
    },
    {
        name: "sugar",
        unit: "mg",
        cost: 3,
        stock: 100,
        calories: 20,
        bakingTime: 1
    },
    {
        name: "fiber",
        unit: "mg",
        cost: 1,
        stock: 80,
        calories: 10,
        bakingTime: 5
    },
    {
        name: "oil",
        unit: "ml",
        cost: 1,
        stock: 120,
        calories: 50,
        bakingTime: 2,
        cookingTime: 15
    },
];

export const recipesData = [
    {
        name: "Star Biscuits",
        shape: Shape.Star,
        temperature: 180,
        calories: 150,
        oil: 30,
        sugar: 20,
        fiber: 10,
        soda: 18,
        nuts: 0,
        cookingTime: 10
    },
    {
        name: "Circular Biscuits",
        shape: Shape.Circle,
        temperature: 200,
        calories: 130,
        oil: 25,
        sugar: 25,
        fiber: 15,
        soda: 0,
        nuts: 0,
        cookingTime: 20

    },
    {
        name: "Triangle Cookies",
        shape: Shape.Triangle,
        temperature: 180,
        calories: 180,
        oil: 20,
        sugar: 30,
        fiber: 10,
        soda: 10,
        nuts: 20,
        cookingTime: 30
    },
    {
        name: "Square Brownies",
        shape: Shape.Square,
        temperature: 190,
        calories: 200,
        oil: 35,
        sugar: 25,
        fiber: 20,
        soda: 23,
        nuts: 40,
        cookingTime: 5
    },
    {
        name: "Round Pancakes",
        shape: Shape.Circle,
        temperature: 200,
        calories: 120,
        oil: 20,
        sugar: 15,
        fiber: 5,
        soda: 0,
        nuts: 13,
        cookingTime: 1
    }
];



export async function populateDatabase(req: Request, res: Response) {
    try {
        await IngredientModel.deleteMany({});
        await IngredientModel.create(ingredientsData);
        await RecipeModel.deleteMany({});
        await RecipeModel.create(recipesData);

        res.status(201).send("Database populated successfully!");
    } catch (error) {
        console.error("Error populating database:", error);
        res.status(500).send("Error populating database");
    }
}