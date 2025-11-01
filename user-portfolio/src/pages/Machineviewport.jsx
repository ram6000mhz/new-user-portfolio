
export const Machineviewport=()=>{
    return(
        <div className="w-full h-full bg-background">
            <h1 className="text-accent-text">
                Machine viewport
            </h1>
            <h2 className="text-muted-text">
                Machine viewport
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 p-4">
                <div className="bg-amber-400 flex-1 min-w-[100px] min-h-[100px] max-h-[500px]"><h1>div1</h1></div>
                <div className="bg-blue-400 flex-1 min-w-[100px] min-h-[100px] max-h-[500px]"><h1>div2</h1></div>
                <div className="bg-red-400 flex-1 min-w-[100px] min-h-[100px] max-h-[500px]"><h1>div3</h1></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 p-4">
                <div className="bg-amber-400 flex-1 min-w-[100px] min-h-[100px] max-h-[500px]"><h1>div1</h1></div>
                <div className="bg-blue-400 flex-1 min-w-[100px] min-h-[100px] max-h-[500px]"><h1>div2</h1></div>
                <div className="bg-red-400 flex-1 min-w-[100px] min-h-[100px] max-h-[500px]"><h1>div3</h1></div>
            </div>
        </div>
    )
}
