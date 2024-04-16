import React, { useState } from "react";
import { z } from "zod";
import BuilderFormInput from "@/Components/Inputs/BuilderFormInput.tsx";

const schema = z.object({
    nutsQuantity: z.number().min(0),
    sweetBakingSoda: z.number().min(0),
    fiberQuantity: z.number().min(0),
    sugarQuantity: z.number().min(0),
    oilQuantity: z.number().min(0),
});

const BuilderForm: React.FunctionComponent = (): React.ReactNode => {
    const [formValues, setFormValues] = useState({
        nutsQuantity: 0,
        sweetBakingSoda: 0,
        fiberQuantity: 0,
        sugarQuantity: 0,
        oilQuantity: 0,
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
        <div className=" mt-40 flex flex-col">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <span>Nuts</span>
                <BuilderFormInput
                    name="nutsQuantity"
                    value={formValues.nutsQuantity}
                    onChange={handleInputChange}
                />
                <span>Sweet Baking Soda</span>
                <BuilderFormInput
                    name="sweetBakingSoda"
                    value={formValues.sweetBakingSoda}
                    onChange={handleInputChange}
                />
                <span>Fiber quantity</span>
                <BuilderFormInput
                    name="fiberQuantity"
                    value={formValues.fiberQuantity}
                    onChange={handleInputChange}
                />
                <span>Sugar Quantity</span>
                <BuilderFormInput
                    name="sugarQuantity"
                    value={formValues.sugarQuantity}
                    onChange={handleInputChange}
                />
                <span>Oil Quantity</span>
                <BuilderFormInput
                    name="oilQuantity"
                    value={formValues.oilQuantity}
                    onChange={handleInputChange}
                />
                <button type="submit">Submit</button>
            </form>
            {formErrors && (
                <div style={{ color: "red" }}>
                    {formErrors.map((error, index) => (
                        <p key={index}>{error.message}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BuilderForm;
