import { ViewHandler } from "../providers/ViewHandler";
import {Power} from "lucide-preact";
import { useProjectStore } from "../apps/appcontent/projects/Projectstore";
export const Navbar=()=>{
    const toggleHrMode = ViewHandler((state) => state.toggleHrMode);
    const toggleisHome = ViewHandler((state) => state.toggleisHome)
    const toggleisProject = ViewHandler((state) => state.toggleisProject)
    const closeSidebar = useProjectStore((state) => state.closeSidebar);

    return(
        <nav className=" flex flex-row h-[70px] w-full items-center justify-between px-10 fixed top-0 z-50 bg-black/30 backdrop-blur-xs">  
            <div className="w-[25px]" />
            <div className="flex flex-row gap-10">
                <h1 className="text-white" onClick={()=> {
                    toggleisHome()
                    closeSidebar()
                }}>
                    Home
                </h1>  
                <h1 className="text-white" onClick={() => {
                    toggleisProject()
                    closeSidebar()
                }}>
                    Projects
                </h1>  
            </div>
            <Power onClick={toggleHrMode} className="!h-[25px] !w-[25px] text-white cursor-pointer"/>
        </nav> 
    )
}