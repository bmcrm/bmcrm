import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IInventoryState {
	deletionCount: number;
	incrementDeletionCount: () => void;
	decrementDeletionCount: () => void;
}

const inventoryState = create<IInventoryState>()(
	devtools((set) => ({
		deletionCount: 0,
		incrementDeletionCount: () => set((state) => ({ deletionCount: state.deletionCount + 1 })),
		decrementDeletionCount: () => set((state) => ({ deletionCount: Math.max(0, state.deletionCount - 1) })),
	})),
);

export { inventoryState };