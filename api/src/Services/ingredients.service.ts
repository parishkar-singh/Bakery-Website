import IngredientsModel, { IngredientsDocument, IngredientsInput } from "@/Model/ingredients.model";
import { FilterQuery } from "mongoose";

/**
 * Retrieves all ingredients from the database.
 * @param query Optional filter query to apply when fetching ingredients.
 * @returns A promise that resolves to an array of ingredients documents.
 */
export async function getAllIngredientsService(query: FilterQuery<IngredientsDocument> = {}): Promise<IngredientsDocument[]> {
    return IngredientsModel.find(query).exec();
}

/**
 * Creates a new ingredient in the database.
 * @param ingredientInput The input data for the new ingredient.
 * @returns A promise that resolves to the created ingredient document.
 */
export async function createIngredientService(ingredientInput: IngredientsInput): Promise<IngredientsDocument> {
    return IngredientsModel.create(ingredientInput);
}

/**
 * Retrieves an ingredient by its ID from the database.
 * @param id The ID of the ingredient to retrieve.
 * @returns A promise that resolves to the found ingredient document, or null if not found.
 */
export async function getIngredientByIdService(id: string): Promise<IngredientsDocument | null> {
    return IngredientsModel.findById(id).exec();
}

/**
 * Updates an existing ingredient in the database.
 * @param id The ID of the ingredient to update.
 * @param ingredientInput The updated data for the ingredient.
 * @returns A promise that resolves to the updated ingredient document, or null if not found.
 */
export async function updateIngredientService(id: string, ingredientInput: IngredientsInput): Promise<IngredientsDocument | null> {
    return IngredientsModel.findByIdAndUpdate(id, ingredientInput, { new: true }).exec();
}

/**
 * Deletes an ingredient from the database.
 * @param id The ID of the ingredient to delete.
 * @returns A promise that resolves when the ingredient is successfully deleted.
 */
export async function deleteIngredientService(id: string): Promise<void> {
    await IngredientsModel.findByIdAndDelete(id).exec();
}
