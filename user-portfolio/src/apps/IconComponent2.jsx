import { useEffect, useState, useRef } from "react";
import { WindowComponent } from "./WindowComponent";
import { createPortal } from "react-dom";
import { Rnd } from "react-rnd";
import { useZIndexShuffler } from "../providers/ZIndexShuffler";
import { AnimatePresence, motion } from "motion/react";
import { useIconStore } from "../apps/IconFun";

export const IconComponent2 = ({AppIcon, Title, appContent, isDragging, appIndex}) => {
    console.log("IconComponent rendered");
    const isOpen = useIconStore(
        s => s.appStates[appIndex]?.isOpen ?? false
    );
    const isFullscreen = useIconStore(
        s => s.appStates[appIndex]?.isFullscreen ?? false
    );

    const handleClick = useIconStore(s => s.handleClick);
    const killProcess = useIconStore(s => s.killProcess);
    const WindowMode = useIconStore(s => s.WindowMode);
    const MinimizeMode = useIconStore(s => s.MinimizeMode);

    const { zMap, bringToFront } = useZIndexShuffler();

    return (
        <>
            <div className={`flex flex-col items-center justify-center h-[60px] w-[75px] p-1 rounded-md ${isDragging ? '' : 'hover:bg-foreground-highlight'}`}>
                <div className="flex w-full h-full cursor-pointer items-center justify-center">
                    {AppIcon}
                </div>  
                <p className="text-center text-xs text-accent-text cursor-pointer">{Title}</p>
            </div>
        </>
    )
};