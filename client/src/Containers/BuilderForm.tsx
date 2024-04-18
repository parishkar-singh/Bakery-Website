import React, {useEffect, useState} from "react";
import {z} from "zod";
import BuilderFormInput from "@/Components/Inputs/BuilderFormInput.tsx";
import {motion} from "framer-motion";
import BuilderFormShapeButton from "../Components/Buttons/BuilderFormShapeButton.tsx";
import BuilderFormTemperatureControl from "@/Components/Sliders/BuilderFormTemperatureControl.tsx";
import InventoryInfo from "@/Components/Info/InventoryInfo.tsx";
import RecipeStats from "@/Components/Info/RecipeStats.tsx";
import BuilderLoader from "@/Components/ClipLoaders/BuilderLoader.tsx";
import {useDispatch, useSelector} from "react-redux";
import {setFormValues} from "@/Redux/Actions.ts";
import {getAllInventoryItems} from "@/Api/Inventory.ts";

const schema = z.object({
    Shape: z.enum(["star", "triangle", "circle", "square"]),
    NutsQuantity: z.number().min(0),
    SweetBakingSoda: z.number().min(0),
    FiberQuantity: z.number().min(0),
    SugarQuantity: z.number().min(0),
    OilQuantity: z.number().min(0),
    Temperature: z.number().min(100)
});
const BuilderFormSubmit: React.FunctionComponent = React.memo((): React.ReactNode => {
    return (
        <>
            <motion.button type="submit" whileTap={{scale: .5}}
                           transition={{
                               type: "spring",
                               stiffness: 150,
                               damping: 10,
                               duration: 0.1
                           }}
                           className={`w-full h-full bg-violet-700 flex font-sonsie text-6xl justify-center items-center`}>
                BakeUp
            </motion.button>
        </>
    )
})

const BuilderForm: React.FunctionComponent = React.memo((): React.ReactNode => {
    const dispatch = useDispatch();
    const formValues = useSelector((state: any) => state.form);
    const [getStats, setGetStats] = useState([]);
    const [formErrors, setFormErrors] = useState<z.ZodIssue[] | null>(null);
    const [previousValues, setPreviousValues] = useState({});
    useEffect((): void => {
        const fetchIngredients = async (): Promise<void> => {
            try {
                const response = await getAllInventoryItems();
                setGetStats(response)
            } catch (error) {
                console.error("Error fetching trending data:", error);
            }
        };

        fetchIngredients();
    }, []);
    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        try {
            schema.parse(formValues);
            console.log("Form values are valid:", formValues);
        } catch (error) {
            if (error instanceof z.ZodError) {
                setFormErrors(error.issues);
            }
        }
    };
    const handleInputChange = (name: string, value: number): void => {
        if (isNaN(value)) {
            value = 0;
        }
        dispatch(setFormValues({
            ...formValues,
            [name]: value,
        }));
    };
    const handleTemperatureChange = (temperature: number): void => {
        dispatch(setFormValues({
            ...formValues,
            Temperature: temperature,
        }));
    };

    const handleShapeChange = (shape: string): void => {

        const defaultValues = {
            SweetBakingSoda: 120,
            NutsQuantity: 69,
        };

        const updatedFormValues = {
            ...formValues,
            Shape: shape,
            SweetBakingSoda: shape !== "circle" ? defaultValues.SweetBakingSoda : 0,
            NutsQuantity: shape !== "star" ? defaultValues.NutsQuantity : 0,
        };

        dispatch(setFormValues(updatedFormValues));
    };


    function computeTotals(getStats: any[]) {
        let totalCost = 0;
        let totalBakingTime = 0;
        let totalCalories = 0;

        // console.log(getStats)
        getStats.forEach(ingredient => {
            if (ingredient.name == 'nuts') {
                totalCost += ingredient.cost * formValues.NutsQuantity;
                totalCalories += (ingredient.calories * formValues.NutsQuantity)
                if (formValues.NutsQuantity > 0) {
                    totalBakingTime += ingredient.bakingTime;
                }
            }
            if (ingredient.name == 'soda') {
                totalCost += ingredient.cost * formValues.SweetBakingSoda;
                totalCalories += (ingredient.calories * formValues.SweetBakingSoda)
                if (formValues.SweetBakingSoda > 0) {
                    totalBakingTime += ingredient.bakingTime;
                }
            }
            if (ingredient.name == 'sugar') {
                totalCost += ingredient.cost * formValues.SugarQuantity;
                totalCalories += (ingredient.calories * formValues.SugarQuantity)
                if (formValues.SugarQuantity > 0) {
                    totalBakingTime += ingredient.bakingTime;
                }
            }
            if (ingredient.name == 'oil') {
                totalCost += ingredient.cost * formValues.OilQuantity;
                totalCalories += (ingredient.calories * formValues.OilQuantity)
                if (formValues.OilQuantity > 0) {
                    totalBakingTime += ingredient.bakingTime;
                }
            }
            if (ingredient.name == 'Fiber') {
                totalCost += ingredient.cost * formValues.FiberQuantity;
                totalCalories += (ingredient.calories * formValues.FiberQuantity)
                if (formValues.FiberQuantity > 0) {
                    totalBakingTime += ingredient.bakingTime;
                }
            }
        });
        return {
            totalCost,
            totalBakingTime,
            totalCalories
        };
    }

    const totals = computeTotals(getStats);
    const totalWeight = formValues.SweetBakingSoda + formValues.NutsQuantity + formValues.SugarQuantity + formValues.OilQuantity + +formValues.FiberQuantity;

    return (
        <>
            <form
                className="flex justify-center items-center w-full h-screen " onSubmit={handleSubmit}>
                {/*Left ones*/}
                <motion.div
                    className={`flex flex-col h-full w-full`}>
                    {/*Left Upside*/}
                    <div
                        className={`flex w-full h-full`}>
                        <BuilderFormShapeButton
                            value={formValues.Shape}
                            onChange={handleShapeChange}
                        />
                        <BuilderFormInput
                            name={`NutsQuantity`}
                            value={formValues.NutsQuantity}
                            onChange={handleInputChange}
                            Label={'Nuts'}
                            Background={'orange'}
                            image={`/builder/nuts.jpg`}
                            disabled={formValues.Shape === "star"}
                        />
                        <BuilderFormInput
                            name={`SweetBakingSoda`}
                            value={formValues.SweetBakingSoda}
                            onChange={handleInputChange}
                            Label={'Soda'}
                            image={`/builder/soda.jpg`}
                            Background={'blue'}
                            disabled={formValues.Shape === "circle"}
                        />
                    </div>
                    {/*left downside*/}
                    <div className={`flex w-full h-full`}>
                        <BuilderFormInput
                            name={`FiberQuantity`}
                            value={formValues.FiberQuantity}
                            onChange={handleInputChange}
                            Label={`Fiber`}
                            image={`/builder/fiber.jpg`}
                            Background={'yellow'}
                        />

                        <BuilderFormInput
                            name={`SugarQuantity`}
                            value={formValues.SugarQuantity}
                            onChange={handleInputChange}
                            Label={'Sugar'}
                            Background={'green'}
                            image={`/builder/sugar.jpg`}
                        />
                        <BuilderFormInput
                            name={`OilQuantity`}
                            value={formValues.OilQuantity}
                            onChange={handleInputChange}
                            Label={'Oil'}
                            Background={'pink'}
                            image={`/builder/oil.jpg`}
                        />
                    </div>
                </motion.div>
                {/*Right ones */}
                <motion.div
                    initial={{scale: 1, x: 1080}}
                    animate={{scale: 1, x: 0}}
                    transition={{
                        type: "spring",
                        stiffness: 50,
                        damping: 15,
                        duration: 0.1
                    }}
                    className={`flex flex-col w-1/3 h-full`}>
                    {/*right upside*/}
                    <div className={`flex  w-full h-1/2`}>
                        <RecipeStats
                            calories={totals.totalCalories / 10}
                            time={totals.totalBakingTime}
                            cost={totals.totalCost / 10}
                            weight={totalWeight}
                            onChange={handleInputChange}
                        />
                    </div>
                    {/*right downside*/}
                    <div className={`flex w-full`}>
                        <BuilderFormTemperatureControl
                            value={formValues.Temperature}
                            onChange={handleTemperatureChange}
                        />
                    </div>
                    <InventoryInfo/>
                    <BuilderFormSubmit/>
                </motion.div>

                {/*<button className={`text-white bg-violet-700 p-2 rounded-3xl`} type="submit">Submit</button>*/}
            </form>

            <BuilderLoader/>
            {formErrors && (
                <div style={{color: "red"}}>
                    {formErrors.map((error, index) => (
                        <p key={index}>{error.message}</p>
                    ))}
                </div>
            )}
        </>


    );
});

export default BuilderForm;