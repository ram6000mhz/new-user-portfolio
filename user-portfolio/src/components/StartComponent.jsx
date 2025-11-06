import {Power,User,Phone} from "lucide-react";
import ProfilePic from "../assets/img/profile-pic.webp";

export const StartComponent=()=>{
    return(
        <div className="flex flex-col w-full h-full">
            <div className="grow grid grid-cols-3 gap-1 p-3 items-start">
                <div className="flex flex-col justify-center items-center">
                    <div className="w-[35px] h-[35px] bg-foreground flex justify-center items-center p-2 border border-muted-border rounded-md hover:bg-foreground-highlight cursor-pointer">
                        <User className="!w-[35px] !h-[35px] text-accent-text"/>
                    </div>
                    <p className="text-xs mt-1 text-center text-accent-text">About Me</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="w-[35px] h-[35px] bg-foreground flex justify-center items-center p-2 border border-muted-border rounded-md hover:bg-foreground-highlight cursor-pointer">
                        <Phone className="!w-[35px] !h-[35px] text-accent-text"/>
                    </div>
                    <p className="text-xs mt-1 text-center text-accent-text">Contacts</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="w-[35px] h-[35px] bg-foreground flex justify-center items-center p-2 border border-muted-border rounded-md hover:bg-foreground-highlight cursor-pointer">
                        <Phone className="!w-[35px] !h-[35px] text-accent-text"/>
                    </div>
                    <p className="text-xs mt-1 text-center text-accent-text">Contacts</p>
                </div>

            </div>
            <div className="w-full h-[45px] bg-foreground flex flex-row items-center border-t border-muted-border p-4 gap-2">
                <div className="w-[30px] h-[30px] rounded-2xl bg-background border border-muted-border overflow-hidden">
                    <img src={ProfilePic}/>
                </div>
                <p className="text-accent-text">
                    Ethan
                </p>
                <div className="grow"></div>
                <div className="w-[25px] h-[25px] p-1 hover:bg-foreground-highlight flex items-center justify-center rounded cursor-pointer">
                    <Power className="!w-[20px] !h-[20px] text-accent-text"/>
                </div>
            </div>
        </div>
    );
};