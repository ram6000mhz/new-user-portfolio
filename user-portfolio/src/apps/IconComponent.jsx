import { WindowCreationLogic } from "./WindowCreationLogic";
import { IconFun } from "./IconFun";
import { createPortal } from "react-dom";
import { AnimatePresence } from "motion/react";
export const IconComponent = ({AppIcon, Title, appId, appContent, viewportRef}) => {
    const isDragging = IconFun(s => s.appStates[appId]?.isDragging || false);
    const isOpen = IconFun(s => s.appStates[appId]?.isOpen || false);

    return (
        <>
            <div className={`flex flex-col items-center justify-center h-[60px] w-[75px] p-1 rounded-md ${isDragging ? '' : 'hover:bg-foreground-highlight'}`}>
                <div className="flex w-full h-full cursor-pointer items-center justify-center">
                    {AppIcon}
                </div>  
                <p className="text-center text-xs text-accent-text cursor-pointer">{Title}</p>
            </div>
            <AnimatePresence>
                {isOpen && createPortal(
                    <WindowCreationLogic
                        AppIcon={AppIcon}
                        Title={Title}
                        appId={appId}
                        appContent={appContent}
                        viewportRef={viewportRef}
                    />
                ,viewportRef.current)}
            </AnimatePresence>
        </>
    )
};