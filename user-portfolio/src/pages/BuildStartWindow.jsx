import {StartComponent} from "../components/StartComponent"
import { useState } from "preact/hooks";
import { Monitor } from "lucide-preact";
import { createPortal } from "preact/compat";
import { useRef } from "preact/hooks";
export const BuildStartWindow = ()=>{
    const [isVisible, setIsVisible] = useState(false);
    const monitorRef = useRef(null);
    return(
        <div className="relative">
            <div ref={monitorRef} className="flex justify-center items-center 
                h-[35px] w-[35px] bg-foreground hover:bg-foreground-highlight rounded cursor-pointer"
                onClick={(e) => {
                    setIsVisible(!isVisible);
                }}
            >
                <Monitor className="text-accent-icon"/>
            </div>
            {isVisible && createPortal(
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`h-auto w-[180px] sm:w-[230px] 
                    md:w-[260px] transition-all duration-300 ease-in-out 
                    absolute bottom-[55px] left-0 rounded-lg bg-background 
                    overflow-hidden border border-muted-border 
                    ${isVisible ? 'animate-rise-up' : 'animate-go-down'}`}
                    onAnimationEnd={() => {
                    if (!isVisible) setIsVisible(false);
                    }}
                >
                    <StartComponent/>
                </div>
            ,monitorRef.current)}
        </div>
    )
}