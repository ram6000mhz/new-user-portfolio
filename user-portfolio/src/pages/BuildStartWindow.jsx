import {StartComponent} from "../components/StartComponent"
import { useState } from "preact/hooks";
import { Monitor } from "lucide-preact";
import { createPortal } from "preact/compat";
import { useRef } from "preact/hooks";
export const BuildStartWindow = ()=>{
    const [isVisible, setIsVisible] = useState(false);
    const [isRendered, setIsRendered] = useState(false);
    const monitorRef = useRef(null);

    const handleToggle = () => {
        if (!isVisible) {
            setIsRendered(true);
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }

    const handleAnimationEnd = () => {
        if (!isVisible) setIsRendered(false);
    };

    return(
        <>
            <div ref={monitorRef} className="flex justify-center items-center 
                h-[35px] w-[35px] bg-foreground relative"
            >
                <div className="flex justify-center items-center rounded w-full h-full hover:bg-foreground-highlight cursor-pointer"
                    onClick={handleToggle}
                >
                    <Monitor className="text-accent-icon transition-all duration-100 active:scale-80"/>
                </div>
            </div>
            {isRendered && createPortal(
                <div
                    onAnimationEnd={handleAnimationEnd}
                    onClick={(e) => e.stopPropagation()}
                    className={`h-auto w-[clamp(180px,25vw,400px)]
                    bottom-[55px] left-0 rounded-lg bg-background 
                    overflow-hidden border border-muted-border absolute
                    ${isVisible ? "animate-window-in" : "animate-window-out"}`}      
                >
                    <StartComponent/>
                </div>
            ,monitorRef.current)}
        </>
    )
}