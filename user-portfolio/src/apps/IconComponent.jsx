import { useEffect, useState, useRef } from "react";
import { WindowComponent } from "./WindowComponent";
import { createPortal } from "react-dom";
import { Rnd } from "react-rnd";
import { AnimatePresence, motion } from "motion/react";
import { IconFun } from "../apps/IconFun";
import { ZIndexShuffler } from "../providers/ZIndexShuffler";
import { WindowCreationLogic } from "./WindowCreationLogic";

export const IconComponent = ({AppIcon, Title, appId, appContent}) => {
    console.log("IconComponent rendered");

    const isDragging = IconFun(s => s.appStates[appId]?.isDragging || false);

    return (
        <>
            <div className={`flex flex-col items-center justify-center h-[60px] w-[75px] p-1 rounded-md ${isDragging ? '' : 'hover:bg-foreground-highlight'}`}>
                <div className="flex w-full h-full cursor-pointer items-center justify-center">
                    {AppIcon}
                </div>  
                <p className="text-center text-xs text-accent-text cursor-pointer">{Title}</p>
            </div>
            <WindowCreationLogic
                AppIcon={AppIcon}
                Title={Title}
                appId={appId}
                appContent={appContent}
            />
        </>
    )
};