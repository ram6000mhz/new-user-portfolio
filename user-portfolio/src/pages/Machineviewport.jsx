import { Rnd } from "react-rnd";
import { IconComponent } from "../apps/IconComponent";
import { apps } from "../apps/Applist";
import { useEffect, useRef } from "react";
import DesktopBg from "../assets/img/rice.webp"
import { IconFun } from "../apps/IconFun";

export const Machineviewport = () => {
    const viewportRef = useRef(null);

    const {setDragging, initializeApp, open} = IconFun.getState();
    useEffect(() => {
        apps.forEach(app => {
            initializeApp(app.appid);
        });
    }, []);

    const startPos = useRef({ x: 0, y: 0 });
    const isDragThresholdMet = useRef(false); 
    const DRAG_THRESHOLD = 5;

    const handleDragStart = (id) => {
        setDragging(id,true);
    }

    const handleDragStop = (id) => {
        setDragging(id,false);
    }

    return (
        <div 
            ref={viewportRef}
            className="w-full h-full bg-cover bg-center flex flex-col relative" style={{ backgroundImage: `url(${DesktopBg})` }}>
            {apps.map((app, index) => {
                return (
                    <Rnd 
                        onDragStart={(e,data) => {
                            startPos.current = { x: data.x, y: data.y };
                            isDragThresholdMet.current = false;
                        }}

                        onDrag={(e, data) => {
                            if (isDragThresholdMet.current) return;
                            if (isDragThresholdMet.current) return;
                            const distance = Math.hypot(
                                data.x - startPos.current.x, 
                                data.y - startPos.current.y
                            );
                            if (distance > DRAG_THRESHOLD) {
                                isDragThresholdMet.current = true;
                                handleDragStart(app.appid);
                            }
                        }}
                        
                        onDragStop={() => {
                            if (!isDragThresholdMet.current) return;
                            handleDragStop(app.appid);
                        }}
                        onDoubleclick={() => {
                            open(app.appid);
                        }}
                        key={index}
                        bounds="parent"
                        enableResizing={false}
                        default={{
                            x: 0,
                            y: index * 60,
                        }}
                    >
                        <IconComponent AppIcon={app.icon} Title={app.title} appContent={app.content} appId={app.appid} viewportRef={viewportRef}/>
                    </Rnd>
            )})}
        </div>
    )
}