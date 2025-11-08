import { Rnd } from "react-rnd";
import { IconComponent } from "../apps/IconComponent";
import { apps } from "../apps/Applist";

export const Machineviewport=()=>{
    return(
        <div className="w-full h-full bg-background flex flex-col relative">
            
                {apps.map((app, index) => (
                    <Rnd 
                        onDragStart={(e, data) => {
                            // Called when drag starts
                            console.log('Drag started at:', data.x, data.y);
                        }}
                        
                        onDrag={(e, data) => {
                            // Called continuously while dragging
                            console.log('Dragging at:', data.x, data.y);
                        }}
                        
                        onDragStop={(e, data) => {
                            // Called when drag ends
                            console.log('Drag stopped at:', data.x, data.y);
                        }}
                        
                        key={index}
                        bounds="parent"
                        enableResizing={false}
                        default={{
                            x: 0,
                            y: index * 50,
                        }}
                    >
                        <IconComponent Children={app.icon} Title={app.title}/>
                    </Rnd>
                ))}
            
        </div>
    )
}
