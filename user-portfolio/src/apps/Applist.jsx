import { Folder, User, ScanFace, Soup, Gamepad2, BusFront, BotMessageSquare } from "lucide-preact";
import  Me  from "../assets/img/profile-pic.webp"
import Optiface from "../assets/data/optiface.webp"
import BakeBrewCook from "../assets/data/bbc.webp"
import MathSolve from "../assets/data/mathsolve.webp"
import Tipai from "../assets/data/tipai.webp"
import { Rubric } from "../projects3d/Rubric";

import { Aboutme } from "./appcontent/aboutme/Aboutme";

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
        content: 
        <div className="canvas-container w-full h-full flex justify-center items-center">
            <Rubric />
        </div>
    },
];