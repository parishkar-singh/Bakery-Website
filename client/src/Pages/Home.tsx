import React from 'react';
import Navbar from "../Containers/Navbar";
import Banner from "@/Containers/Banner.tsx";

const Home: React.FC = React.memo(() => {
    return (
        <div className="flex bg-secondary   flex-col min-h-screen max-w-screen ">
            {/*<Navbar/>*/}
            <Navbar/>
            <Banner/>
        </div>
    );
});

export default Home;
