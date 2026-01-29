import { apps } from "../apps/Applist";
import { Taskman } from "../taskman/Taskman";
import {IconFun} from "../apps/IconFun"

export const TaskBar = () =>{

    const taskman = Taskman((state) => state.taskman);
    const { taskBarOpenClose } = IconFun.getState();

    const activeApps = apps.filter(app => taskman.includes(app.appid));

    const reOpenWindow = (appId) => {
        taskBarOpenClose(appId);
    }

    return (
        <>
            {activeApps.map((app, index) => (
                <div className="flex items-center justify-center 
                h-[35px] w-[35px] hover:bg-foreground-highlight 
                rounded cursor-pointer" 
                onClick={
                    ()=>reOpenWindow(app.appid)} 
                    onTouchEnd={(e)=>{
                        e.preventDefault();
                        reOpenWindow(app.appid);
                    }}>
                    {app.icon}
                </div>
            ))}
        </>
    )
}