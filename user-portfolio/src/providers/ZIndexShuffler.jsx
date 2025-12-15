import {create}  from 'zustand';

export const ZIndexShuffler = create(( set, get ) => ({
    zMap: {dummyobject: 0 },
    bringToFront: (appIndex) => set((state) => {
        const { zMap } = state;
        const currentZ = zMap[appIndex];
        const entries = Object.entries(zMap);
        const maxZ = entries.length - 1;

        if (currentZ === maxZ) {
            return state; 
        }

        const newMap = {};
        for (const [k, v] of entries) {
            if (k === appIndex) {
                newMap[k] = maxZ;
            } 
            else if (v > currentZ) {
                newMap[k] = v - 1;
            }
            else {
                newMap[k] = v;
            }
        }
        console.log(get().zMap)
        return { zMap: newMap };
    }),

    removeZIndexOnTerminate: (appIndex) => set((state) => {
        const { zMap } = state;

        if (!(appIndex in zMap)) {
            return state;
        }

        const zToRemove = zMap[appIndex];
        const newMap = {};
        
        for (const [k, v] of Object.entries(zMap)) {
            if (k === appIndex) {
                continue;
            }
            if (v > zToRemove) {
                newMap[k] = v - 1;
            } 
            else {
                newMap[k] = v;
            }
        }

        return { zMap: newMap };
    }),
}))