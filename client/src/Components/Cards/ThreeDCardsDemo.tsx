import React from "react";
import {CardBody, CardContainer, CardItem} from "@/3D/Card.tsx";

interface ThreeDCardProps{

}

const ThreeDCard: React.FunctionComponent = () => {
    return (
        <CardContainer className="inter-var relative">
            <CardBody
                className="bg-gray-50 relative dark:hover:shadow-2xl  dark:bg-black  border-black/[0.1] w-64  h-64 rounded-xl p-6 border"
            >
            <img
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                height="1000"
                width="1000"
                className="absolute inset-0 w-full h-full object-cover rounded-xl group-hover:shadow-xl"
                alt="thumbnail"
            />

                <CardItem
                    translateZ="200"
                    className="text-xl font-sonsie font-bold text-white dark:text-white relative z-10"
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
