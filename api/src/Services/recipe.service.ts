import RecipeModel, { RecipeDocument, RecipeInput } from '@/Model/recipe.model';
import { FilterQuery } from 'mongoose';

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
