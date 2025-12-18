import {create}  from 'zustand';

export const ZIndexShuffler = create(( set, get ) => ({
    zMap: {dummyobject: 0 },
    bringToFront: ((appId) => {
        set((state) => {
            const entries = Object.entries(state.zMap);
            const max = entries.length - 1;
            const targetZ = state.zMap[appId];

            if (targetZ === max) return state;

            const newMap = {};
            for (const [k, v] of entries) {
                newMap[k] = v > targetZ ? v - 1 : v;
            }
            newMap[appId] = max;
            return { zMap: newMap };
        })
    }),

    removeAppZmap: (appId) =>
        set((state) => {
        const { [appId]: removedZ, ...remainingMap } = state.zMap;
        if (removedZ === undefined) return state;

        const newMap = {};
        for (const [k, v] of Object.entries(remainingMap)) {
            newMap[k] = v > removedZ ? v - 1 : v;
        }
        return { zMap: newMap };
        }),
}))