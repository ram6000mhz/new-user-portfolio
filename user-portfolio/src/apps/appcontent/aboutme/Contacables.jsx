import {Power, Linkedin, Mail, Github, MapPin} from "lucide-preact";
export const Contacables = () => {
    return(
        <div className="w-full">
            <div class="grid justify-center justify-items-start @2xl:grid-flow-col @2xl:items-center w-full gap-5 px-3 py-2">
                <div className="flex flex-col gap-1">
                    <h2 className="font-semibold text-sm text-muted-text">Email</h2>
                    <div className="flex flex-row gap-1 justify-center items-center">
                        <Mail className="!w-[35px] !h-[35px] text-black"/>
                        <h3 className="font-sm text-sm text-black">
                            esyworkpro@gmail.com
                        </h3>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="font-semibold text-sm text-muted-text">Github</h2>
                    <div className="flex flex-row gap-1 justify-center items-center">
                        <Github className="!w-[35px] !h-[35px] text-black"/>
                        <h3 className="font-sm text-sm text-black">
                            github.com/ram6000mhz
                        </h3>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="font-semibold text-sm text-muted-text">LinkedIn</h2>
                    <div className="flex flex-row gap-1 justify-center items-center">
                        <Linkedin className="!w-[35px] !h-[35px] text-black"/>
                        <a 
                            href="http://linkedin.com/in/ethan-sancho-yap-2439a2297/"
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <h3 className="font-sm text-sm text-black">
                                linkedin.com/in/ethan-sancho-yap
                            </h3>
                        </a>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="font-semibold text-sm text-muted-text">Location</h2>
                    <div className="flex flex-row gap-1 justify-center items-center">
                        <MapPin className="!w-[35px] !h-[35px] text-black"/>
                        <h3 className="font-sm text-sm text-black"> 
                            Philippines
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}