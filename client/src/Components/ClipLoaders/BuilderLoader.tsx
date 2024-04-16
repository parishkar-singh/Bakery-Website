import React, {useState} from "react";
import {IconSquareRoundedX} from "@tabler/icons-react";
import {MultiStepLoader} from "@/Components/ClipLoaders/Loader.tsx";

const loadingStates = [
    {
        text: "Adding Nuts",
    },
    {
        text: "Stiring with Sweet Baking soda",
    },
    {
        text: "Fibers added",
    },
    {
        text: "Sweetifying",
    },
    {
        text: "Oils added",
    },
];

const BuilderLoader:React.FunctionComponent = ():React.ReactNode => {
    const [loading, setLoading] = useState(false);
    return (
        <div className="w-full h-[60vh] flex items-center justify-center">
            <MultiStepLoader loadingStates={loadingStates} loading={loading} duration={2000}/>
            <button
                onClick={() => setLoading(true)}
                className="bg-[#39C3EF] hover:bg-[#39C3EF]/90 text-black mx-auto text-sm md:text-base transition font-medium duration-200 h-10 rounded-lg px-8 flex items-center justify-center"
                style={{
                    boxShadow:
                        "0px -1px 0px 0px #ffffff40 inset, 0px 1px 0px 0px #ffffff40 inset",
                }}
            >
                Click to load
            </button>

            {loading && (
                <button
                    className="fixed top-4 right-4 text-black dark:text-white z-[120]"
                    onClick={() => setLoading(false)}
                >
                    <IconSquareRoundedX className="h-10 w-10"/>
                </button>
            )}
        </div>
    );
}

export default BuilderLoader;