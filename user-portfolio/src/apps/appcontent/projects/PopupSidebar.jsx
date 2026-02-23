import { motion, AnimatePresence } from "motion/react";
import { useProjectStore } from "./Projectstore";
import { X } from "lucide-preact"

export const PopupSidebar = () => {
  const { isOpen, project, closeSidebar } = useProjectStore();
    console.log("r")
  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border shadow-2xl z-[100] p-6 flex flex-col overflow-y-auto"
        >
          <button onClick={closeSidebar} className="self-end p-2 hover:bg-muted rounded-full">
            <X size={24} />
          </button>
          
          <div className="mt-4">
            <div className="flex items-center gap-3 mb-4">
              {project.icon}
              <h2 className="text-2xl font-bold">{project.title}</h2>
            </div>
            
            <img 
              src={project.preview} 
              alt={project.title} 
              className="w-full rounded-lg mb-6 object-cover aspect-video" 
            />
            
            <div className="prose prose-invert">
              {project.content}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};