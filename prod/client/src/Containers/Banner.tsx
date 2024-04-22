'use client'

import { getAllRecipeItems } from "@/Api/Recipes";
import React, {useEffect, useState} from "react";
import FoodBannerCard from "@/Components/Cards/FoodBannerCard";
import BannerCard from "@/Components/Cards/BannerCard";

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
                <FoodBannerCard Details={recipesItems[0]} Image="/star.png" Heading="Star Cookie" Background={"purple"} />
                </div>
            </div>
            {/* Right side */}
            <div className="flex flex-col w-full">
                {/*<BannerCard Image="/torpedo.png" Heading="Torepedo's" Background={"orange"} />*/}
                <BannerCard Image="/number2.png" Heading="Custom's" Background={`green`} />
                <div className={`flex w-full h-full`}>
                <BannerCard Image="/sweets.png" Heading="Sweet's" Background={"red"} />
                <FoodBannerCard Details={recipesItems[2]} Image="/square.png" Heading="square" Background={"blue"} />
                </div>
                <FoodBannerCard Details={recipesItems[1]} Image="/jelly.png" Heading="" Background={"orange"} />
            </div>
        </div>
    );
});

export default Banner;
