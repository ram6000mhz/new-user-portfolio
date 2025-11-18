import { createContext, useState, useContext, useEffect } from "react";

const ZIndexShufflerContext = createContext();

export const ZIndexShufflerProvider = ( {children} ) => {
    const [zMap, setZmap] = useState({dummyobject: 0});
    const [maxZ, setMaxZ] = useState(0);

    useEffect(() => {
        console.log("zMap:", zMap);
        console.log("maxZ:", maxZ);
    }, [zMap, maxZ]);

    const bringToFront = (appIndex) => {

        const entries = Object.entries(zMap);
        const max = entries.length - 1;

        const newMap = {};
        for (const [k, v] of entries) {
            newMap[k] = v > zMap[appIndex] ? v - 1 : v;
        }
        newMap[appIndex] = max;

        setZmap(newMap);
    };

    const removeZIndexOnTerminate = (appIndex) => {

    };

    return(
        <ZIndexShufflerContext.Provider value={{zMap, bringToFront}}>
            {children}
        </ZIndexShufflerContext.Provider>
    )
}

export const useZIndexShuffler = () =>{
    return useContext(ZIndexShufflerContext);
}