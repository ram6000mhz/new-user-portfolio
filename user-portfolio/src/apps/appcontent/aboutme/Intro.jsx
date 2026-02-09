import { Hero3d } from "./Hero3d"
import { Contacables } from "./Contacables";
export const Intro = () =>{
    return(
        <div className="flex flex-row w-full h-full items-center justify-center">
            <div className="bg-black flex-1 h-full grid place-content-center justify-items-start">
                <h1 className="font-bold text-5xl text-white">
                   Ethan Sancho Yap
                </h1>
                <h2 className="font-semibold text-xl text-muted-text">
                    Software developer
                </h2>
                <h3 className="font-extralight text-md text-muted-text">
                    I enjoy building interesting projects.
                </h3>
                <Contacables/>
            </div>
            <div className="bg-black flex-1 h-full ">
                <Hero3d></Hero3d>
            </div>
        </div>
    )
}