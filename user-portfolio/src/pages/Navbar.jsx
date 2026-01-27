import { ViewHandler } from "../providers/ViewHandler";
export const Navbar=()=>{
    const toggleHrMode = ViewHandler((state) => state.toggleHrMode);
    return(
        <nav 
            className="h-[70px] w-full bg-amber-200" 
            onClick={toggleHrMode}>
        </nav> 
    )
}