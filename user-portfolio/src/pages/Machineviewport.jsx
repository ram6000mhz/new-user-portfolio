import { Rnd } from "react-rnd";
import { IconComponent2 } from "../apps/IconComponent2";
import { apps } from "../apps/Applist";
import { useEffect, useRef } from "react";
import DesktopBg from "../assets/img/rice.png"
import { IconFun } from "../apps/IconFun";

export const Machineviewport = () => {
    console.log("Machineviewport rendered");

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
        console.log("Drag threshold met, setting dragging to true for appId:", id);
        setDragging(id,true);
    }

    const handleDragStop = (id) => {
        setDragging(id,false);
    }

    return (
        <div className="w-full h-full bg-cover bg-center flex flex-col relative" style={{ backgroundImage: `url(${DesktopBg})` }}>
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
                            console.log("Drag stopped for appId:", app.appid);
                            handleDragStop(app.appid);
                        }}
                        onDoubleclick={() => {
                            console.log("icon clicked");
                            console.log(app.appid);
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
                        <IconComponent2 AppIcon={app.icon} Title={app.title} appContent={app.content} appId={app.appid}/>
                    </Rnd>
            )})}
        </div>
    )
}