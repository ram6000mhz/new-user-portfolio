import {BuildStartWindow} from "./BuildStartWindow"
import {TaskBar} from "./Taskbar"
import { Timer } from "./Timer";
export const DesktopFooter = () => {

    return (
        <footer className="w-full h-[50px] flex flex-row items-center border-t-2 border-muted-border p-2 sm:p-2 md:p-4 lg:p-6 bg-foreground z-50">
            <BuildStartWindow/>
            <TaskBar/>
            <div className="grow"></div>
            <Timer/>
        </footer>
    )
}