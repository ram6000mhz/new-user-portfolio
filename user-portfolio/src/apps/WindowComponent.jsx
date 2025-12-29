import { Minus,X, Square, PictureInPicture2} from "lucide-react";
import { ZIndexShuffler } from "../providers/ZIndexShuffler";

export const WindowComponent=({title, isFullscreen, terminationcallback, windowcallback, minimizecallback, appIndex, content})=>{
    console.log("WindowComponent rendered",title);
    const {bringToFront} = ZIndexShuffler();

    const Terminate=()=>{
        terminationcallback();
    }

    const Window=()=>{
        windowcallback();
    }

    const Minimize=()=>{
        minimizecallback();
    }

    return(
        <div className="w-full h-full bg-background flex flex-col">
            <div className="flex flex-row items-center justify-center bg-foreground border-b-2 border-muted-border w-full h-[40px] p-2 gap-1 @container">
                <h1 className="text-[10px] @sm:text-xs @md:text-sm @lg:text-base @xl:text-lg text-accent-text">   
                    {title}
                </h1>
                <div className="grow"/>
                <div className="cursor-pointer flex flex-col items-center justify-center hover:bg-foreground-highlight rounded h-full w-[30px]" onClick={Minimize} onTouchEnd={(e)=>{e.preventDefault();Minimize();}}>
                    <Minus className="!h-[15px] !w-[15px] text-accent-icon"/>
                </div>
                <div className="cursor-pointer flex items-center justify-center hover:bg-foreground-highlight rounded h-full w-[30px]" onClick={Window} onTouchEnd={(e)=>{e.preventDefault();Window();}}>
                    {isFullscreen ? <PictureInPicture2 className="!h-[15px] !w-[15px] rotate-180 scale-y-[-1] text-accent-icon"/>: <Square className="!h-[15px] !w-[15px] text-accent-icon"/>}
                </div>
                <div className="cursor-pointer flex items-center justify-center hover:bg-red-300 rounded h-full w-[30px]" onClick={Terminate} onTouchEnd={(e)=>{e.preventDefault();Terminate();}}>
                    <X className="!h-[15px] !w-[15px] text-accent-icon"/>
                </div>
            </div>
            <div className="deadzone w-full h-full" onClick={()=>{bringToFront(appIndex)}} onTouchEnd={(e)=>{e.preventDefault();bringToFront(appIndex);}}>
                {content}
            </div>
        </div>
    )
}