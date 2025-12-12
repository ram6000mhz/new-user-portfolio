import { useEffect, useState, useRef } from "react";
import { WindowComponent } from "./WindowComponent";
import { createPortal } from "react-dom";
import { Rnd } from "react-rnd";
import { useIconComponent } from "./IconFun";
import { useZIndexShuffler } from "../providers/ZIndexShuffler";
import { AnimatePresence, motion } from "motion/react";

export const IconComponent2 = ({AppIcon, Title, appContent, isDragging, appIndex}) => {
    console.log("IconComponent rendered");

    const isOpen = useIconComponent(
        ctx => ctx.getAppState(appIndex).isOpen
    );

    const isFullscreen = useIconComponent(
        ctx => ctx.getAppState(appIndex).isFullscreen
    )
    const handleClick = useIconComponent(ctx => ctx.handleClick);
    const killProcess = useIconComponent(ctx => ctx.killProcess);
    const WindowMode = useIconComponent(ctx => ctx.WindowMode);
    const MinimizeMode = useIconComponent(ctx => ctx.MinimizeMode);

    const { zMap, bringToFront } = useZIndexShuffler();

    return (
        <>
            <div className={`flex flex-col items-center justify-center h-[60px] w-[75px] p-1 rounded-md ${isDragging ? '' : 'hover:bg-foreground-highlight'}`}>
                <div className="flex w-full h-full cursor-pointer items-center justify-center" onDoubleClick={()=>handleClick(appIndex)} onTouchEnd={(e)=>{e.preventDefault();handleClick(appIndex);}}>
                    {AppIcon}
                </div>  
                <p className="text-center text-xs text-accent-text cursor-pointer">{Title}</p>
            </div>
            <AnimatePresence>
                {isOpen && createPortal(
                    <>
                        <Rnd
                            cancel=".deadzone"
                            minWidth={180}
                            minHeight={200}
                            bounds="window"
                            enableResizing={isFullscreen ? false : true}
                            disableDragging={isFullscreen ? true : false}
                            onDragStart={() =>bringToFront(appIndex)}
                            style={{zIndex: zMap[appIndex] || 0}}
                        >
                            <motion.div
                                initial={
                                    { opacity: 0, scale: 0.8}
                                }
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0}}
                                transition={{ duration: 0.2 }}
                                className={`w-full h-full overflow-hidden bg-background border-2 
                                border-muted-border flex items-center justify-center
                                ${isFullscreen ? 'rounded-none' : 'rounded-xl'}
                                `}
                            >
                                <WindowComponent
                                    title={Title}
                                    isFullscreen={isFullscreen}
                                    terminationcallback={() => killProcess(appIndex)}
                                    windowcallback={() => { 
                                            WindowMode(appIndex);                                                                                    }
                                    }
                                    minimizecallback={() =>{
                                            MinimizeMode(appIndex)
                                        }
                                    }
                                    appIndex={appIndex}
                                    content={appContent}
                                />
                            </motion.div>
                        </Rnd>
                    </>,
                    document.body
                )}
            </AnimatePresence>
        </>
    )
};