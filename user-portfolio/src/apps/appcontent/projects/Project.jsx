import { Hero23d } from "./Hero23d"
import { PopupSidebar } from "./PopupSidebar"
import { useProjectStore } from "./Projectstore";
import { motion, AnimatePresence } from "motion/react";
export const Project = () => {
  const { isOpen, project} = useProjectStore();
  return (
    <div className="relative flex flex-row items-center bg-black w-full h-full overflow-hidden">
      <Hero23d />
        <AnimatePresence>
          {isOpen && project && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-[oklch(0.35_0_0_/_0.2)] backdrop-blur-xs border-l z-1 p-6 flex flex-col overflow-y-auto no-scrollbar"
            >
              <PopupSidebar />
            </motion.div>
          )}  
        </AnimatePresence>
    </div>
  );
};