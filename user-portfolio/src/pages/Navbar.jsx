import { ViewHandler } from "../providers/ViewHandler";
import {Power} from "lucide-preact";
import { useProjectStore } from "../apps/appcontent/projects/Projectstore";
export const Navbar=()=>{
    const toggleHrMode = ViewHandler((state) => state.toggleHrMode);
    const toggleisHome = ViewHandler((state) => state.toggleisHome)
    const toggleisProject = ViewHandler((state) => state.toggleisProject)
    const closeSidebar = useProjectStore((state) => state.closeSidebar);

    return(
        <nav className="flex flex-row h-[70px] w-full items-center justify-between px-4 min-[350px]:px-8 fixed top-0 z-50 bg-black/30 backdrop-blur-xs">  
            <div/> 
            <div className="flex flex-row gap-2 min-[350px]:gap-9">
                <h1 className="text-white cursor-pointer font-semibold text-sm min-[350px]:text-l" onClick={()=> { toggleisHome(); closeSidebar(); }}>
                    About me
                </h1>  
                <h1 className="text-white cursor-pointer font-semibold text-sm min-[350px]:text-l" onClick={() => { toggleisProject(); closeSidebar(); }}>
                    Projects
                </h1>  
            </div>
            <Power onClick={toggleHrMode} size={24} className="text-white cursor-pointer shrink-0"/>
        </nav>
    )
}