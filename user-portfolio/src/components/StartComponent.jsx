import {Power, Linkedin, Mail, Github} from "lucide-react";
import ProfilePic from "../assets/img/profile-pic.webp";

export const StartComponent=()=>{
    return(
        <div className="flex flex-col w-full h-full">
            <h1 className="text-xs font-medium text-muted-text mb-2 px-4 pt-3 items-center flex justify-start">
                Pinned Contacts
            </h1>
            <div className="grow grid grid-cols-3 gap-1 p-3 items-start">
                <div className="flex flex-col justify-center items-center">
                    <a href="https://github.com/ram6000mhz">
                        <div className="w-[35px] h-[35px] bg-foreground flex justify-center items-center p-2 border border-muted-border rounded-md hover:bg-foreground-highlight cursor-pointer">
                            <Github className="!w-[35px] !h-[35px] text-accent-text"/>
                        </div>
                    </a>
                    <p className="text-xs mt-1 text-center text-accent-text">Github</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <a href="mailto:esyworkpro@gmail.com">
                        <div className="w-[35px] h-[35px] bg-foreground flex justify-center items-center p-2 border border-muted-border rounded-md hover:bg-foreground-highlight cursor-pointer">
                            <Mail className="!w-[35px] !h-[35px] text-accent-text"/>
                        </div>
                    </a>
                    <p className="text-xs mt-1 text-center text-accent-text">Email</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <a href="">
                        <div className="w-[35px] h-[35px] bg-foreground flex justify-center items-center p-2 border border-muted-border rounded-md hover:bg-foreground-highlight cursor-pointer">
                            <Linkedin className="!w-[35px] !h-[35px] text-accent-text"/>
                        </div>
                    </a>
                    <p className="text-xs mt-1 text-center text-accent-text">LinkedIn</p>
                </div>
            </div>
            <div className="w-full h-[50px] bg-foreground flex flex-row items-center border-t border-muted-border p-4 gap-2">
                <div className="w-[35px] h-[35px] rounded-3xl bg-background border border-muted-border overflow-hidden">
                    <img src={ProfilePic}/>
                </div>
                <p className="text-accent-text">
                    Ethan
                </p>
                <div className="grow"></div>
                <div className="w-[25px] h-[25px] p-1 hover:bg-foreground-highlight flex items-center justify-center rounded-2xl cursor-pointer">
                    <Power className="!w-[20px] !h-[20px] text-accent-icon"/>
                </div>
            </div>
        </div>
    );
};