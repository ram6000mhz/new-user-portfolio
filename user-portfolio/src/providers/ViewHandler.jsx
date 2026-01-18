
export const ViewHandler = create((set) => ({

    hr_Mode: false,

    toggleHrMode: () => set((state) => ({ hr_Mode: !state.hr_Mode })),

}))
