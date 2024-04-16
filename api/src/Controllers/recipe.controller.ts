import {
    createRecipeService, deleteRecipeService,
    getAllRecipesService,
    getRecipeByIdService,
    updateRecipeService
} from '@/Services/recipe.service';
import {Request, Response} from 'express';
import {RecipeDocument, RecipeInput} from "@/Model/recipe.model";


export async function getAllRecipes(req: Request, res: Response): Promise<void> {
    try {
        const recipes: RecipeDocument[] = await getAllRecipesService(req.query);
        res.json(recipes);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}

export async function createRecipe(req: Request, res: Response): Promise<void> {
    const recipeInput: RecipeInput = req.body;
    try {
        const newRecipe = await createRecipeService(recipeInput);
        res.status(201).json(newRecipe);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

export async function getRecipeById(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    try {
        const recipe: RecipeDocument | null = await getRecipeByIdService(id);
        res.json(recipe);
    } catch (error: any) {
        res.status(404).json({message: error.message});
    }
}

export async function updateRecipe(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    const recipeInput: RecipeInput = req.body;
    try {
        const updatedRecipe: RecipeDocument | null = await updateRecipeService(id, recipeInput);
        res.json(updatedRecipe);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

export async function deleteRecipe(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    try {
        await deleteRecipeService(id);
        res.json({message: 'Recipe deleted successfully'});
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}
