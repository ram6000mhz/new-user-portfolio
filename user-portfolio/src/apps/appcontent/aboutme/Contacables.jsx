import {Power, Linkedin, Mail, Github, MapPin} from "lucide-preact";
import phFlag from 'flag-icons/flags/4x3/ph.svg';

export const Contacables = () => {
    return(
        <div className="w-full">
            <div class="flex flex-row items-end justify-start w-full gap-5 pt-2">
                <div className="flex flex-row gap-1 justify-center items-center">
                    <a 
                        href="mailto:esyworkpro@gmail.com"
                        aria-label="Email"
                    >
                        <Mail className="!w-[clamp(18px,5cqw,25px)] !h-[clamp(18px,5cqw,25px)] text-white"/>
                    </a>
                </div>
                <div className="flex flex-row gap-1 justify-center items-center">
                    <a 
                        href="https://github.com/ram6000mhz"
                        aria-label="Github"
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <Github className="!w-[clamp(18px,5cqw,25px)] !h-[clamp(18px,5cqw,25px)] text-white"/>
                    </a>
                </div>
                <div className="flex flex-row gap-1 justify-center items-center">
                    <a 
                        href="http://linkedin.com/in/ethan-sancho-yap-2439a2297/"
                        aria-label="LinkedIn"
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <Linkedin className="!w-[clamp(18px,5cqw,25px)] !h-[clamp(18px,5cqw,25px)] text-white"/>
                    </a>
                </div>
                <div className="flex flex-row justify-center items-center">
                    <a 
                        href="https://www.google.com/search?q=Philippines"
                        aria-label="Philippines"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex justify-center items-center p-0.5"
                    >
                        <img 
                            src={phFlag} 
                            className="w-[clamp(18px,5cqw,25px)] rounded-[4px]" 
                            alt="Philippines Flag" 
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}