import { Rnd } from "react-rnd";
import { IconComponent } from "../apps/IconComponent";
import { apps } from "../apps/Applist";
import { useState, useEffect } from "react";
import DesktopBg from "../assets/img/desktop-bg.webp"

export const Machineviewport=()=>{
    const [isDragging, setIsDragging] = useState(false);
    
    return(
        <div className="w-full h-full bg-cover bg-center flex flex-col relative" style={{ backgroundImage: `url(${DesktopBg})` }}>
            
                {apps.map((app, index) => (
                    <Rnd 
                        onDragStart={() => {
                            setIsDragging(true);
                        }}
                        
                        onDragStop={() => {
                            setIsDragging(false);
                        }}
                        
                        key={index}
                        bounds="parent"
                        enableResizing={false}
                        default={{
                            x: 0,
                            y: index * 60,
                        }}
                    >
                        <IconComponent Children={app.icon} Title={app.title} appContent={app.content} isDragging={ isDragging } appIndex={app.appid}/>
                    </Rnd>
                ))}
            
        </div>
    )
}
