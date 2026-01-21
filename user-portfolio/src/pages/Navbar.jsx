import { ViewHandler } from "../providers/ViewHandler";
export const Navbar=()=>{
    const hr_mode = ViewHandler((state) => state.hr_Mode);
    const toggleHrMode = ViewHandler((state) => state.toggleHrMode);
    return(
        <>
        {hr_mode &&( 
            <nav 
                className="h-[40px] w-full bg-amber-200" 
                onClick={toggleHrMode}>
            </nav> 
        )}
        </>
    )
}