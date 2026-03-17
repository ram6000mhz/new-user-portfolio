import { Hero3d } from "./Hero3d"
import { Contacables } from "./Contacables";
export const Intro = () =>{
    return(
        <div className="relative flex flex-row w-full h-full items-center justify-center @container">
            <div className="relative z-1 bg-black/30 backdrop-blur-xs flex-1 h-full grid place-content-center justify-items-start px-0 @sm:px-10">
                <h1 className="font-bold text-[clamp(1.5rem,8vw,3rem)] text-white">
                   Ethan Sancho Yap
                </h1>
                <h2 className="font-semibold text-[clamp(1rem,4vw,1.25rem)] text-muted-text">
                    Software developer
                </h2>
                <h3 className="font-extralight text-[clamp(0.875rem,3vw,1rem)] text-muted-text">
                    I enjoy building interesting projects.
                </h3>
                <Contacables/>
            </div>
            <div className="absolute inset-0 @md:relative @md:flex-1 h-full w-full bg-black z-0">
                <Hero3d />
            </div>
        </div>
    )
}