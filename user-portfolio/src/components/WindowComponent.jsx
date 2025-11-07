import {X, Square, Minimize2} from "lucide-react";
export const WindowComponent=({title,children})=>{
    return(
        <div className="w-full h-full bg-background border border-muted-border flex flex-col">
            <div className="flex flex-row items-center justify-center">
                <h1>
                    {title}
                </h1>
                <div className="grow"/>
                <div>
                    <Minimize2/>
                </div>
                <div>
                    <Square/>
                </div>
                <div>
                    <X/>
                </div>
            </div>
            {children}
        </div>
    )
}