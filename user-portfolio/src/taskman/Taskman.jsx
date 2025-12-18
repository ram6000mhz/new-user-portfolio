import {create} from 'zustand';

export const Taskman = create((set,get) => ({
    taskman: [],

    addTask: (appId) => {
        set((state) => ({
            taskman:[...state.taskman, appId]
        }))
    },

    terminateTask: (appId) => {
        set((state) => ({
            taskman:state.taskman.filter((id)=> id !== appId)
        }))
    },
    
}))