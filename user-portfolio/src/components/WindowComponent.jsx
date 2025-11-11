import {X, Square, Minimize2} from "lucide-react";
export const WindowComponent=({title, children, terminationcallback,fullscreencallback, windowcallback})=>{
    const Terminate=()=>{
        terminationcallback();
    }
    const Window=()=>{
        windowcallback();
    }
    return(
        <div className="w-full h-full bg-background flex flex-col">
            <div className="flex flex-row items-center justify-center bg-foreground w-full h-[40px] p-2 gap-2">
                <h1>    
                    {title}
                </h1>
                <div className="grow"/>
                <div className="cursor-pointer flex items-center justify-center hover:bg-foreground-highlight rounded h-full w-[25px]">
                    <Minimize2/>
                </div>
                <div className="cursor-pointer flex items-center justify-center hover:bg-foreground-highlight rounded h-full w-[25px]" onClick={Window}>
                    <Square/>
                </div>
                <div className="cursor-pointer flex items-center justify-center hover:bg-red-300 rounded h-full w-[25px]" onClick={Terminate}>
                    <X/>
                </div>
            </div>
            <div className="bg-amber-300 h-full w-full"></div>
        </div>
    )
}