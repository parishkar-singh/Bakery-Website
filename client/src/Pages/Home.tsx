import React from 'react';
import Navbar from "../Containers/Navbar";
import Banner from "@/Containers/Banner.tsx";
import BuilderForm from "@/Containers/BuilderForm.tsx";

const Home: React.FC = React.memo(() => {
    return (
        <>
            <Banner/>
        </>
    )
})

export default Home;
