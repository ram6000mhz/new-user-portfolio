import { ViewHandler } from "../providers/ViewHandler";
import {Power} from "lucide-preact";
export const Navbar=()=>{
    const toggleHrMode = ViewHandler((state) => state.toggleHrMode);
    return(
        <nav className="flex flex-row h-[70px] w-full items-center justify-end bg-white border-b px-10">    
            <Power onClick={toggleHrMode} className="!h-[25px] !w-[25px] text-black cursor-pointer"/>
        </nav> 
    )
}