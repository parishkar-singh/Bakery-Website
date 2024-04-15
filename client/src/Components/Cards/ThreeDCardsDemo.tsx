import React from "react";
import {CardBody, CardContainer, CardItem} from "@/3D/Card.tsx";

interface ThreeDCardProps {
    shape: string
    background: string
}

const ThreeDCard: React.FunctionComponent = () => {
    return (
        <CardContainer className="overflow-visible  w-64 md:w-full h-64 md:h-full relative flex">
            <CardBody className="bg-transparent overflow-visible relative flex justify-center items-center bg-yellow-500 w-64 md:w-full h-64 md:h-full  p-2">
                <CardItem className={`absolute overflow-visible`} translateZ={200}>
                <img
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    height="1000"
                    width="1000"

                    className=" inset-0 w-full h-full object-cover rounded-xl group-hover:shadow-xl"
                    alt="thumbnail"
                />
            </CardItem>
                <CardItem
                    translateZ="200"
                    translateY="1"
                    translateX={20}
                    className="text-xl overflow-visible font-sonsie font-bold text-white  relative z-10"
                >
                    Make things float in air
                </CardItem>
                {/*<CardItem*/}
                {/*    as="p"*/}
                {/*    translateZ="200"*/}
                {/*    className="text-white font-sonsie  text-sm max-w-sm mt-2 dark:text-neutral-300 relative z-10"*/}
                {/*>*/}
                {/*    Hover over this card to unleash the power of CSS perspective*/}
                {/*</CardItem>*/}

            </CardBody>
        </CardContainer>
    );
}

export default ThreeDCard;
