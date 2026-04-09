import { useProjectStore } from "./Projectstore";
import { X } from "lucide-preact"

export const PopupSidebar = () => {
  const { project, closeSidebar } = useProjectStore();

  const handleClose = (e) => {
    e.stopPropagation(); 
    closeSidebar();
  };

  return (
      <>
        <button 
          onClick={handleClose}
          onTouchEnd={(e) => {
            e.stopPropagation();
            closeSidebar();
          }}
          className="self-end p-2 hover:bg-muted rounded-full cursor-pointer">
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
            className="w-full rounded-lg mb-6 object aspect-video object-contain" 
          />
          
          <div className="w-full">
              {project.content}
          </div>
        </div>
      </>
  );
};