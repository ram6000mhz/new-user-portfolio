import {create} from 'zustand';

export const taskman = create((set,get) => ({
    taskman: {},

    addTask: (taskId, taskData) => {
        set(s => ({
            taskman: {
                ...s.taskman,
                [taskId]: taskData,
            },
        }));
    }
    
}))