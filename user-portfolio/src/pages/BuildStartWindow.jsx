import {StartComponent} from "../components/StartComponent"
import { useState } from "react";
import { Monitor } from "lucide-react";
export const BuildStartWindow = ()=>{
    const [isVisible, setIsVisible] = useState(false);

    return(
        <div className="relative">
            <div className="flex justify-center items-center 
                h-[35px] w-[35px] bg-foreground hover:bg-foreground-highlight rounded cursor-pointer"
                onClick={() => setIsVisible(!isVisible)}
            >
                <Monitor className="text-accent-icon"/>
            </div>
            {isVisible && (
                <div
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
            )}
        </div>
    )
}