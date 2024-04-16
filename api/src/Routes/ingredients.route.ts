import express from "express";
import {
    createIngredient, deleteIngredient,
    getAllIngredients,
    getIngredientById,
    updateIngredient
} from "@/Controllers/ingredients.controller";

const router = express.Router();

// Routes
router.get("/", getAllIngredients);
router.post("/", createIngredient);
router.get("/:id", getIngredientById);
router.put("/:id", updateIngredient);
router.delete("/:id", deleteIngredient);

export default router;
