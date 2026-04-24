import { ViewHandler } from "../providers/ViewHandler";
import { useLocation} from "preact-iso";
import {CircleX, SkullIcon} from "lucide-preact"
export const Notfoundpage = () => {
    const { route } = useLocation();
    return(
    <div className="flex flex-col items-center justify-center w-full h-full bg-black gap-3">
        <SkullIcon className="w-40 h-40 text-white " />
        
        <div className="text-center">
            <h1 className="text-white opacity-90 text-4xl font-bold mb-2">404</h1>
            <p className="text-white/60 text-xl">Page Not Found</p>
        </div>

        <button 
            className="w-[180px] h-12 bg-[oklch(25%_0_0)] hover:bg-[oklch(30%_0_0)] text-white rounded-md transition-colors border border-white/10 font-semibold" 
            onClick={() => route('/')}
        >
            Take me back
        </button>
    </div>
    )
}