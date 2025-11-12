import { Rnd } from "react-rnd";
import { IconComponent } from "../apps/IconComponent";
import { apps } from "../apps/Applist";
import { useState, useEffect } from "react";

export const Machineviewport=()=>{
    const [isDragging, setIsDragging] = useState(false);
    
    return(
        <div className="w-full h-full bg-background flex flex-col relative">
            
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
                        <IconComponent Children={app.icon} Title={app.title} isDragging={ isDragging } appIndex={index}/>
                    </Rnd>
                ))}
            
        </div>
    )
}
