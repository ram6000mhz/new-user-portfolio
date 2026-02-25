import { motion, AnimatePresence } from "motion/react";
import { useProjectStore } from "./Projectstore";
import { X } from "lucide-preact"

export const PopupSidebar = () => {
  const { project, closeSidebar } = useProjectStore();
  return (
      <>
        <button onClick={closeSidebar} className="self-end p-2 hover:bg-muted rounded-full">
          <X className="text-white" size={24} />
        </button>
        
        <div className="mt-4">
          <div className="flex items-center gap-3 mb-4">
            {project.icon}
            <h2 className="text-2xl font-bold text-white">{project.title}</h2>
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
      </>
  );
};