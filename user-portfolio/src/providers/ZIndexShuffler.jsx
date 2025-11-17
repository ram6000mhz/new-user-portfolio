import { createContext, useState, useContext, useEffect } from "react";

const ZIndexShufflerContext = createContext();

export const ZIndexShufflerProvider = ( {children} ) => {
    const [zMap, setZmap] = useState({});
    const [maxZ, setMaxZ] = useState(0);

    const bringToFront = (appIndex) => {
        setZmap(p=>({...p,[appIndex]:maxZ+1}));
        setMaxZ(p=>p+1);
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