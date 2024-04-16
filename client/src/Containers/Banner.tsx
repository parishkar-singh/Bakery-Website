import React from "react";
import BannerCard from "@/Components/Cards/BannerCard.tsx";

const Banner: React.FunctionComponent = React.memo(() => {
    return (
        <div className="flex justify-center  h-screen w-full">
            {/* Left side */}
            <div className=" flex flex-col  h-full w-full  ">
                <BannerCard Image="/biskit.png" Heading="Crispes" Background={"yellow"} />
                <div className={`flex h-full`}>
                <BannerCard Image="/jelly.png" Heading="Jelly's" Background={"green"} />
                <BannerCard Image="/jelly.png" Heading="Cookie's" Background={"purple"} />
                </div>
            </div>
            {/* Right side */}
            <div className="flex flex-col w-full   ">
                <BannerCard Image="/torpedo.png" Heading="Torepedo's" Background={"orange"} />
                <BannerCard Image="/sweets.png" Heading="Sweet's" Background={"red"} />
                <BannerCard Image="/number2.png" Heading="Custom's" Background={`green`} />
            </div>
        </div>
    );
});

export default Banner;
