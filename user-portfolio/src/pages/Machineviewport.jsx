import { Rnd } from "react-rnd";
import { IconComponent } from "../apps/IconComponent";
import { apps } from "../apps/Applist";
import { useState} from "react";
import DesktopBg from "../assets/img/desktop-bg.webp"

export const Machineviewport=()=>{
    const [draggingIds, setDraggingIds] = useState({});

    const handleDragStart = (id) => {
        setDraggingIds(prev=>({ ...prev, [id]: true}));
    }

    const handleDragStop = (id) => {
        setDraggingIds(prev=>({ ...prev, [id]: false}));
    }

    return(
        <div className="w-full h-full bg-cover bg-center flex flex-col relative" style={{ backgroundImage: `url(${DesktopBg})` }}>
            {apps.map((app, index) => {
                return(
                    <Rnd 
                        onDragStart={() => {
                            handleDragStart(app.appid);
                        }}
                        
                        onDragStop={() => {
                            handleDragStop(app.appid);
                        }}
                        
                        key={index}
                        bounds="parent"
                        enableResizing={false}
                        default={{
                            x: 0,
                            y: index * 60,
                        }}
                    >
                        <IconComponent AppIcon={app.icon} Title={app.title} appContent={app.content} isDragging={ !!draggingIds[app.appid] } appIndex={app.appid}/>
                    </Rnd>
            )})}
        </div>
    )
}
