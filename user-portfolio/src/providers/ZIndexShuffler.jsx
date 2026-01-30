import {create}  from 'zustand';

export const ZIndexShuffler = create((set) => ({
    zMap: {},
    maxZ: 0,
    
    bringToFront: (appId) => set((state) => {
        if (state.zMap[appId] === state.maxZ && state.maxZ !== 0) return state;

        const nextZ = state.maxZ + 1;
        return {
            maxZ: nextZ,
            zMap: { 
                ...state.zMap, 
                [appId]: nextZ 
            }
        };
    }),

    removeAppZmap: (appId) => set((state) => {
        const newMap = { ...state.zMap };
        delete newMap[appId];
        return { zMap: newMap };
    }),

    shutdownZIndexShuffler: () => set({ 
        zMap: {}, 
        maxZ: 0 
    })    
}));