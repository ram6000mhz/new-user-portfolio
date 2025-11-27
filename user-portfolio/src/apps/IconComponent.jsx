import { useState } from "react";
import { WindowComponent } from "../components/WindowComponent";
import { createPortal } from "react-dom";
import { Rnd } from "react-rnd";
import { IconComponentProvider } from "./IconFun";
import { useZIndexShuffler } from "../providers/ZIndexShuffler";
import { AnimatePresence, motion } from "motion/react";

export const IconComponent = ({Children, Title, appContent, isDragging, appIndex}) => {

    const {getAppState, handleClick, killProcess, WindowMode, MinimizeMode} = IconComponentProvider();

    const { isOpen, isFullscreen, isWindowed } = getAppState(appIndex);

    const { zMap, bringToFront } = useZIndexShuffler();

    const width = window.innerWidth * 0.85;
    const height = window.innerHeight * 0.75;
    const x = (window.innerWidth - width) 
    const y = (window.innerHeight - height) ;

    return (
        <>
            <div className={`flex flex-col items-center justify-center h-[60px] w-[75px] p-1 rounded-md ${isDragging ? '' : 'hover:bg-foreground-highlight'}`}>
                <div className="flex w-full h-full cursor-pointer items-center justify-center" onDoubleClick={()=>handleClick(appIndex)} onTouchEnd={(e)=>{e.preventDefault();handleClick(appIndex);}}>
                    {Children}
                </div>  
                <p className="text-center text-xs text-accent-text cursor-pointer">{Title}</p>
            </div>
            <AnimatePresence>
                {isOpen && createPortal(
                    <>
                        {isFullscreen && (
                            <motion.div
                                initial={{opacity:0.1, scale:0.1}}
                                animate={{opacity:1, scale:1}}
                                exit={{opacity:0.1, scale:0.1}}
                                transition={{duration:0.2}}
                                className="fixed inset-0 flex items-center justify-center bg-background h-screen w-screen" 
                                onClick={()=>{bringToFront(appIndex)}} 
                                style={{zIndex: zMap[appIndex] || 0}}
                            >
                                <WindowComponent 
                                    title={Title}
                                    isFullscreen={isFullscreen}
                                    terminationcallback={() => killProcess(appIndex)}
                                    windowcallback={() => WindowMode(appIndex)}
                                    minimizecallback={() => MinimizeMode(appIndex)}
                                    appIndex={appIndex}
                                    content={appContent}
                                />
                            </motion.div>
                        )}
                        {isWindowed &&(
                            <Rnd
                            cancel=".deadzone"
                            default={{
                                x,
                                y,
                                width,
                                height
                            }}
                            minWidth={180}
                            minHeight={200}
                            bounds="window"
                            enableResizing={true}
                            onDragStart={() => bringToFront(appIndex)}
                            style={{zIndex: zMap[appIndex] || 0}}
                            >
                            <motion.div
                                initial={{ opacity: 1, width: "100vw", height: "100vh"}}
                                animate={{ opacity: 1 , width: width, height: height }}
                                exit={{ opacity: 0.1, scale: 0.1 }}
                                transition={{ duration: 2 }}
                                className="overflow-hidden rounded-xl bg-background border-2 border-muted-border h-full w-full flex items-center justify-center"
                            >
                                <WindowComponent
                                title={Title}
                                isFullscreen={isFullscreen}
                                terminationcallback={() => killProcess(appIndex)}
                                windowcallback={() => WindowMode(appIndex)}
                                minimizecallback={() => MinimizeMode(appIndex)}
                                appIndex={appIndex}
                                content={appContent}
                                />
                            </motion.div>
                            </Rnd>
                        )}
                    </>,
                    document.body
                )}
            </AnimatePresence>
        </>
    )
};