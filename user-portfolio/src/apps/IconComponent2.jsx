import { useEffect, useState, useRef } from "react";
import { WindowComponent } from "./WindowComponent";
import { createPortal } from "react-dom";
import { Rnd } from "react-rnd";
import { AnimatePresence, motion } from "motion/react";
import { IconFun } from "../apps/IconFun";
import { ZIndexShuffler } from "../providers/ZIndexShuffler";
import { shallow } from "zustand/shallow";

export const IconComponent2 = ({AppIcon, Title, appId, appContent}) => {
    console.log("IconComponent rendered");

    const { bringToFront } = ZIndexShuffler.getState();
    const isDragging = IconFun(s => s.appStates[appId]?.isDragging || false);
    const isOpen = IconFun(s => s.appStates[appId]?.isOpen || false);
    const isFullscreen = IconFun(s => s.appStates[appId]?.isFullscreen || false);
    const zIndex = ZIndexShuffler(s => s.zMap[appId] || 0);
    const { kill, toggleWindow, toggleMinimize } = IconFun.getState();

    const startPos = useRef({ x: 0, y: 0 });
    const isDragThresholdMet = useRef(false); 
    const DRAG_THRESHOLD = 2;

    const fullscreenPreset = {
        width: window.innerWidth,
        height: window.innerHeight,
        x: 0,
        y: 0
    };

    const windowedPreset = {
        width: window.innerWidth * 0.85,
        height: window.innerHeight * 0.75,
        x: (window.innerWidth - window.innerWidth * 0.85) / 2,
        y: (window.innerHeight - window.innerHeight * 0.75) / 2
    };

    const rndPreset = isFullscreen ? fullscreenPreset : windowedPreset;
    
    const rndRef = useRef(null);

    useEffect(() => {
        if (isOpen && rndRef.current) {
            rndRef.current.updateSize({ width: rndPreset.width, height: rndPreset.height });
            rndRef.current.updatePosition({ x: rndPreset.x, y: rndPreset.y });
        }
    }, [isFullscreen, isOpen]);

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
                    <>
                        <Rnd
                            cancel=".deadzone"
                            ref={rndRef}
                            default={{...windowedPreset}}
                            minWidth={180}
                            minHeight={200}
                            bounds="window"
                            enableResizing={isFullscreen ? false : true}
                            disableDragging={isFullscreen ? true : false}
                            
                            onDragStart={(e,data) => {
                                startPos.current = { x: data.x, y: data.y };
                                isDragThresholdMet.current = false;
                            }}

                            onDrag={(e, data) => {
                                if (isDragThresholdMet.current) return;
                                if (isDragThresholdMet.current) return;
                                const distance = Math.hypot(
                                    data.x - startPos.current.x, 
                                    data.y - startPos.current.y
                                );
                                if (distance > DRAG_THRESHOLD) {
                                    isDragThresholdMet.current = true;
                                    bringToFront(appId);
                                }
                            }}
                            className="w-full h-full"
                            style={{zIndex: zIndex}}
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
                                    terminationcallback={() => kill(appId)}
                                    windowcallback={() => {
                                            toggleWindow(appId);
                                        }
                                    }
                                    minimizecallback={() =>{
                                            toggleMinimize(appId)
                                        }
                                    }
                                    appId={appId}
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