import { Hero23d } from "./Hero23d"
import { PopupSidebar } from "./PopupSidebar"

export const Project = () => {
  return (
    <div className="relative flex flex-row items-center bg-black w-full h-full overflow-hidden">
      <Hero23d />
      <PopupSidebar />
    </div>
  );
};