import RecipeModel, {RecipeDocument, RecipeInput, Shape} from '@/Model/recipe.model';
import { FilterQuery } from 'mongoose';
import {Ingredient, Recipe} from "@/Computation/GetLatestInventory";
const shapes: Shape[] = [Shape.Star, Shape.Triangle, Shape.Square, Shape.Circle];

/**
 * Fetch all recipes from the database.
 * @param query Optional filter query.
 * @returns A promise resolving to an array of RecipeDocuments.
 */
export async function getAllRecipesService(query: FilterQuery<RecipeDocument> = {}): Promise<RecipeDocument[]> {
    return RecipeModel.find(query).exec();
}

/**
 * Create a new recipe in the database.
 * @param recipeInput Input data for the new recipe.
 * @returns A promise resolving to the created RecipeDocument.
 */
export async function createRecipeService(recipeInput: RecipeInput): Promise<RecipeDocument> {
    return RecipeModel.create(recipeInput);
}

/**
 * Fetch a recipe by its ID from the database.
 * @param id The ID of the recipe to fetch.
 * @returns A promise resolving to the found RecipeDocument or null if not found.
 */
export async function getRecipeByIdService(id: string): Promise<RecipeDocument | null> {
    return RecipeModel.findById(id).exec();
}

/**
 * Update a recipe in the database by its ID.
 * @param id The ID of the recipe to update.
 * @param recipeInput The updated data for the recipe.
 * @returns A promise resolving to the updated RecipeDocument or null if not found.
 */
export async function updateRecipeService(id: string, recipeInput: RecipeInput): Promise<RecipeDocument | null> {
    return RecipeModel.findByIdAndUpdate(id, recipeInput, { new: true }).exec();
}

/**
 * Delete a recipe from the database by its ID.
 * @param id The ID of the recipe to delete.
 * @returns A promise that resolves when the deletion is complete.
 */
export async function deleteRecipeService(id: string): Promise<void> {
    await RecipeModel.findByIdAndDelete(id).exec();
}

// Function to create the most profitable recipes
export function createMostProfitableRecipesService(ingredients: Ingredient[]): Recipe[] {
    const recipes: Recipe[] = [];

    shapes.forEach(shape => {
        const recipe: Recipe = {
            name: `${shape.charAt(0).toUpperCase() + shape.slice(1)} Biscuits`,
            shape: shape,
            temperature: 180, // Default temperature
            calories: 0,
            oil: 0,
            sugar: 0,
            fiber: 0,
            soda: 0,
            nuts: 0,
            cookingTime: 0, // Default cooking time
            price: 0 // Default price
        };

        // Initialize total calories and cooking time for the recipe
        let totalCalories = 0;
        let totalCookingTime = 0;

        // Calculate total available stock
        const totalStock = ingredients.reduce((total, ingredient) => total + ingredient.stock, 0);

        // Select ingredients for the recipe based on stock availability
        ingredients.forEach(ingredient => {
            const proportion = ingredient.stock / totalStock; // Calculate proportion of available stock
            const amountToAdd = Math.floor(proportion * 200); // Distribute ingredient proportionally

            switch (ingredient.name) {
                case 'soda':
                    if (shape !== Shape.Circle) {
                        recipe.soda += amountToAdd;
                    }
                    break;
                case 'nuts':
                    if (shape === Shape.Circle) {
                        recipe.nuts += amountToAdd;
                    }
                    break;
                case 'sugar':
                    if (shape === Shape.Square) {
                        recipe.sugar += amountToAdd * 2; // Double sugar for square shape
                    } else {
                        recipe.sugar += amountToAdd;
                    }
                    break;
                case 'fiber':
                    if (shape === Shape.Star) {
                        recipe.fiber += Math.floor(amountToAdd / 2); // Half fiber for star shape
                    } else {
                        recipe.fiber += amountToAdd;
                    }
                    break;
                case 'oil':
                    recipe.oil += amountToAdd;
                    break;
            }

            totalCalories += amountToAdd * ingredient.calories;
            // @ts-ignore
            totalCookingTime += amountToAdd * ingredient.bakingTime;
        });

        // Update price for the recipe
        recipe.price = calculateRecipePrice(recipe, ingredients);

        // Update total calories and cooking time for the recipe
        recipe.calories = totalCalories;
        recipe.cookingTime = totalCookingTime;

        recipes.push(recipe);
    });

    return recipes;
}

function calculateRecipePrice(recipe: Recipe, ingredients: Ingredient[]): number {
    let totalPrice = 0;

    if (recipe.shape !== Shape.Circle) {
        totalPrice += recipe.soda * findIngredientCost("soda", ingredients);
    }
    if (recipe.shape === Shape.Circle) {
        totalPrice += recipe.nuts * findIngredientCost("nuts", ingredients);
    }
    totalPrice += recipe.sugar * findIngredientCost("sugar", ingredients);
    totalPrice += recipe.fiber * findIngredientCost("fiber", ingredients);
    totalPrice += recipe.oil * findIngredientCost("oil", ingredients);

    return totalPrice;
}

function findIngredientCost(ingredientName: string, ingredients: Ingredient[]): number {
    const foundIngredient = ingredients.find(ingredient => ingredient.name === ingredientName);
    return foundIngredient ? foundIngredient.cost : 0;
}