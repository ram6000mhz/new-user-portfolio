import { Folder, User } from "lucide-preact";
import { lazy } from "preact-iso"
import { Aboutme } from "./appcontent/aboutme/Aboutme";

const loadproject = () => import('../apps/appcontent/projects/Project').then(m => m.Project)
const Project = lazy(loadproject);

export const apps = [
    { 
        appid: 0,
        icon: <User className="h-[25px]! w-[25px]! text-accent-icon"/>, 
        title: "About Me" ,
        content: <Aboutme/>
    },
    { 
        appid: 1,
        icon: <Folder className="h-[25px]! w-[25px]! text-accent-icon"/>, 
        title: "My Projects" ,
        content: <Project/>
    },
];