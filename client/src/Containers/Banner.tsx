import React, {useEffect, useState} from "react";
import BannerCard from "@/Components/Cards/BannerCard.tsx";
import FoodBannerCard from "@/Components/Cards/FoodBannerCard.tsx";
import {InventoryItem} from "@/Types/Inventory.ts";
import {getAllInventoryItems} from "@/Api/Inventory.ts";
import {getAllRecipeItems} from "@/Api/Recipes.ts";

const Banner: React.FunctionComponent = React.memo(() => {
    const [recipesItems, setRecipesItems] = useState<any>([]);

    useEffect((): void => {
        const fetchRecipes = async (): Promise<void> => {
            try {
                const response = await getAllRecipeItems();
                setRecipesItems(response.recipes)
            } catch (error) {
                console.error("Error fetching trending data:", error);
            }
        };

        fetchRecipes();
    }, []);
    return (
        <div className="flex justify-center  h-screen w-full">
            {/* Left side */}
            <div className=" flex flex-col h-full w-full">
                <BannerCard Image="/biskit.png" Heading="Must Try's" Background={"yellow"} />
                <div className={`flex h-full`}>
                <BannerCard Image="/jelly.png" Heading="Jelly's" Background={"green"} />
                <FoodBannerCard Details={recipesItems[0]} Image="/jelly.png" Heading="Cookie's" Background={"purple"} />
                </div>
            </div>
            {/* Right side */}
            <div className="flex flex-col w-full   ">
                {/*<BannerCard Image="/torpedo.png" Heading="Torepedo's" Background={"orange"} />*/}
                <BannerCard Image="/number2.png" Heading="Custom's" Background={`green`} />
                <div className={`flex w-full h-full`}>
                <BannerCard Image="/sweets.png" Heading="Sweet's" Background={"red"} />
                <FoodBannerCard Details={recipesItems[2]} Image="/jelly.png" Heading="Cookie's" Background={"blue"} />
                </div>
                <FoodBannerCard Details={recipesItems[1]} Image="/jelly.png" Heading="Cookie's" Background={"orange"} />
            </div>
        </div>
    );
});

export default Banner;
