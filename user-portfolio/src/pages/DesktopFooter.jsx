import { ViewHandler } from "../providers/ViewHandler";
import {BuildStartWindow} from "./BuildStartWindow"
import {TaskBar} from "./Taskbar"
export const DesktopFooter = () => {
    console.log("renderdesktopfooter")
    const now = new Date().toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    const date = new Date().toLocaleDateString();

    return (
        <footer className="w-full h-[50px] flex flex-row items-center border-t-2 border-muted-border p-2 sm:p-2 md:p-4 lg:p-6 bg-foreground z-50">
            <BuildStartWindow/>
            <TaskBar/>
            <div className="grow"></div>
            <div className="flex flex-col items-center justify-center h-full">
                <time className="text-xs sm:text-sm text-accent-text">{now}</time>
                <time className="text-xs sm:text-sm text-accent-text">{date}</time>
            </div>
        </footer>
    )
}