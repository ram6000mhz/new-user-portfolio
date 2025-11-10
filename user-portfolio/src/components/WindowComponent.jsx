import {X, Square, Minimize2} from "lucide-react";
export const WindowComponent=({title, children, onClose, onFullscreen, onWindow, onMinimize})=>{
    const Terminate=()=>{
        onClose(false);
    }

    const Fullscreen=()=>{
        console.log("fullscreen");
        onFullscreen(true);
    }

    const Window=()=>{
        console.log("windowed");
        onFullscreen(false);
        onWindow(true);
    }
    return(
        <div className="w-full h-full bg-background border border-muted-border flex flex-col">
            <div className="flex flex-row items-center justify-center bg-foreground w-full h-[40px] p-2 gap-2">
                <h1>    
                    {title}
                </h1>
                <div className="grow"/>
                <div>
                    <Minimize2/>
                </div>
                <div className="cursor-pointer flex items-center justify-center hover:bg-foreground-highlight rounded h-full w-[30px]" onClick={Window}>
                    <Square/>
                </div>
                <div className="cursor-pointer flex items-center justify-center hover:bg-red-300 rounded h-full w-[30px]" onClick={Terminate}>
                    <X/>
                </div>
            </div>
            {children}
        </div>
    )
}