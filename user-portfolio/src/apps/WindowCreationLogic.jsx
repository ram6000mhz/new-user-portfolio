import { useEffect, useRef } from "react";
import { WindowComponent } from "./WindowComponent";
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

    const animateToRef = (target) => {
        if (!rndRef.current) return;
        const start = {
            width: rndRef.current.getSelfElement().offsetWidth,
            height: rndRef.current.getSelfElement().offsetHeight,
            x: rndRef.current.draggable.state.x,
            y: rndRef.current.draggable.state.y
        };
        const duration = 150;
        const startTime = performance.now();
        const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3); 
            const lerp = (a, b) => a + (b - a) * ease;
            rndRef.current.updateSize({
                width: lerp(start.width, target.width),
                height: lerp(start.height, target.height)
            });
            rndRef.current.updatePosition({
                x: lerp(start.x, target.x),
                y: lerp(start.y, target.y)
            });
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    };

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
            
    return(
        <AnimatePresence>
            <Rnd
                cancel=".deadzone"
                ref={rndRef}
                default={isFullscreen ? fullscreenPreset : windowedPreset}
                minWidth={180}
                minHeight={200}
                bounds="parent"
                dragHandleClassName="window-header"
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
        </AnimatePresence>
    )
}