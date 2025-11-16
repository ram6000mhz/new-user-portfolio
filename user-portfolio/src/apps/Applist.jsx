import { Folder, User } from "lucide-react";

export const apps = [
    { 
        appid: 0,
        icon: <User className="!h-[25px] !w-[25px] accent-accent-icon"/>, 
        title: "About Me" ,
        content: <div></div>
    },
    { 
        appid: 1,
        icon: <Folder className="!h-[25px] !w-[25px] accent-accent-icon"/>, 
        title: "My Projects" ,
        content: <div></div>
    },
];