import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import "./globals.css";
import store from "@/Redux/Store.ts";
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Navbar from "@/Containers/Navbar.tsx";
import Builder from "@/Pages/Builder.tsx";
import {createRoot} from "react-dom/client";

const App: React.FunctionComponent = (): React.ReactElement => {
    useEffect(() => {
        const lenis:Lenis = new Lenis()

        lenis.on('scroll', ScrollTrigger.update)

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)

        return ():void => {
        };
    }, []);
    return (
        <main className="relative bg-violet-950 flex overflow-clip text-white flex-col min-h-screen max-w-screen ">
            <Router>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/auth" element={<Auth/>}/>
                        <Route path="/builder" element={<Builder/>}/>
                    </Routes>
            </Router>
            <Navbar/>
        </main>
    );

};
const rootContainer = document.getElementById("root") as HTMLElement;

if (!rootContainer) {
    throw new Error("Root container not found");
}

const root = createRoot(rootContainer);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);