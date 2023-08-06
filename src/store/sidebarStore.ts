import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type SidebarStore = {
    isOpen: boolean;
    toggleSidebar: () => void;
};

export const useSidebarStore = create<SidebarStore>()(
    persist(
        (set) => ({
            isOpen: false,
            toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
        }),
        {
            name: 'sidebar-store',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
