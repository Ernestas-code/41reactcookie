import {create} from 'zustand'

const useStore = create((set) => ({
    bears: 0,
    apples: 0,
    bananas: 0,
    oranges: 0,
    items: [],
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    updateBears: (newBears) => set({ bears: newBears }),

    increaseApple: () => set((state) => ({ apples: state.apples + 1 })),
    setApples: (newValue) => set({ apples: newValue }),

    increaseBanana: () => set((state) => ({ bananas: state.bananas + 1 })),
    setBananas: (newValue) => set({ bananas: newValue }),

    increaseOrange: () => set((state) => ({ oranges: state.oranges + 1 })),
    setOranges: (newValue) => set({ oranges: newValue }),
addItem: (name,color) =>
    set((state) => ({
        items: [...state.items, { name, color }],
    })),

}));

export {useStore}