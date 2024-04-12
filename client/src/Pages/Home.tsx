import React from 'react';
import Navbar from "../Containers/Navbar";

const Home: React.FC = React.memo(() => {
    return (
        <div className="flex bg-secondary  flex-col min-h-screen min-w-screen ">
            {/*<Navbar/>*/}
            <Navbar/>
            <h1 className={`text-black font-oswald text-9xl font-black`}>Parishkar singh</h1>
            <h1 className={`text-black font-sonsie text-9xl font-black`}>Parishkar singh</h1>
            <h1 className={`text-black text-9xl font-black`}>Parishkar singh</h1>
            <h1 className={`text-black text-9xl font-black`}>Parishkar singh</h1>
            <h1 className={`text-black text-9xl font-black`}>Parishkar singh</h1>
            <h1 className={`text-black text-9xl font-black`}>Parishkar singh</h1>
            <h1 className={`text-black text-9xl font-black`}>Parishkar singh</h1>
            <h1 className={`text-black text-9xl font-black`}>Parishkar singh</h1>
            <h1 className={`text-black text-9xl font-black`}>Parishkar singh</h1>
        </div>
    );
});

export default Home;
