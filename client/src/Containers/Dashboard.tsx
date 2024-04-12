import React from 'react';
import { useSelector } from 'react-redux';
import EmployeesTable from '../Tabs/EmployeesTab';
import ProjectTable from '../Tabs/ProjectsTab';
import Button from '../Components/Buttons/Button';
import TaskTab from '../Tabs/TasksTab';
import { RootState } from '@/Redux/Store.ts';
import ThreeDCardDemo from "@/Components/Cards/ThreeDCardsDemo.tsx";
import {ProjectContributors} from "@/Components/ProjectContributors.tsx";

const DashboardIntro: React.FC = React.memo(() => {
    return (
        <div className='overflow-hidden h-full flex flex-col justify-center items-center bg-black w-full'>
            {/*<h1 className='flex text-3xl font-bold'>SprintV Sandbox</h1>*/}
            <ProjectContributors/>

<ThreeDCardDemo/>
            {/*<Button text={`Docs`} />*/}
        </div>
    );
});

const Dashboard: React.FC = React.memo(() => {
    const activeButton = useSelector((state: RootState) => state.activeTab);

    const componentMap: { [key: string]: React.ReactElement } = {
        '/': <DashboardIntro />,
        'Employees': <EmployeesTable />,
        'Projects': <ProjectTable />,
        'Tasks': <TaskTab />
    };

    return (
        <div className='overflow-y-auto h-full flex-col bg-white dark:bg-black w-full'>
            {componentMap[activeButton]}
        </div>
    );
});

export default Dashboard;
