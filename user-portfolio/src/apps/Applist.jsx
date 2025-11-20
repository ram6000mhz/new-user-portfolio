import { Folder, User, ScanFace, Soup, Gamepad2, BusFront, BotMessageSquare } from "lucide-react";

export const apps = [
    { 
        appid: 0,
        icon: <User className="!h-[25px] !w-[25px] accent-accent-icon"/>, 
        title: "About Me" ,
        content: 
        <div className="bg-amber-300 ">
            About 
        </div>
    },
    { 
        appid: 1,
        icon: <ScanFace className="!h-[25px] !w-[25px] accent-accent-icon"/>, 
        title: "Opti-Face" ,
        content: 
        <div className="">
            A lightweight facial recognition application built by using scrfd, mediapipe's FaceMesh, and Edgeface that is still accurate and fast.
        </div>
    },
    { 
        appid: 2,
        icon: <Soup className="!h-[25px] !w-[25px] accent-accent-icon"/>, 
        title: "Bake, Brew and Cook" ,
        content: 
        <div className="">
            A small recipe application that contains a variety of Filipino recipes for baking, brewing, and cooking.
        </div>
    },
    { 
        appid: 3,
        icon: <Gamepad2 className="!h-[25px] !w-[25px] accent-accent-icon"/>, 
        title: "Math Solve" ,
        content: 
        <div className="">
            A game that generates a random -+/x problem to solve within a time limit.
        </div>
    },
    { 
        appid: 4,
        icon: <BusFront className="!h-[25px] !w-[25px] accent-accent-icon"/>, 
        title: "Magic C Transport" ,
        content: 
        <div className="">
            A transportation booking application for Magic C Transport Services.
        </div>
    },
    { 
        appid: 5,
        icon: <BotMessageSquare className="!h-[25px] !w-[25px] accent-accent-icon"/>, 
        title: "T.I.P.A.I" ,
        content: 
        <div className="">
            A simple AI chatbot that responds to user's queries about the technological institute of the philippines.
        </div>
    },
];