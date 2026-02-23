import { Folder, User, ScanFace, Soup, Gamepad2, BusFront, BotMessageSquare } from "lucide-preact";
import Optiface from "../../../assets/data/optiface.webp"
import BakeBrewCook from "../../../assets/data/bbc.webp"
import MathSolve from "../../../assets/data/mathsolve.webp"
import Tipai from "../../../assets/data/tipai.webp"
import MagicC from "../../../assets/data/bus.webp"
export const Projectlist = [
    { 
        appid: 0,
        icon: <ScanFace className="!h-[25px] !w-[25px] text-accent-icon"/>, 
        title: "Opti-Face" ,
        preview:Optiface,
        content: 
        <div className="flex flex-col items-center">
            A lightweight facial recognition application built by using scrfd, mediapipe's FaceMesh, and Edgeface that is still accurate and fast.
        </div>
    },
    { 
        appid: 1,
        icon: <Soup className="!h-[25px] !w-[25px] text-accent-icon"/>, 
        title: "Bake, Brew and Cook" ,
        preview:BakeBrewCook,
        content: 
        <div className="">
            A small recipe application that contains a variety of Filipino recipes for baking, brewing, and cooking.
        </div>
    },
    { 
        appid: 2,
        icon: <Gamepad2 className="!h-[25px] !w-[25px] text-accent-icon"/>, 
        title: "Math Solve" ,
        preview:MathSolve,
        content: 
        <div className="">
            A game that generates a random -+/x problem to solve within a time limit.
        </div>
    },
    { 
        appid: 3,
        icon: <BusFront className="!h-[25px] !w-[25px] text-accent-icon"/>, 
        title: "Magic C Transport" ,
        preview:MagicC,
        content: 
        <div className="">
            A transportation booking application for Magic C Transport Services.
        </div>
    },
    { 
        appid: 4,
        icon: <BotMessageSquare className="!h-[25px] !w-[25px] text-accent-icon"/>, 
        title: "T.I.P.A.I" ,
        preview:Tipai,
        content: 
        <div className="">
            A simple AI chatbot that responds to user's queries about the technological institute of the philippines.
        </div>
    },
];