import {Power, Linkedin, Mail, Github} from "lucide-react";

export const Aboutme = ()=>{
    return(
        <div className="flex flex-col items-start w-full h-full bg-white relative px-80 py-5 @container">
            <h1 className="font-bold text-5xl">
                Ethan Sancho Yap
            </h1>
            <h2 className="font-semibold text-xl py-2 text-muted-text">
                Software developer
            </h2>
            <h3 className="font-extralight text-md py-4">
                small description
            </h3>
            <div className="w-full h-px bg-muted-text my-6" />
            <div className="grid grid-cols-2 w-full">
                <div className="flex flex-col items-start justify-center border-muted-border">
                    <h2 className="font-semibold text-md py-2 text-muted-text">Contact</h2>
                    <div className="flex flex-col">
                        <div className="flex flex-row gap-2">
                            <Github className="!w-[35px] !h-[35px] text-black"/>
                            <h4 className="font-sm text-sm text-muted-text">
                                Github
                            </h4>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Linkedin className="!w-[35px] !h-[35px] text-black"/>
                            <h4 className="font-sm text-sm text-muted-text">
                                LinkdIn
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-center">
                    <h3 className="font-semibold text-md py-2 text-muted-text">Socials</h3>
                    <div className="flex flex-col">
                        <h4 className="font-sm text-sm text-muted-text">
                            Github
                        </h4>
                        <h4 className="font-sm text-sm text-muted-text">
                            LinkdIn
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    )
}