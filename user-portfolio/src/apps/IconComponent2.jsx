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

    const [rndPreset, setRndPreset] = useState(isDragging ? (fullscreenPreset) : (windowedPreset));

    const animateTo = (target) => {
        const start = rndPreset
        const dur = 50
        const t0 = performance.now()

        const step = (now) => {
            const k = Math.min((now - t0) / dur, 1)
            const lerp = (a,b)=>a+(b-a)*k

            setRndPreset({
                width:  lerp(start.width,  target.width),
                height: lerp(start.height, target.height),
                x:      lerp(start.x,      target.x),
                y:      lerp(start.y,      target.y)
            })

            if (k < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }

    const handleResize = () => {
        setRndPreset((prev) => {
            let newWidth = prev.width;
            let newHeight = prev.height;
            let newX = prev.x;
            let newY = prev.y;

            if (isFullscreen) {
                newWidth = window.innerWidth;
                newHeight = window.innerHeight;
                newX = 0;
                newY = 0;
            } else {
                newWidth = Math.min(prev.width, window.innerWidth);
                newHeight = Math.min(prev.height, window.innerHeight);

                if (newX + newWidth > window.innerWidth) {
                    newX = Math.max(0, window.innerWidth - newWidth);
                }
                if (newY + newHeight > window.innerHeight) {
                    newY = Math.max(0, window.innerHeight - newHeight);
                }
            }

            if (
                newWidth !== prev.width ||
                newHeight !== prev.height ||
                newX !== prev.x ||
                newY !== prev.y
            ) {
                return {
                    width: newWidth,
                    height: newHeight,
                    x: newX,
                    y: newY
                };
            }

            return prev;
        });
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isFullscreen]);

    useEffect(() => {
        animateTo(isFullscreen ? (fullscreenPreset) : (windowedPreset));
    },[isFullscreen]);


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
                            size = {{width: rndPreset.width, height: rndPreset.height}}
                            position = {{x: rndPreset.x, y: rndPreset.y}}
                            minWidth={180}
                            minHeight={200}
                            bounds="window"
                            enableResizing={isFullscreen ? false : true}
                            disableDragging={isFullscreen ? true : false}
                            onDragStart={() =>{
                                console.log("Dragging started for appId:", appId);
                                bringToFront(appId)}}
                            onDragStop={(e, d) => {
                                    setRndPreset(prev => ({ ...prev, x: d.x, y: d.y }));
                                }
                            }
                            onResizeStop={(e, dir, ref, delta, pos) => {
                                const next = {
                                    width: ref.offsetWidth,
                                    height: ref.offsetHeight,
                                    x: pos.x,
                                    y: pos.y
                                };
                                setRndPreset(next);
                            }}
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