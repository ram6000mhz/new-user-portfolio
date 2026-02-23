import { Folder, User, ScanFace, Soup, Gamepad2, BusFront, BotMessageSquare } from "lucide-preact";

import { Aboutme } from "./appcontent/aboutme/Aboutme";
import { Project } from "./appcontent/projects/Project";

export const apps = [
    { 
        appid: 0,
        icon: <User className="!h-[25px] !w-[25px] text-accent-icon"/>, 
        title: "About Me" ,
        content: <Aboutme/>
    },
    { 
        appid: 1,
        icon: <Folder className="!h-[25px] !w-[25px] text-accent-icon"/>, 
        title: "My Projects" ,
        content: <Project/>
    },
];