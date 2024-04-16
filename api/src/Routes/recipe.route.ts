import {Router} from 'express';
import {createRecipe, deleteRecipe, getAllRecipes, getRecipeById, updateRecipe} from "@/Controllers/recipe.controller";


const router:Router = Router();

// Routes for Recipes
router.get('/', getAllRecipes);
router.post('/', createRecipe);
router.get('/:id', getRecipeById);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

export default router;
