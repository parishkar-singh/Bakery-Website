export type InventoryItem = {
    name: string;       // Ingredient's name
    unit: 'gm' | 'ml';  // Ingredient's Unit (enum)
    cost: number;
    stock:number;
    calories: number;
}