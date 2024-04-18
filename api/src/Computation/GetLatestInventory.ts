export enum Shape {
    Star = "star",
    Triangle = "triangle",
    Square = "square",
    Circle = "circle"
}

// Interface representing an ingredient
export interface Ingredient {
    name: string;
    unit: "mg" | "ml";
    cost: number;
    stock: number;
    calories: number;
    bakingTime?: number;
    cookingTime?: number;
}

// Interface representing a recipe
export interface Recipe {
    name: string;
    shape: Shape;
    temperature: number;
    calories: number;
    oil: number;
    sugar: number;
    fiber: number;
    soda: number;
    nuts: number;
    cookingTime: number;
    price:number
}