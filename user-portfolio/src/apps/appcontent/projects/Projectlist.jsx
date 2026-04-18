import { Folder, User, ScanFace, Soup, Gamepad2, BusFront, BotMessageSquare } from "lucide-preact";
import Optiface from "../../../assets/data/optiface.webp"
import BakeBrewCook from "../../../assets/data/bbc.webp"
import MathSolve from "../../../assets/data/mathsolve.webp"
import Tipai from "../../../assets/data/tipai.webp"
import MagicC from "../../../assets/data/bus.webp"
export const Projectlist = [
    { 
        appid: 0,
        icon: <ScanFace className="h-[25px]! w-[25px]! text-accent-icon"/>, 
        title: "Opti-Face" ,
        preview:Optiface,
        boxcolor:"#00FF00",
        content: 
        <p className="text-white text-justify">
            A lightweight facial recognition application built by using scrfd, mediapipe's FaceMesh, and Edgeface that is still accurate and fast.
        </p>
    },
    { 
        appid: 1,
        icon: <Soup className="h-[25px]! w-[25px]! text-accent-icon"/>, 
        title: "Bake, Brew and Cook" ,
        preview:BakeBrewCook,
        boxcolor:"#FF0000",
        content: 
        <p className="text-white text-justify">
            A small recipe application that contains a variety of Filipino recipes for baking, brewing, and cooking.
        </p>
    },
    { 
        appid: 2,
        icon: <Gamepad2 className="h-[25px]! w-[25px]! text-accent-icon"/>, 
        title: "Math Solve" ,
        preview:MathSolve,
        boxcolor:"#0000FF",
        content: 
        <p className="text-white text-justify">
            A game that generates a random -+/x problem to solve within a time limit.
        </p>
    },
    { 
        appid: 3,
        icon: <BusFront className="h-[25px]! w-[25px]! text-accent-icon"/>, 
        title: "Magic C Transport" ,
        preview:MagicC,
        boxcolor:"#FA5902",
        content: 
        <p className="text-white text-justify">
            A transportation booking application for Magic C Transport Services.
        </p>
    },
    { 
        appid: 4,
        icon: <BotMessageSquare className="h-[25px]! w-[25px]! text-accent-icon"/>, 
        title: "T.I.P.A.I" ,
        preview:Tipai,
        boxcolor:"#FFFF00",
        content: 
        <p className="text-white text-justify">
            A simple AI chatbot that responds to user's queries about the technological institute of the philippines.
        </p>
    },
];