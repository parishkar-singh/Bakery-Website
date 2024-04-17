import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {InventoryItem} from "@/Types/Inventory.ts";
import {getAllInventoryItems} from "@/Api/Inventory.ts";




const InventoryInfo: React.FunctionComponent = React.memo(() => {
    const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
    function capitalizeFirstLetter(string:any) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response=await getAllInventoryItems();
                setInventoryItems(response)
            } catch (error) {
                console.error("Error fetching trending data:", error);
            }
        };

        fetchIngredients();
    }, []);
    return (
        <motion.div
            whileTap={{scale: 1.1}}
            initial={{scale: 0, y: 2160}}
            animate={{scale: 1, y: 0}}
            transition={{
                type: "spring",
                stiffness: 50,
                damping: 15,
                duration: 0.1
            }}
            className={`relative overflow-clip select-none  w-full h-full flex flex-col justify-center items-center  group `}
        >
            <img draggable={false}
                 className={'absolute  object-cover group-hover:scale-125 transition duration-500 group-hover:blur-lg  h-full w-full '}
                 src={'/builder/inventory.jpg'} alt=""/>
            <span className=" drop-shadow-4xl relative p-2  font-sonsie text-4xl text-white">Inventory</span>
            <div
                className={`relative italic flex p-6 flex-col  w-4/5   text-2xl font-black font-oswald`}>
                <table className={`shadow-2xl drop-shadow-4xl backdrop-blur  rounded-3xl text-center`}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Cost</th>
                        <th>Calories</th>
                    </tr>
                    </thead>
                    <tbody>
                    {inventoryItems.map((ingredient, index) => (
                        <tr key={index}>
                            <td>{capitalizeFirstLetter(ingredient.name)}</td>
                            <td>${ingredient.cost}</td>
                            <td>{ingredient.calories}/100{ingredient.unit}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
});

export default InventoryInfo;
