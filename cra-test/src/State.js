import create from 'zustand'

export const useStore = create(set => ({
    bears: 0,
    selectedBear : null,
    bearNames: ['teddy', 'bear', 'panda'],
    increasePopulation: () => set(state => ({
        bears: state.bears + 1
    })),
    removeAllBears: () => set({
        bears: 0
    }),
    selectRandomBear: () => set(state => {
        const randomIndex = Math.floor(Math.random() * state.bearNames.length);
        state.selectedBear = state.bearNames[randomIndex];
    }, )
}))