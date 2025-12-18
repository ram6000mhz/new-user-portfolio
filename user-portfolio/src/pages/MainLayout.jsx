import { Monitor } from "lucide-react";
import { useState } from "react";
import {StartComponent} from "../components/StartComponent"
// text-xs sm:text-sm md:text-base lg:text-lg
import { apps } from "../apps/Applist";
import { Taskman } from "../taskman/Taskman";
import {IconFun} from "../apps/IconFun"
export const MainLayout = ({children}) => {
  console.log("MainLayout rendered");

  const taskman = Taskman((state) => state.taskman);
  const { taskBarOpenClose } = IconFun.getState();
  const [isVisible, setIsVisible] = useState(false);

  const now = new Date().toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const date = new Date().toLocaleDateString();

  const activeApps = apps.filter(app => taskman.includes(app.appid));

  const reOpenWindow = (appId) => {
    taskBarOpenClose(appId);
  }

  return (
    <div className="w-full h-full flex flex-col">
      <main className="flex-1 overflow-auto">
        {children}
      </main>
      <footer className="w-full h-[50px] flex flex-row items-center border-t-2 border-muted-border p-2 sm:p-2 md:p-4 lg:p-6 bg-foreground z-50">
        <div className="relative">
          <div className="flex justify-center items-center h-[35px] w-[35px] bg-foreground hover:bg-foreground-highlight rounded cursor-pointer"
            onClick={() => setIsVisible(!isVisible)}
          >
            <Monitor className="text-accent-icon"/>
          </div>
          {isVisible && (
            <div
              className={`h-auto w-[180px] sm:w-[230px] md:w-[260px] transition-all duration-300 ease-in-out absolute bottom-[55px] left-0 rounded-lg bg-background overflow-hidden border border-muted-border ${isVisible ? 'animate-rise-up' : 'animate-go-down'}`}
              onAnimationEnd={() => {
                if (!isVisible) setIsVisible(false);
              }}
            >
              <StartComponent/>
            </div>
          )}
        </div>
        {activeApps.map((app, index) => (
          <div className="flex items-center justify-center h-[35px] w-[35px] hover:bg-foreground-highlight rounded cursor-pointer" onClick={()=>reOpenWindow(app.appid)} onTouchEnd={(e)=>{e.preventDefault();reOpenWindow(app.appid);}}>
            {app.icon}
          </div>
        ))}
        <div className="grow"></div>
        <div className="flex flex-col items-center justify-center h-full">
          <time className="text-xs sm:text-sm text-accent-text">{now}</time>
          <time className="text-xs sm:text-sm text-accent-text">{date}</time>
        </div>
      </footer>
    </div>
  );
};