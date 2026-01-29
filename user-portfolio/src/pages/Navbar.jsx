import { ViewHandler } from "../providers/ViewHandler";
export const Navbar=()=>{
    const toggleHrMode = ViewHandler((state) => state.toggleHrMode);
    return(
        <nav 
            className="h-[70px] w-full bg-muted-border" 
            onClick={toggleHrMode}>
        </nav> 
    )
}