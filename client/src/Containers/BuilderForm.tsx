import React, {useState} from "react";
import {z} from "zod";
import BuilderFormInput from "@/Components/Inputs/BuilderFormInput.tsx";
import {motion} from "framer-motion";
import BuilderFormShapeButton from "../Components/Buttons/BuilderFormShapeButton.tsx";
import BuilderFormTemperatureControl from "@/Components/Sliders/BuilderFormTemperatureControl.tsx";
import InventoryInfo from "@/Components/Info/InventoryInfo.tsx";
import RecipeStats from "@/Components/Info/RecipeStats.tsx";
import BuilderLoader from "@/Components/ClipLoaders/BuilderLoader.tsx";

const schema = z.object({
    Shape:z.enum(["star","triangle","circle","square"]),
    NutsQuantity: z.number().min(0),
    SweetBakingSoda: z.number().min(0),
    FiberQuantity: z.number().min(0),
    SugarQuantity: z.number().min(0),
    OilQuantity: z.number().min(0),
    Temperature: z.number().min(100)
});

const BuilderForm: React.FunctionComponent = React.memo((): React.ReactNode => {
    const [formValues, setFormValues] = useState({
        Shape:'star',
        Temperature: 150,
        NutsQuantity: 69,
        SweetBakingSoda: 120,
        FiberQuantity: 70,
        SugarQuantity: 90,
        OilQuantity: 50,
    });

    const [formErrors, setFormErrors] = useState<z.ZodIssue[] | null>(null);

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
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };
    const handleTemperatureChange = (temperature: number): void => {
        setFormValues({
            ...formValues,
            Temperature: temperature,
        });
    };
    const handleShapeChange = (shape: string): void => {
        setFormValues({
            ...formValues,
            Shape: shape,
        });
    };

    return (
        <>
            <form
                className="flex justify-center items-center w-full h-screen " onSubmit={handleSubmit}>
                {/*Left ones*/}
                <motion.div
                    className={`flex flex-col h-full w-full`}>
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
                        />
                        <BuilderFormInput
                            name={`SweetBakingSoda`}
                            value={formValues.SweetBakingSoda}
                            onChange={handleInputChange}
                            Label={'Soda'}
                            image={`/builder/soda.jpg`}
                            Background={'blue'}
                        />
                    </div>
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
                            value={formValues.FiberQuantity}
                            onChange={handleInputChange}
                            Background={'orange'}/>
                    </div>
                    {/*right downside*/}
                    <div className={`flex w-full`}>
                        <BuilderFormTemperatureControl
                            value={formValues.Temperature}
                            onChange={handleTemperatureChange}
                        />
                    </div>

                    <motion.button type="submit" whileTap={{scale: .5}}
                                   transition={{
                                       type: "spring",
                                       stiffness: 150,
                                       damping: 10,
                                       duration: 0.1
                                   }}
                                   className={`w-1/2 h-1/2 bg-violet-700 flex font-sonsie text-6xl justify-center items-center`}>
                        BakeUp
                    </motion.button>
                </motion.div>

                {/*<button className={`text-white bg-violet-700 p-2 rounded-3xl`} type="submit">Submit</button>*/}
            </form>
            <InventoryInfo/>

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
