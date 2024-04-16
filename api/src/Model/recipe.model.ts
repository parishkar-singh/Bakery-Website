import mongoose from "mongoose";
import 'dotenv/config'

// Enum for possible shapes
enum Shape {
    Star = "star",
    Triangle = "triangle",
    Square = "square",
    Circle = "circle"
}

// Interface representing recipe data
export interface RecipeInput {
    name: string;       // Recipe name
    shape: Shape;       // Shape of the recipe (enum)
    temperature: number;    // Temperature for cooking
    calories: number;   // Calories per serving
    oil: string;        // Oil used in the recipe
    sugar: string;      // Sugar used in the recipe
    fiber: string;      // Fiber content in the recipe
    soda: string;       // Soda used in the recipe
    nuts: string;       // Nuts used in the recipe
}

// Interface extending Mongoose Document, representing Recipe document
export interface RecipeDocument extends RecipeInput, mongoose.Document {
    createdAt: Date;    // Timestamp for creation of the Recipe document
    updatedAt: Date;    // Timestamp for last update of the Recipe document
}

// Define Recipe Schema using Mongoose Schema
const recipeSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true },        // Recipe name (required)
    shape: { type: String, enum: Object.values(Shape), required: true }, // Recipe shape (enum)
    temperature: { type: Number, required: true },    // Cooking temperature (required)
    calories: { type: Number, required: true },   // Calories per serving (required)
    oil: { type: String, required: true },        // Oil used in the recipe (required)
    sugar: { type: String, required: true },      // Sugar used in the recipe (required)
    fiber: { type: String, required: true },      // Fiber content in the recipe (required)
    soda: { type: String, required: true },       // Soda used in the recipe (required)
    nuts: { type: String, required: true },       // Nuts used in the recipe (required)
}, { timestamps: true });                      // Auto-generate timestamps for createdAt and updatedAt

// Define Mongoose model for Recipe using RecipeDocument interface and RecipeSchema
const RecipeModel = mongoose.model<RecipeDocument>('Recipe', recipeSchema);

export default RecipeModel;
