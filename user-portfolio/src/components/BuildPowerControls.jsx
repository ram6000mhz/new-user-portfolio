import { useState } from "preact/hooks";
import {ViewHandler} from "../providers/ViewHandler"
import {Power , RotateCcw} from "lucide-preact";
import { createPortal } from "preact/compat";
import { useRef, useLayoutEffect } from "preact/hooks";

export const BuildPowerControls = ({startRef}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleHrMode = ViewHandler((state) => state.toggleHrMode);
    const [isRendered, setIsRendered] = useState(false);
    const powerRef = useRef(null);
    const [coords, setCoords] = useState({ left: 0 });
    const menuRef = useRef(null);

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

    useLayoutEffect(() => {
        if (!isRendered || !powerRef.current || !startRef.current || !menuRef.current) return;

        let frameId;

        const updatePosition = () => {
            const btn = powerRef.current.getBoundingClientRect();
            const container = startRef.current.getBoundingClientRect();
            const menu = menuRef.current.getBoundingClientRect();
            let idealLeft = (btn.left + btn.width / 2) - (menu.width / 2);
            if (idealLeft < container.left) {
                idealLeft = container.left;
            } else if (idealLeft + menu.width > container.right) {
                idealLeft = container.right - menu.width;
            }

            const finalOffset = idealLeft - btn.left;
            
            setCoords(prev => Math.abs(prev.left - finalOffset) > 0.1 ? { left: finalOffset } : prev);
            frameId = requestAnimationFrame(updatePosition);
        };

        frameId = requestAnimationFrame(updatePosition);

        return () => cancelAnimationFrame(frameId);
    }, [isRendered, isMenuOpen]);
    return(
        <>
            <div ref={powerRef} className="w-[35px] h-[35px] relative flex items-center justify-center">
                <div onClick={handleToggle} 
                className="w-full h-full hover:bg-foreground-highlight flex 
                items-center justify-center rounded-sm cursor-pointer p-0.5
                ">
                    <Power size={20} className="text-accent-icon transition-all duration-100 active:scale-80"/>
                </div>
            </div>
            {isRendered && createPortal(
                <div
                    ref={menuRef}
                    style={{ left: `${coords.left}px`}}
                    onAnimationEnd={handleAnimationEnd}
                    className={`h-auto flex flex-col
                    absolute bottom-full rounded-md bg-foreground
                    overflow-hidden border border-muted-border p-2 gap-1
                    mb-2.5 ${isMenuOpen ? "animate-window-in" : "animate-window-out"}`}
                >
                    <div onClick={toggleHrMode} className="flex flex-row items-center gap-1 px-1 hover:bg-foreground-highlight rounded-sm cursor-pointer transition-all duration-100 active:scale-90">
                        <Power className="w-[15px]! h-[15px]! text-accent-icon"/>
                        <p className="text-[12px] text-white">Shutdown</p>
                    </div>
                    <div onClick={toggleHrMode} className="flex flex-row items-center gap-1 px-1 hover:bg-foreground-highlight rounded-sm cursor-pointer transition-all duration-100 active:scale-90">
                        <RotateCcw className="w-[15px]! h-[15px]! text-accent-icon"/>
                        <p className="text-[12px] text-white">Restart</p>
                    </div>
                </div>
            ,powerRef.current)}
        </>
    )
}