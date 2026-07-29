import { useProjectStore } from "./Projectstore";
import { X } from "lucide-preact"
import { useEffect } from "preact/hooks";

export const PopupSidebar = () => {
  const { project, closeSidebar, isOpen } = useProjectStore();

  const handleClose = (e) => {
    e.stopPropagation();
    closeSidebar();
  };
  useEffect(() => {
    return () => {
      if(useProjectStore.getState().isOpen){
        closeSidebar();
      }
    };
  }, []);
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
        
        <div className="flex flex-col mt-4">
          <div className="flex flex-row items-center gap-3 mb-2">
            {project.icon}
            <h2 className="text-2xl font-bold text-white">{project.title}</h2>
          </div>
          <h3 className="text-sm font-semibold text-muted-text mb-4">Project Period: {project.date}</h3>
          
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