import { useState } from "preact/hooks";
import {ViewHandler} from "../providers/ViewHandler"
import {Power , RotateCcw} from "lucide-preact";
import { createPortal } from "preact/compat";
import { useRef } from "preact/hooks";
export const BuildPowerControls = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleHrMode = ViewHandler((state) => state.toggleHrMode);
    const [isRendered, setIsRendered] = useState(false);
    const powerRef = useRef(null);

    const handleToggle = () => {
        if (!isMenuOpen) {
            setIsRendered(true);
            setIsMenuOpen(true);
        } else {
            setIsMenuOpen(false);
        }
    }

    const handleAnimationEnd = () => {
        if (!isMenuOpen) setIsRendered(false);
    };


    return(
        <>
            <div ref={powerRef} className="w-[35px] h-[35px] relative flex items-center justify-center">
                <div onClick={handleToggle} 
                className="w-full h-full hover:bg-foreground-highlight flex 
                items-center justify-center rounded-sm cursor-pointer p-0.5
                ">
                    <Power size={20} className="text-accent-icon"/>
                </div>
            </div>
            {isRendered && createPortal(
                <div
                    onAnimationEnd={handleAnimationEnd}
                    className={`h-auto flex flex-col
                    absolute bottom-full rounded-md bg-foreground
                    overflow-hidden border border-muted-border p-2 gap-1
                    mb-2.5 ${isMenuOpen ? "animate-window-in" : "animate-window-out"}`}
                >
                    <div onClick={toggleHrMode} className="flex flex-row items-center gap-1 px-1 hover:bg-foreground-highlight rounded-sm cursor-pointer">
                        <Power className="w-[15px]! h-[15px]! text-accent-icon"/>
                        <p className="text-[12px] text-white">Shutdown</p>
                    </div>
                    <div onClick={toggleHrMode} className="flex flex-row items-center gap-1 px-1 hover:bg-foreground-highlight rounded-sm cursor-pointer">
                        <RotateCcw className="w-[15px]! h-[15px]! text-accent-icon"/>
                        <p className="text-[12px] text-white">Restart</p>
                    </div>
                </div>
            ,powerRef.current)}
        </>
    )
}