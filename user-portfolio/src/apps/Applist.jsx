import { Folder, User, ScanFace, Soup, Gamepad2, BusFront, BotMessageSquare } from "lucide-react";
import  Me  from "../assets/img/profile-pic.webp"
import Optiface from "../assets/data/optiface.png"
import BakeBrewCook from "../assets/data/bbc.png"
import MathSolve from "../assets/data/mathsolve.png"
import Tipai from "../assets/data/tipai.png"
import { Rubric } from "../projects3d/Rubric";
import ProfileBg from "../assets/img/desktop-bg.webp"

export const apps = [
    { 
        appid: 0,
        icon: <User className="!h-[25px] !w-[25px] text-accent-icon"/>, 
        title: "About Me" ,
        content: 
        <div className="flex flex-col justify-items-center w-full h-full bg-red-400 relative">
            <div className="flex-2 w-full h-full bg-cover" style={{ backgroundImage: `url(${ProfileBg})` ,backgroundSize: "contain"}}>
            </div>
            <div className="flex-4 w-full px-72 overflow-visible  border-t-4 border-muted-border" >
                <img
                    src={Me}
                    className="!h-[150px] !w-[150px] rounded-full -mt-[60px] border-4 border-muted-border"
                />
            </div>
        </div>
    },
    { 
        appid: 1,
        icon: <ScanFace className="!h-[25px] !w-[25px] text-accent-icon"/>, 
        title: "Opti-Face" ,
        content: 
        <div className="">
            A lightweight facial recognition application built by using scrfd, mediapipe's FaceMesh, and Edgeface that is still accurate and fast.
        </div>
    },
    { 
        appid: 2,
        icon: <Soup className="!h-[25px] !w-[25px] text-accent-icon"/>, 
        title: "Bake, Brew and Cook" ,
        content: 
        <div className="">
            A small recipe application that contains a variety of Filipino recipes for baking, brewing, and cooking.
        </div>
    },
    { 
        appid: 3,
        icon: <Gamepad2 className="!h-[25px] !w-[25px] text-accent-icon"/>, 
        title: "Math Solve" ,
        content: 
        <div className="">
            A game that generates a random -+/x problem to solve within a time limit.
        </div>
    },
    { 
        appid: 4,
        icon: <BusFront className="!h-[25px] !w-[25px] text-accent-icon"/>, 
        title: "Magic C Transport" ,
        content: 
        <div className="">
            A transportation booking application for Magic C Transport Services.
        </div>
    },
    { 
        appid: 5,
        icon: <BotMessageSquare className="!h-[25px] !w-[25px] text-accent-icon"/>, 
        title: "T.I.P.A.I" ,
        content: 
        <div className="">
            A simple AI chatbot that responds to user's queries about the technological institute of the philippines.
        </div>
    },
    { 
        appid: 6,
        icon: <Folder className="!h-[25px] !w-[25px] text-accent-icon"/>, 
        title: "My Projects" ,
        content: 
        <div className="canvas-container w-full h-full flex justify-center items-center">
            <Rubric />
        </div>
    },
];