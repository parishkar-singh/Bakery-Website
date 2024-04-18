import React, {useEffect} from "react";
import {Provider} from "react-redux";
import "./globals.css";
import store from "@/Redux/Store.ts";
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Navbar from "@/Containers/Navbar.tsx";
import {createRoot, Root} from "react-dom/client";
import Routing from "@/Routes.tsx";
import {AuthProvider} from "@/Context/AuthContext.tsx";

const App: React.FunctionComponent = (): React.ReactElement => {
    // Mounting Smooth Scroll
    useEffect(() => {
        const lenis: Lenis = new Lenis()

        lenis.on('scroll', ScrollTrigger.update)

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)

        return (): void => {
        };
    }, []);
    return (
        // Globals CSS Properties
        <main className="relative bg-violet-950 flex overflow-clip text-white flex-col min-h-screen max-w-screen ">
            <Routing/>
            <Navbar/>
        </main>
    );

};
const rootContainer: HTMLElement = document.getElementById("root") as HTMLElement;

if (!rootContainer) {
    throw new Error("Root container not found");
}
const root: Root = createRoot(rootContainer);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </Provider>
    </React.StrictMode>
);