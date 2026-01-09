import { useEffect, useRef } from "react";
import { WindowComponent } from "./WindowComponent";
import { createPortal } from "react-dom";
import { Rnd } from "react-rnd";
import { AnimatePresence, motion, scale } from "motion/react";
import { IconFun } from "../apps/IconFun";
import { ZIndexShuffler } from "../providers/ZIndexShuffler";

export const WindowCreationLogic = ({AppIcon, Title, appId, appContent, viewportRef}) =>{
    console.log("render window creation logic")
    const { bringToFront } = ZIndexShuffler.getState();
    const isOpen = IconFun(s => s.appStates[appId]?.isOpen || false);
    const isFullscreen = IconFun(s => s.appStates[appId]?.isFullscreen || false);
    const isWindowed = IconFun(s => s.appStates[appId]?.isWindowed || false);
    const isMinimized = (s => s.appStates[appId]?.isMinimized || false);
    const wasFullscreen = IconFun(s => s.appStates[appId]?.wasFullscreen || false);
    const wasWindowed = IconFun(s => s.appStates[appId]?.wasWindowed || false);
    const wasMinimized = IconFun(s => s.appStates[appId]?.wasMinimized || false);
    const zIndex = ZIndexShuffler(state => state.zMap[appId]);
    const { kill, toggleWindow, toggleMinimize } = IconFun.getState();

    const startPos = useRef({ x: 0, y: 0 });
    const isDragThresholdMet = useRef(false); 
    const DRAG_THRESHOLD = 2;

    // const getBoundsRect = () => {
    //     if (viewportRef.current) {
    //         return viewportRef.current.getBoundingClientRect();
    //     }
    //     return { width: window.innerWidth, height: window.innerHeight, left: 0, top: 0 };
    // };

    // const bounds = getBoundsRect();

    const fullscreenPreset = {
        width: "100%",
        height: "100%",
        x: 0,
        y: 0
    };

     const windowedPreset = {
        width: window.innerWidth * 0.85,
        height: window.innerHeight * 0.75,
        x: (window.innerWidth - window.innerWidth * 0.85) / 2,
        y: (window.innerHeight - window.innerHeight * 0.75) / 2
    }; 

    const transitions = {
        'none_fullscreen': { initial: { scale: 0.1, opacity: 0 }, animate: { scale: 1, opacity: 1 } },
        'fullscreen_windowed': { initial: { scale: 1.2, opacity: 1 }, animate: { scale: 1, opacity: 1 } },
        'windowed_fullscreen': { initial: { scale: 0.8, opacity: 1 }, animate: { scale: 1, opacity: 1 } },
        'windowed_minimized': { initial: { scale: 1, opacity: 1 }, animate: { scale: 0.8, opacity: 0 } },
        'fullscreen_minimized': { initial: { scale: 1, opacity: 1 }, animate: { scale: 0, opacity: 0 } },
    };

    const rndRef = useRef(null);

    const getWindowMotion = () => {
        const prevState = wasFullscreen ? 'fullscreen' : wasWindowed ? 'windowed' : wasMinimized ? 'minimized' : 'none';
        const currState = isFullscreen ? 'fullscreen' : isWindowed ? 'windowed' : isMinimized ? 'minimized' : 'none';
        if (wasMinimized) {
            return { initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 1 } };
        }

        return transitions[`${prevState}_${currState}`] || { initial: { scale: 1, opacity: 1 }, animate: { scale: 1, opacity: 1 } };
    };

    const { initial, animate } = getWindowMotion();

    useEffect(() => {
        if (isOpen) {
            if (isFullscreen) {
                rndRef.current.updateSize({ 
                width: fullscreenPreset.width, 
                height: fullscreenPreset.height 
                });
                rndRef.current.updatePosition({ 
                x: fullscreenPreset.x, 
                y: fullscreenPreset.y 
                });
            } else {
                rndRef.current.updateSize({ 
                width: windowedPreset.width, 
                height: windowedPreset.height 
                });
                rndRef.current.updatePosition({ 
                x: windowedPreset.x, 
                y: windowedPreset.y 
                });
            }
        }
    }, [isFullscreen, isOpen]);

    // useEffect(() => {
    //     if (!viewportRef.current || !isOpen) return;
    //     const resizeObserver = new ResizeObserver((entries) => {
    //         for (let entry of entries) {
    //             const { width, height } = entry.contentRect;

    //             if (isFullscreen && rndRef.current) {
    //                 rndRef.current.updateSize({ width, height });
    //                 rndRef.current.updatePosition({ x: 0, y: 0 });
    //             }
    //         }
    //     });

    //     resizeObserver.observe(viewportRef.current);
    //     return () => resizeObserver.disconnect();
    // }, [isOpen, isFullscreen]);
            
    return(
        <AnimatePresence>
            {isOpen && createPortal(
                <>
                    <Rnd
                        cancel=".deadzone"
                        ref={rndRef}
                        default={isFullscreen ? fullscreenPreset : windowedPreset}
                        minWidth={180}
                        minHeight={200}
                        bounds="parent"
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
                            key={isFullscreen ? 'fs' : isWindowed ? 'wd' : 'min'}
                            initial={initial}
                            animate={animate}
                            exit={
                                {scale:0, opacity:0}
                            }
                            transition={{ duration: 0.1 }}
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
                viewportRef.current
            )}
        </AnimatePresence>
    )
}