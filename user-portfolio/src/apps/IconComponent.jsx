import { useState } from "react";
import { WindowComponent } from "../components/WindowComponent";
import { createPortal } from "react-dom";
import { Rnd } from "react-rnd";
import { IconComponentProvider } from "./IconFun";
import { useZIndexShuffler } from "../providers/ZIndexShuffler";

export const IconComponent = ({Children, Title, appContent, isDragging, appIndex}) => {

    const {getAppState, handleClick, killProcess, WindowMode, MinimizeMode} = IconComponentProvider();

    const { isOpen, isFullscreen, isWindowed } = getAppState(appIndex);

    const { zMap, bringToFront } = useZIndexShuffler();

    return (
        <>
            <div className={`flex flex-col items-center justify-center h-[60px] w-[75px] p-1 rounded-md ${isDragging ? '' : 'hover:bg-foreground-highlight'}`}>
                <div className="flex w-full h-full cursor-pointer items-center justify-center" onDoubleClick={()=>handleClick(appIndex)} onTouchEnd={(e)=>{e.preventDefault();handleClick(appIndex);}}>
                    {Children}
                </div>  
                <p className="text-center text-xs text-accent-text cursor-pointer">{Title}</p>
            </div>
            {isOpen && createPortal(
                <>
                    {isFullscreen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-background h-screen w-screen" onClick={()=>{bringToFront(appIndex)}} style={{zIndex: zMap[appIndex] || 0}}>
                            <WindowComponent 
                                title={Title}
                                isFullscreen={isFullscreen}
                                terminationcallback={() => killProcess(appIndex)}
                                windowcallback={() => WindowMode(appIndex)}
                                minimizecallback={() => MinimizeMode(appIndex)}
                                appIndex={appIndex}
                                content={appContent}
                            />
                        </div>
                    )}
                    {isWindowed &&(
                        <Rnd 
                            default={{
                                x: (window.innerWidth - 300) / 2,
                                y: (window.innerHeight - 200) / 2,
                                width: 300,
                                height: 200,
                            }}
                            minWidth={200}
                            minHeight={100}
                            bounds="window"
                            enableResizing={true}
                            onDragStart={()=>{
                                bringToFront(appIndex);
                            }}
                            style={{zIndex: zMap[appIndex] || 0}}
                        >
                            <div className="fixed inset-0 flex items-center justify-center overflow-hidden rounded-xl bg-background border-2 border-muted-border h-full w-full">
                                <WindowComponent 
                                    title={Title}
                                    isFullscreen={isFullscreen}
                                    terminationcallback={() => killProcess(appIndex)}
                                    windowcallback={() => WindowMode(appIndex)}
                                    minimizecallback={() => MinimizeMode(appIndex)}
                                    appIndex={appIndex}
                                    content={appContent}
                                />
                            </div>
                        </Rnd>
                    )}
                </>,
                document.body
            )}
        </>
    )
};