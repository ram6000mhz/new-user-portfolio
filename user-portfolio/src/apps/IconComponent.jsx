import { useState } from "react";
import { WindowComponent } from "../components/WindowComponent";
import { createPortal } from "react-dom";
import { Rnd } from "react-rnd";
import { useTaskman } from "../taskman/taskman";

export const IconComponent = ({Children, Title, isDragging, appIndex}) => {
    const { taskman, addTask, TerminateProcess} = useTaskman();
    const [isOpen, setIsOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isWindowed, setIsWindowed] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const handleClick = () => {
        setIsFullscreen(true);
        setIsOpen(true);
        addTask(appIndex);
        console.log(taskman);
    };

    const killProcess = () => {
        setIsOpen(false);
        setIsFullscreen(false);
        setIsWindowed(false);
        TerminateProcess(appIndex);
    }

    const WindowMode = () => {
        setIsFullscreen(!isFullscreen);
        setIsWindowed(!isWindowed);
    }

    const MinimizeMode = () => {
        console.log("Minimize");
        setIsOpen(!isOpen);
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
                                isFullscreen={isFullscreen}
                                terminationcallback={killProcess}
                                windowcallback={WindowMode}
                                minimizecallback={MinimizeMode}
                                appIndex={appIndex}
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
                        >
                            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden rounded-xl bg-background border-2 border-muted-border h-full w-full">
                                <WindowComponent 
                                    title={Title}
                                    isFullscreen={isFullscreen}
                                    terminationcallback={killProcess}
                                    windowcallback={WindowMode}
                                    minimizecallback={MinimizeMode}
                                    appIndex={appIndex}
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