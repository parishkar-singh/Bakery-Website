'use client'
import React, {useEffect, useState} from "react";
import {InventoryItem} from "@/Types/Inventory";
import {getAllInventoryItems} from "@/Api/Inventory";
import {shadowTextLg, shadowTextMd} from "@/Utils/CssModules";


const InventoryInfo: React.FunctionComponent = React.memo(() => {
    const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);

    function capitalizeFirstLetter(string: any) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect((): void => {
        const fetchIngredients = async (): Promise<void> => {
            try {
                const response = await getAllInventoryItems();
                setInventoryItems(response)
            } catch (error) {
                console.error("Error fetching trending data:", error);
            }
        };

        fetchIngredients();
    }, []);
    return (
        <div
            className={`relative overflow-clip select-none w-full h-full flex flex-col justify-center items-center  group `}>
            <img draggable={false}
                 className={'absolute  object-cover group-hover:scale-125 transition duration-500 group-hover:blur-lg  h-full w-full '}
                 src={'/builder/inventory.jpg'} alt=""/>
            {/*<span style={{...shadowTextMd}}*/}
            {/*      className=" drop-shadow-4xl relative p-2  font-sonsie text-4xl text-white"></span>*/}
            <div className={`relative italic flex  flex-col h-full w-full  text-2xl font-black font-oswald`}>
                <table style={{...shadowTextMd}} className={`bg-black/60  h-full w-full  text-center`}>
                    <thead className={ `border-b border-b-gray-200`}>
                    <tr >
                        <th>Name</th>
                        <th>Cost</th>
                        <th>Kcal</th>
                        <th>Stock</th>
                    </tr>
                    </thead>
                    <tbody>
                    {inventoryItems.map((ingredient, index) => (
                        <tr  key={index}>
                            <td style={{...shadowTextLg}}>{capitalizeFirstLetter(ingredient.name)}</td>
                            <td style={{...shadowTextLg}}>${ingredient.cost}</td>
                            <td style={{...shadowTextLg}}>{ingredient.calories}</td>
                            <td style={{...shadowTextLg}}>{ingredient.stock}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export default InventoryInfo;
