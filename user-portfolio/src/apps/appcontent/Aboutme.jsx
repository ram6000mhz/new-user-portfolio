import {Power, Linkedin, Mail, Github, MapPin} from "lucide-react";

export const Aboutme = ()=>{
    return(
        <div className="flex flex-col items-start w-full h-full bg-white relative px-80 pt-5 @container gap-3">
            <h1 className="font-bold text-5xl">
                Ethan Sancho Yap
            </h1>
            <h2 className="font-semibold text-xl text-muted-text">
                Software developer
            </h2>
            <h3 className="font-extralight text-md">
                I enjoy building interesting projects.
            </h3>
            <div className="w-full h-px bg-muted-text my-5" />
            <div className="w-full">
                <div className="flex flex-row items-center justify-center w-full gap-5">
                    <div className="flex flex-col gap-1">
                        <h2 className="font-semibold text-sm text-muted-text">Email</h2>
                        <div className="flex flex-row gap-1 justify-center items-center">
                            <Mail className="!w-[35px] !h-[35px] text-black"/>
                            <h4 className="font-sm text-sm text-black">
                                esyworkpro@gmail.com
                            </h4>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="font-semibold text-sm text-muted-text">Github</h2>
                        <div className="flex flex-row gap-1 justify-center items-center">
                            <Github className="!w-[35px] !h-[35px] text-black"/>
                            <h4 className="font-sm text-sm text-black">
                                github.com/ram6000mhz
                            </h4>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="font-semibold text-sm text-muted-text">LinkedIn</h2>
                        <div className="flex flex-row gap-1 justify-center items-center">
                            <Linkedin className="!w-[35px] !h-[35px] text-black"/>
                            <h4 className="font-sm text-sm text-black">
                                www.linkedin.com/in/ethan-sancho-yap-2439a2297/
                            </h4>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="font-semibold text-sm text-muted-text">Location</h2>
                        <div className="flex flex-row gap-1 justify-center items-center">
                            <MapPin className="!w-[35px] !h-[35px] text-black"/>
                            <h4 className="font-sm text-sm text-black">
                                Philippines
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-px bg-muted-text my-6" />
        </div>
    )
}