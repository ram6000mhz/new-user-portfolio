import { Computer } from "lucide-react";
// text-xs sm:text-sm md:text-base lg:text-lg
export const MainLayout = ({children}) => {
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
        <Computer></Computer>
        <div className="grow"></div>
        <div className="flex flex-col items-center justify-center h-full">
          <time className="text-xs sm:text-sm">{now}</time>
          <time className="text-xs sm:text-sm">{date}</time>
        </div>
      </footer>
    </div>
  );
};