import React from "react";
import { useDispatch} from "react-redux";
import Button from "../Components/Buttons/Button";
import { setActiveTab } from "@/Redux/Actions.ts";

const Sidebar: React.FC = React.memo(() => {
    const dispatch = useDispatch();

    const handleSetActiveTab = (tabName: string) => {
        dispatch(setActiveTab(tabName));
    };

    return (
        <div className="h-full flex border-r-2  dark:border-neutral-700   flex-col justify-between bg-white dark:bg-black w-1/5">
            <div className="flex flex-col p-3 gap-3">
                <Button text={"Projects"} onClick={() => handleSetActiveTab("Projects")} />
                <Button text={"Employees"} onClick={() => handleSetActiveTab("Employees")} />
                <Button text={"Tasks"} onClick={() => handleSetActiveTab("Tasks")} />
                {/*<Button text={"Progress"} onClick={() => setActiveButton("Progress")} />*/}
                {/* <Button text={"Team's"} onClick={() => setActiveButton("Employees")} /> */}

                {/* <Button  text={"Project's"} /> */}
            </div>
            <div className="flex flex-col p-3 gap-3">
                <Button href="/settings" text={"Settings"} />
                <Button href="/auth" text={"Sign Out"} />
            </div>
            {/*<div>Active Tab: {activeTab}</div> /!* Displaying active tab *!/*/}
        </div>
    );
});

export default Sidebar;
