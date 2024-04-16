import React, {useState} from "react";
import {z} from "zod";
import BuilderFormInput from "@/Components/Cards/BuilderFormInput.tsx";
import BuilderLoader from "@/Components/ClipLoaders/BuilderLoader.tsx";
import Bounce from "@/Motion/Bounce.tsx";
import {motion} from "framer-motion";
import BuilderFormButton from "@/Components/Cards/BuilderFormButton.tsx";
import {Shapes, ThermometerSnowflake} from "lucide-react";

const schema = z.object({
    NutsQuantity: z.number().min(0),
    SweetBakingSoda: z.number().min(0),
    FiberQuantity: z.number().min(0),
    SugarQuantity: z.number().min(0),
    OilQuantity: z.number().min(0),
});

const BuilderForm: React.FunctionComponent = (): React.ReactNode => {
    const [formValues, setFormValues] = useState({
        NutsQuantity: 69,
        SweetBakingSoda: 120,
        FiberQuantity: 70,
        SugarQuantity: 90,
        OilQuantity: 50,
    });
    const [formErrors, setFormErrors] = useState<z.ZodIssue[] | null>(null);

    const handleSubmit = (event: React.FormEvent) => {
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

    const handleInputChange = (name: string, value: number) => {
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    return (
        <>
            <form
                className="flex justify-center items-center w-full h-screen " onSubmit={handleSubmit}>
                {/*Left ones*/}
                <div className={`flex flex-col h-full w-full`}>
                    <div className={`flex w-full h-full`}>
                        <BuilderFormButton
                            name="Shape"
                            value={formValues.FiberQuantity}
                            onChange={handleInputChange}
                            Label={`Shape`}
                            icon={Shapes}
                            Background={'orange'} delay={.2}/>
                        <BuilderFormButton
                            name="TemparatureQuantity"
                            value={formValues.OilQuantity}
                            onChange={handleInputChange}
                            Label={'Temperature'}
                            Background={'teal'}
                            icon={ThermometerSnowflake} delay={.3}/>
                    </div>
                    <div className={`flex w-full h-full`}>
                        <BuilderFormInput
                            name="FiberQuantity"
                            value={formValues.FiberQuantity}
                            onChange={handleInputChange}
                            Label={`Fiber`}
                            image={`/builder/fiber.png`}
                            Background={'yellow'}
                            delay={.05}

                        />

                        <BuilderFormInput
                            name="SugarQuantity"
                            value={formValues.SugarQuantity}
                            onChange={handleInputChange}
                            Label={'Sugar'}
                            Background={'green'}
                            image={`/builder/sugar.png`}
                            delay={.1}
                        />
                        <BuilderFormInput
                            name="OilQuantity"
                            value={formValues.OilQuantity}
                            onChange={handleInputChange}
                            Label={'Oil'}
                            Background={'pink'}
                            image={`/builder/oil.png`}
                            delay={.2}
                        />
                    </div>
                </div>
                {/*Right ones */}
                <div className={`flex flex-col w-full h-full`}>
                    <BuilderFormInput
                        name="NutsQuantity"
                        value={formValues.NutsQuantity}
                        onChange={handleInputChange}
                        Label={'Nuts'}
                        delay={.2}
                        Background={'red'}
                        image={`/builder/nuts.png`}

                    />

                    <BuilderFormInput
                        name="SweetBakingSoda"
                        value={formValues.SweetBakingSoda}
                        onChange={handleInputChange}
                        Label={'Soda'}
                        delay={.2}
                        image={`/builder/soda.png`}
                        Background={'blue'}
                    />
                    <motion.button type="submit" whileTap={{scale: 2, borderRadius: "100%"}}
                                   initial={{scale: 0, x: 2160}}
                                   animate={{scale: 1, x: 0}}
                                   transition={{
                                       type: "spring",
                                       stiffness: 50,
                                       damping: 15,
                                       duration: 0.5
                                   }}
                                   className={`w-full h-full bg-violet-700 flex font-sonsie text-6xl justify-center items-center`}>
                        BakeUp
                    </motion.button>
                    <BuilderLoader/>
                </div>

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
};

export default BuilderForm;
