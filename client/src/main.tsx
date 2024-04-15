import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Provider, useSelector} from "react-redux";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import "./styles.css";
import {SidebarProvider} from "./Context/TabContext";
import store, {RootState} from "@/Redux/Store.ts";
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import DarkModeButton from "@/Components/Buttons/DarkModeButton.tsx";
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Navbar from "@/Containers/Navbar.tsx";
import Builder from "@/Pages/Builder.tsx";

const App = () => {
    const theme = useSelector((state: RootState) => state.theme);


    useEffect(() => {
        const lenis = new Lenis()

        lenis.on('scroll', ScrollTrigger.update)

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)

        return () => {
        };
    }, []);
    return (
        <div className=" bg-secondary flex overflow-clip text-white flex-col min-h-screen max-w-screen ">
            <Navbar/>
            <SidebarProvider >
                <Router >
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/auth" element={<Auth/>}/>
                        <Route path="/builder" element={<Builder/>}/>
                        {/*<Route path="/dashboard" element={<Home />} />*/}
                    </Routes>
                </Router>
            </SidebarProvider>
        </div>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
                <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
