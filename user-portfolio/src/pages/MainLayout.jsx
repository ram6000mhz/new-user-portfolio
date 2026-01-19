import { Monitor } from "lucide-react";
import { useState } from "react";
import {StartComponent} from "../components/StartComponent"
import { TaskBar } from "./TaskBar";
import { Machineviewport } from './Machineviewport';
import { ViewHandler } from "../providers/ViewHandler";
import { Aboutme } from "../apps/appcontent/Aboutme";
import { div } from "motion/react-client";
// text-xs sm:text-sm md:text-base lg:text-lg
export const MainLayout = ({children}) => {
  console.log("MainLayout rendered");
  const toggleHrMode = ViewHandler((state) => state.toggleHrMode);
  const hr_mode = ViewHandler((state) => state.hr_Mode);
  const [isVisible, setIsVisible] = useState(false);

  const now = new Date().toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const date = new Date().toLocaleDateString();

  const toggleMode = ()=>{
    console.log("amclick?yes")
    toggleHrMode();
  }

  return (
    <div className="w-full h-full flex flex-col">
      {hr_mode &&( 
        <nav 
            className="h-[40px] w-full bg-amber-200" 
            onClick={toggleHrMode}>
        </nav> 
      )}
      <main className="grow">
        {hr_mode ? <Aboutme/>:<Machineviewport/>}
      </main>
      {!hr_mode &&(
        <footer className="w-full h-[50px] flex flex-row items-center border-t-2 border-muted-border p-2 sm:p-2 md:p-4 lg:p-6 bg-foreground z-50">
          <div className="relative">
            <div className="flex justify-center items-center 
            h-[35px] w-[35px] bg-foreground hover:bg-foreground-highlight rounded cursor-pointer"
              onClick={() => setIsVisible(!isVisible)}
            >
              <Monitor className="text-accent-icon"/>
            </div>
            {isVisible && (
              <div
                className={`h-auto w-[180px] sm:w-[230px] 
                  md:w-[260px] transition-all duration-300 ease-in-out 
                  absolute bottom-[55px] left-0 rounded-lg bg-background 
                  overflow-hidden border border-muted-border 
                  ${isVisible ? 'animate-rise-up' : 'animate-go-down'}`}
                onAnimationEnd={() => {
                  if (!isVisible) setIsVisible(false);
                }}
              >
                <StartComponent/>
              </div>
            )}
          </div>
          <TaskBar/>
          <div className="grow"></div>
          <div className="flex flex-col items-center justify-center h-full">
            <time className="text-xs sm:text-sm text-accent-text">{now}</time>
            <time className="text-xs sm:text-sm text-accent-text">{date}</time>
          </div>
        </footer>
        )
      }
    </div>
  );
};