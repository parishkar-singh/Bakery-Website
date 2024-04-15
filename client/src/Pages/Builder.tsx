import React, { useState } from "react";
import FormInput from "@/Components/Inputs/FormInput.tsx";

const Builder: React.FunctionComponent = () => {
    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: "",
        instructions: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you can handle the submission of the recipe, e.g., sending it to a server or storing it locally.
        console.log("Recipe submitted:", recipe);
        // Clearing the form after submission
        setRecipe({
            name: "",
            ingredients: "",
            instructions: ""
        });
    };

    return (
        <>
            <h2 className={`text-9xl text-center select-none font-black text-black`}>Recipe Builder</h2>

            <form onSubmit={handleSubmit}>
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default Builder;
