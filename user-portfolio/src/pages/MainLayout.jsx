import { Computer } from "lucide-react";
import { useState } from "react";
// text-xs sm:text-sm md:text-base lg:text-lg
export const MainLayout = ({children}) => {

  const [isVisible, setIsVisible] = useState(false);

  const now = new Date().toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const date = new Date().toLocaleDateString();

  return (
    <div className="w-full h-full flex flex-col gap-1">
      <main className="flex-1 overflow-auto">
        {children}
      </main>
      <footer className="w-full h-[50px] flex flex-row items-center border-t-2 border-muted-border p-2 sm:p-2 md:p-4 lg:p-6 bg-foreground">
        <div className="relative">
          <div className="flex justify-center items-center h-[35px] w-[35px] bg-foreground hover:bg-foreground-highlight rounded cursor-pointer"
            onClick={() => setIsVisible(!isVisible)}
          >
            <Computer/>
          </div>
          {isVisible && (
            <div
              className={`h-[100px] w-[100px] absolute bottom-[55px] left-0 rounded-lg shadow-lg bg-background outline-1 ${isVisible ? 'animate-rise-up' : 'animate-go-down'}`}
              onAnimationEnd={() => {
                if (!isVisible) setIsVisible(false);
              }}
            >
              <div>hi</div>
            </div>
          )}
        </div>
        <div className="grow"></div>
        <div className="flex flex-col items-center justify-center h-full">
          <time className="text-xs sm:text-sm">{now}</time>
          <time className="text-xs sm:text-sm">{date}</time>
        </div>
      </footer>
    </div>
  );
};