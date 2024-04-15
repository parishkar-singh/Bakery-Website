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
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Navbar from "@/Containers/Navbar.tsx";
import Builder from "@/Pages/Builder.tsx";

const App: React.FunctionComponent = (): React.ReactNode => {
    useEffect(() => {
        const lenis:Lenis = new Lenis()

        lenis.on('scroll', ScrollTrigger.update)

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)

        return () => {
        };
    }, []);
    return (
        <div className="relative bg-secondary flex overflow-clip text-white flex-col min-h-screen max-w-screen ">
            <Router>
                <SidebarProvider>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/auth" element={<Auth/>}/>
                        <Route path="/builder" element={<Builder/>}/>
                    </Routes>
                </SidebarProvider>
            </Router>
            <Navbar/>
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
