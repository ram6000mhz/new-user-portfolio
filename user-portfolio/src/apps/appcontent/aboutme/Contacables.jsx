import {Power, Linkedin, Mail, Github, MapPin} from "lucide-preact";
export const Contacables = () => {
    return(
        <div className="w-full">
            <div class="flex flex-row items-start w-full gap-5 pt-2">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-1 justify-center items-center">
                        <a 
                            href="mailto:esyworkpro@gmail.com"
                            aria-label="Email"
                        >
                            <Mail className="!w-[25px] !h-[25px] text-white"/>
                        </a>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-1 justify-center items-center">
                        <a 
                            href="https://github.com/ram6000mhz"
                            aria-label="Github"
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <Github className="!w-[25px] !h-[25px] text-white"/>
                        </a>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-1 justify-center items-center">
                        <a 
                            href="http://linkedin.com/in/ethan-sancho-yap-2439a2297/"
                            aria-label="LinkedIn"
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <Linkedin className="!w-[25px] !h-[25px] text-white"/>
                        </a>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-1 justify-center items-center">
                        <a 
                            href=""
                            aria-label="Philippines"
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <MapPin className="!w-[25px] !h-[25px] text-white"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}