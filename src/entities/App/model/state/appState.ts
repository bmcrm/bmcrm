import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IAppState {
	modalCount: number;
	incrementModalCount: () => void;
	decrementModalCount: () => void;
	resetModalCount: () => void;
}

const appState = create<IAppState>()(
	devtools((set) => ({
		modalCount: 0,
		incrementModalCount: () => set((state) => ({ modalCount: state.modalCount + 1 })),
		decrementModalCount: () => set((state) => ({ modalCount: Math.max(0, state.modalCount - 1) })),
		resetModalCount: () => set(() => ({ modalCount: 0 })),
	})),
);

export { appState };