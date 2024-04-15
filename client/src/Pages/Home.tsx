import React from 'react';
import Navbar from "../Containers/Navbar";
import Banner from "@/Containers/Banner.tsx";

const Home: React.FC = React.memo(() => {
    return (
        <div className=" mt-10">
            <Banner/>
        </div>
    );
});

export default Home;
