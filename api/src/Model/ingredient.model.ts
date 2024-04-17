import mongoose from "mongoose";
import 'dotenv/config'

// Interface representing ingredients data
export interface IngredientsInput {
    name: string;       // Ingredient's name
    unit: 'gm' | 'ml';  // Ingredient's Unit (enum)
    cost: number;
    stock: number;
    calories: number;
}

// Interface extending Mongoose Document, representing Ingredients document
export interface IngredientsDocument extends IngredientsInput, mongoose.Document {
    createdAt: Date;    // Timestamp for creation of the Ingredients document
    updatedAt: Date;    // Timestamp for last update of the Ingredients document
}

// Define Ingredients Schema using Mongoose Schema
const ingredientsSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },            // Ingredient's name (required)
    unit: { type: String, required: true, enum: ['gm', 'ml'] }, // Ingredients unit is enum
    calories: { type: Number, required: true },
    cost: { type: Number, required: true },
    stock: { type: Number, required: true }
}, { timestamps: true });                      // Auto-generate timestamps for createdAt and updatedAt

// Define Mongoose model for Ingredients using IngredientsDocument interface and IngredientsSchema
const IngredientModel = mongoose.model<IngredientsDocument>('Ingredient', ingredientsSchema);

export default IngredientModel;
