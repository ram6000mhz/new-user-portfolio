import { Minus,X, Square, PictureInPicture2} from "lucide-react";
export const WindowComponent=({title, children, isFullscreen, terminationcallback, windowcallback})=>{

    const Terminate=()=>{
        terminationcallback();
    }

    const Window=()=>{
        windowcallback();
    }

    return(
        <div className="w-full h-full bg-background flex flex-col">
            <div className="flex flex-row items-center justify-center bg-foreground border-b-2 border-muted-border w-full h-[40px] p-2 gap-1 @container">
                <h1 className="text-[10px] @sm:text-xs @md:text-sm @lg:text-base @xl:text-lg">   
                    {title}
                </h1>
                <div className="grow"/>
                <div className="cursor-pointer flex flex-col items-center justify-center hover:bg-foreground-highlight rounded h-full w-[30px]">
                    <Minus className="!h-[15px] !w-[15px]"/>
                </div>
                <div className="cursor-pointer flex items-center justify-center hover:bg-foreground-highlight rounded h-full w-[30px]" onClick={Window}>
                    {isFullscreen ? <PictureInPicture2 className="!h-[15px] !w-[15px] rotate-180 scale-y-[-1]"/>: <Square className="!h-[15px] !w-[15px]"/>}
                </div>
                <div className="cursor-pointer flex items-center justify-center hover:bg-red-300 rounded h-full w-[30px]" onClick={Terminate}>
                    <X className="!h-[15px] !w-[15px]"/>
                </div>
            </div>
            <div className="bg-amber-300 h-full w-full"></div>
        </div>
    )
}