'use client'
import React, {useEffect} from "react";
import Lenis from '@studio-freight/lenis'
import gsap from "gsap";
import Banner from "@/Containers/Banner";

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
    return (<>

            <Banner/>
        </>
    );
}
