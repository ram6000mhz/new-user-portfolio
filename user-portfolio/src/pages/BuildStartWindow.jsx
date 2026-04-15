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
                    className={`h-auto w-[clamp(180px,25vw,500px)] transition-all
                    duration-300 ease-in-out absolute bottom-[55px] left-0 rounded-lg bg-background 
                    overflow-hidden border border-muted-border`}
                >
                    <StartComponent/>
                </div>
            ,monitorRef.current)}
        </div>
    )
}