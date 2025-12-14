import { Rnd } from "react-rnd";
import { IconComponent2 } from "../apps/IconComponent2";
import { apps } from "../apps/Applist";
import { useState, useEffect } from "react";
import DesktopBg from "../assets/img/desktop-bg.webp"
import { IconFun } from "../apps/IconFun";

export const Machineviewport = () => {
    console.log("Machineviewport rendered");

    const {setDragging, initializeApp} = IconFun.getState();
    useEffect(() => {
        apps.forEach(app => {
            initializeApp(app.appid);
        });
    }, []);

    const handleDragStart = (id) => {
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
                        onDragStart={() => {
                            handleDragStart(app.appid);
                        }}
                        
                        onDragStop={() => {
                            handleDragStop(app.appid);
                        }}
                        onDoubleclick={() => {
                            console.log("icon clicked");
                            console.log(app.appid);
                        }}
                        key={index}
                        bounds="parent"
                        enableResizing={false}
                        default={{
                            x: 0,
                            y: index * 60,
                        }}
                    >
                        <IconComponent2 AppIcon={app.icon} Title={app.title} appContent={app.content} appIndex={app.appid}/>
                    </Rnd>
            )})}
        </div>
    )
}