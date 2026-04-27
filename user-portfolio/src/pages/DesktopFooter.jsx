import {BuildStartWindow} from "./BuildStartWindow"
import {TaskBar} from "./Taskbar"
import { Timer } from "./Timer";
export const DesktopFooter = () => {

    return (
        <footer className="w-full h-[50px] flex flex-row items-center border-t-2 border-muted-border px-2 sm:px-2 md:px-4 lg:px-6 bg-foreground z-50">
            <BuildStartWindow/>
            <TaskBar/>
            <div className="grow"></div>
            <Timer/>
        </footer>
    )
}