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
            
        </div>
    },
    { 
        appid: 2,
        icon: <Soup className="!h-[25px] !w-[25px] accent-accent-icon"/>, 
        title: "Bake, Brew and Cook" ,
        content: 
        <div className="">
            
        </div>
    },
    { 
        appid: 3,
        icon: <Gamepad2 className="!h-[25px] !w-[25px] accent-accent-icon"/>, 
        title: "Math Solve" ,
        content: 
        <div className="">
            
        </div>
    },
    { 
        appid: 4,
        icon: <BusFront className="!h-[25px] !w-[25px] accent-accent-icon"/>, 
        title: "Magic C Transport" ,
        content: 
        <div className="">
            
        </div>
    },
    { 
        appid: 5,
        icon: <BotMessageSquare className="!h-[25px] !w-[25px] accent-accent-icon"/>, 
        title: "T.I.P.A.I" ,
        content: 
        <div className="">
            
        </div>
    },
];