import { useEffect, useState } from "react";
import { WindowComponent } from "../components/WindowComponent";
import { createPortal } from "react-dom";
import { Rnd } from "react-rnd";
import { IconComponentProvider } from "./IconFun";
import { useZIndexShuffler } from "../providers/ZIndexShuffler";
import { AnimatePresence, motion } from "motion/react";

export const IconComponent = ({Children, Title, appContent, isDragging, appIndex}) => {

    const {getAppState, handleClick, killProcess, WindowMode, MinimizeMode, wasFullscreen} = IconComponentProvider();

    const { isOpen, isFullscreen, isWindowed } = getAppState(appIndex);

    const { zMap, bringToFront } = useZIndexShuffler();

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

    useEffect(() => {
        setRndPreset(isFullscreen ? (fullscreenPreset) : (windowedPreset));
        console.log("Preset updated");

    } ,[isFullscreen]);

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
                        <Rnd
                            cancel=".deadzone"
                            size = {{width: rndPreset.width, height: rndPreset.height}}
                            position = {{x: rndPreset.x, y: rndPreset.y}}
                            minWidth={180}
                            minHeight={200}
                            bounds="window"
                            enableResizing={isFullscreen ? false : true}
                            disableDragging={isFullscreen ? true : false}
                            onDragStart={() => bringToFront(appIndex)}
                            onDragStop={(e, d) => setRndPreset(p => ({...p, x: d.x, y: d.y}))}
                            onResizeStop={(e, dir, ref, delta, pos) =>
                                setRndPreset({
                                    width: ref.offsetWidth,
                                    height: ref.offsetHeight,
                                    x: pos.x,
                                    y: pos.y
                                })
                            }
                            style={{zIndex: zMap[appIndex] || 0}}
                        >
                            <motion.div
                                initial={wasFullscreen.current?({ opacity: 0, scale: 1.2 }):{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0}}
                                transition={{ duration: 0.15 }}
                                className={`w-full h-full overflow-hidden bg-background border-2 
                                border-muted-border flex items-center justify-center
                                ${isFullscreen ? 'rounded-none' : 'rounded-xl'}
                                `}
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
                    </>,
                    document.body
                )}
            </AnimatePresence>
        </>
    )
};