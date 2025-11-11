import { useState } from "react";
import { WindowComponent } from "../components/WindowComponent";
import { createPortal } from "react-dom";
import { Rnd } from "react-rnd";

export const IconComponent = ({Children, Title, isDragging}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isWindowed, setIsWindowed] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const handleClick = () => {
        setIsFullscreen(true);
        setIsOpen(true);
    };

    const killProcess = () => {
        setIsOpen(false);
        setIsFullscreen(false);
        setIsWindowed(false);

    }

    const FullscreenMode = () => {
        setIsFullscreen(!isFullscreen);
        setIsWindowed(false);
    }

    const WindowMode = () => {
        setIsFullscreen(!isFullscreen);
        setIsWindowed(!isWindowed);
    }

    return (
        <>
            <div className={`flex flex-col items-center justify-center h-[60px] w-[75px] p-1 rounded-md ${isDragging ? '' : 'hover:bg-foreground-highlight'}`}>
                <div className="flex w-full h-full cursor-pointer items-center justify-center" onDoubleClick={handleClick}>
                    {Children}
                </div>  
                <p className="text-center text-xs text-accent-text cursor-pointer">{Title}</p>
            </div>
            {isOpen && createPortal(
                <>
                    {isFullscreen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background h-screen w-screen">
                            <WindowComponent 
                                title={Title}
                                terminationcallback={killProcess}
                                fullscreencallback={FullscreenMode}
                                windowcallback={WindowMode}
                            />
                        </div>
                    )}
                    {isWindowed &&(
                        <Rnd 
                            enableResizing={true}
                        >
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background border-2 border-muted-border h-[200px] w-[300px]">
                                <WindowComponent 
                                    title={Title}
                                    terminationcallback={killProcess}
                                    fullscreencallback={FullscreenMode}
                                    windowcallback={WindowMode}
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