import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import {BackgroundGradientAnimationDemo} from "@/Pages/GradientPage.tsx";
import EmployeesTab from "@/Tabs/EmployeesTab.tsx";

gsap.registerPlugin(ScrollTrigger);

const Name = () => {
    const NameRef = useRef(null);
    const XRef = useRef(null);
    const SprintRef = useRef(null);

    useEffect(() => {
        const Name = NameRef.current;
        const X = XRef.current;
        const Sprint = SprintRef.current;

        gsap.timeline({
            scrollTrigger: {
                trigger: Name,
                start: 'top center', // Adjust the start position as needed
                end: 'bottom center', // Adjust the end position as needed
                scrub: true,
                pin: true,
                // markers: true // For debugging, you can remove this in production
            }
        })
            .to(Name, {
                opacity: 1,
                y: 0,
            });

        gsap.timeline({
            scrollTrigger: {
                trigger: X,
                start: 'top center', // Adjust the start position as needed
                end: 'bottom center', // Adjust the end position as needed
                scrub: true,
                pin: true,
                // markers: true // For debugging, you can remove this in production
            }
        })
            .to(X, {
                opacity: 1,
                x: '-50vw',
            });

        gsap.timeline({
            scrollTrigger: {
                trigger: Sprint,
                start: 'top center', // Adjust the start position as needed
                end: 'bottom center', // Adjust the end position as needed
                scrub: true,
                pin: true,
                // markers: true // For debugging, you can remove this in production
            }
        })
            .to(Sprint, {
                opacity: 1,
                x: '50vw',
            });

    }, []);

    return (
        <div className="relative black flex bg-black h-screen w-screen items-center justify-center">
            {/*<div ref={XRef} className="bg-black w-screen h-screen"></div>*/}
            {/*<div ref={SprintRef} className="bg-black w-screen h-screen"></div>*/}
            {/*<span ref={NameRef} className="font-teko font-black text-center z-12 flex flex-col text-white text-6xl md:text-9xl opacity-0" style={{ transition: 'opacity 1s' }}>*/}
            {/*    SprintV*/}
            {/*</span>*/}
            {/*<BackgroundGradientAnimationDemo/>*/}
        </div>
    );
};

export default Name;
