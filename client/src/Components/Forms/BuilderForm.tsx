import React, {useState} from "react";
import {z} from "zod";
import BuilderFormInput from "@/Components/Inputs/BuilderFormInput.tsx";
import {motion} from "framer-motion";
import BuilderFormShapeButton from "../Buttons/BuilderFormShapeButton.tsx";
import BuilderFormTemperatureControl from "@/Components/Buttons/BuilderFormTemperatureControl.tsx";

const schema = z.object({
    NutsQuantity: z.number().min(0),
    SweetBakingSoda: z.number().min(0),
    FiberQuantity: z.number().min(0),
    SugarQuantity: z.number().min(0),
    OilQuantity: z.number().min(0),
    Temperature: z.number().min(100)
});

const BuilderForm: React.FunctionComponent = React.memo((): React.ReactNode => {
    const [formValues, setFormValues] = useState({
        Temperature: 100,
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

    return (
        <>
            <form
                className="flex justify-center items-center w-full h-screen " onSubmit={handleSubmit}>
                {/*Left ones*/}
                <motion.div
                    initial={{scale: .8, y: 2160}}
                    animate={{scale: 1, y: 0}}
                    transition={{
                        type: "spring",
                        stiffness: 50,
                        damping: 15,
                        duration: 0.5
                    }}
                    className={`flex flex-col h-full w-full`}>
                    <div
                        className={`flex w-full h-full`}>
                        <BuilderFormShapeButton
                            name="Shape"
                            value={formValues.FiberQuantity}
                            onChange={handleInputChange}
                            Label={`Shape`}
                            Background={'orange'}/>
                        <BuilderFormTemperatureControl
                            value={formValues.Temperature}
                            onChange={handleTemperatureChange}
                            maxValue={200}
                            minValue={100}
                            step={10}/>
                    </div>
                    <div className={`flex w-full h-full`}>
                        <BuilderFormInput
                            name="FiberQuantity"
                            value={formValues.FiberQuantity}
                            onChange={handleInputChange}
                            Label={`Fiber`}
                            image={`/builder/fiber.png`}
                            Background={'yellow'}
                        />

                        <BuilderFormInput
                            name="SugarQuantity"
                            value={formValues.SugarQuantity}
                            onChange={handleInputChange}
                            Label={'Sugar'}
                            Background={'green'}
                            image={`/builder/sugar.png`}
                        />
                        <BuilderFormInput
                            name="OilQuantity"
                            value={formValues.OilQuantity}
                            onChange={handleInputChange}
                            Label={'Oil'}
                            Background={'pink'}
                            image={`/builder/oil.png`}
                        />
                    </div>
                </motion.div>
                {/*Right ones */}
                <motion.div
                    initial={{scale: 0, x: 1080}}
                    animate={{scale: 1, x: 0}}
                    transition={{
                        type: "spring",
                        stiffness: 50,
                        damping: 15,
                        duration: 0.5
                    }}
                    className={`flex flex-col w-full h-full`}>
                    <BuilderFormInput
                        name="NutsQuantity"
                        value={formValues.NutsQuantity}
                        onChange={handleInputChange}
                        Label={'Nuts'}
                        Background={'red'}
                        image={`/builder/nuts.png`}
                    />

                    <BuilderFormInput
                        name="SweetBakingSoda"
                        value={formValues.SweetBakingSoda}
                        onChange={handleInputChange}
                        Label={'Soda'}
                        image={`/builder/soda.png`}
                        Background={'blue'}
                    />
                    <motion.button type="submit" whileTap={{scale: 2, borderRadius: "100%"}}

                                   transition={{
                                       type: "spring",
                                       stiffness: 50,
                                       damping: 15,
                                       duration: 0.5
                                   }}
                                   className={`w-full h-full bg-violet-700 flex font-sonsie text-6xl justify-center items-center`}>
                        BakeUp
                    </motion.button>
                    {/*<BuilderLoader/>*/}
                </motion.div>

                {/*<button className={`text-white bg-violet-700 p-2 rounded-3xl`} type="submit">Submit</button>*/}
            </form>
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
