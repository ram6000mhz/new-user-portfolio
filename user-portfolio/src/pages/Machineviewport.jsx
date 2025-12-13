import { Rnd } from "react-rnd";
import { IconComponent2 } from "../apps/IconComponent2";
import { apps } from "../apps/Applist";
import { useState} from "react";
import DesktopBg from "../assets/img/desktop-bg.webp"
import { useIconStore } from "../apps/IconFun";


export const Machineviewport=()=>{
    console.log("Machineviewport rendered");

    const handleClick =
        useIconStore(state => state.handleClick);
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
                        // onDragStart={() => {//culprit
                        //     handleDragStart(app.appid);
                        // }}
                        
                        // onDragStop={() => {////culprit
                        //     handleDragStop(app.appid);
                        // }}
                        onDoubleclick={() => {
                            console.log("icon clicked");
                            console.log(app.appid);
                            handleClick(app.appid);
                        }}
                        key={index}
                        bounds="parent"
                        enableResizing={false}
                        default={{
                            x: 0,
                            y: index * 60,
                        }}
                    >
                        <IconComponent2 AppIcon={app.icon} Title={app.title} appContent={app.content} isDragging={ !!draggingIds[app.appid] } appIndex={app.appid}/>
                    </Rnd>
            )})}
        </div>
    )
}
