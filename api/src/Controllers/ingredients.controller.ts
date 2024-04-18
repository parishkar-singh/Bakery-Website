import {Request, Response} from "express";
import {
    createIngredientService, deleteIngredientService,
    getAllIngredientsService,
    getIngredientByIdService, updateIngredientService
} from "@/Services/ingredients.service";
import {IngredientsDocument, IngredientsInput} from "@/Model/ingredient.model";

/**
 * Controller function to retrieve all ingredients.
 * @param req The request object.
 * @param res The response object.
 */
export async function getAllIngredients(req: Request, res: Response): Promise<void> {
    try {
        const ingredients: IngredientsDocument[] = await getAllIngredientsService();
        res.json(ingredients);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}

/**
 * Controller function to create a new ingredient.
 * @param req The request object containing the ingredient data.
 * @param res The response object.
 */
export async function createIngredient(req: Request, res: Response): Promise<void> {
    const ingredientInput: IngredientsInput = req.body;
    try {
        const newIngredient: IngredientsDocument = await createIngredientService(ingredientInput);
        res.status(201).json(newIngredient);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

/**
 * Controller function to retrieve an ingredient by its ID.
 * @param req The request object containing the ingredient ID.
 * @param res The response object.
 */
export async function getIngredientById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
        const ingredient: IngredientsDocument | null = await getIngredientByIdService(id);
        res.json(ingredient);
    } catch (error: any) {
        res.status(404).json({message: error.message});
    }
}

/**
 * Controller function to update an existing ingredient.
 * @param req The request object containing the ingredient ID and updated data.
 * @param res The response object.
 */
export async function updateIngredient(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const ingredientInput: IngredientsInput = req.body;
    try {
        const updatedIngredient: IngredientsDocument | null = await updateIngredientService(id, ingredientInput);
        res.json(updatedIngredient);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

/**
 * Controller function to delete an ingredient.
 * @param req The request object containing the ingredient ID.
 * @param res The response object.
 */
export async function deleteIngredient(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
        await deleteIngredientService(id);
        res.json({message: "Ingredient deleted successfully"});
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

