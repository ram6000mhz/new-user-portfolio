import { Rnd } from "react-rnd";
import { IconComponent } from "../components/IconComponent";
import {Folder} from "lucide-react";

export const Machineviewport=()=>{
    return(
        <div className="w-full h-full bg-background flex">
            <Rnd bounds="parent">
                <IconComponent Children={<Folder className="!h-[25px] !w-[25px] accent-accent-icon"/>} Title="My Projects"/>
            </Rnd>
        </div>
    )
}
