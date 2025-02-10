import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IShiftState {
	deletionCount: number;
	incrementDeletionCount: () => void;
	decrementDeletionCount: () => void;
}

const shiftState = create<IShiftState>()(
	devtools((set) => ({
		deletionCount: 0,
		incrementDeletionCount: () => set((state) => ({ deletionCount: state.deletionCount + 1 })),
		decrementDeletionCount: () => set((state) => ({ deletionCount: Math.max(0, state.deletionCount - 1) })),
	})),
);

export { shiftState };