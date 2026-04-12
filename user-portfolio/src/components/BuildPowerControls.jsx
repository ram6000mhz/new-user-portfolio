import { useState } from "preact/hooks";
import {ViewHandler} from "../providers/ViewHandler"
import {Power , RotateCcw} from "lucide-preact";
import { createPortal } from "preact/compat";
import { useRef } from "preact/hooks";
export const BuildPowerControls = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleHrMode = ViewHandler((state) => state.toggleHrMode);
    const powerRef = useRef(null);
    console.log("hi")
    return(
        <div>
            <div ref={powerRef} onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-[25px] h-[25px] p-1 hover:bg-foreground-highlight flex items-center justify-center rounded-2xl cursor-pointer relative">
                <Power className="!w-[20px] !h-[20px] text-accent-icon"/>
            </div>
            {isMenuOpen && createPortal(
                <div
                    className={`h-auto flex flex-col
                    absolute bottom-full rounded-lg bg-foreground
                    overflow-hidden border border-muted-border `}
                >
                    <div onClick={toggleHrMode} className="flex flex-row w-full h-full items-center">
                        <Power className="!w-[15px] !h-[15px] text-accent-icon"/>
                        <p className="text-xs text-white">Shutdown</p>
                    </div>
                    <div onClick={toggleHrMode} className="flex flex-row w-full h-full items-center">
                        <RotateCcw className="!w-[15px] !h-[15px] text-accent-icon"/>
                        <p className="text-xs text-white">Restart</p>
                    </div>
                </div>
            ,powerRef.current)}
        </div>
    )
}