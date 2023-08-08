import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type SidebarStore = {
    isOpen: boolean;
    toggleSidebar: () => void;
    setIsOpen: (isOpen: boolean) => void;
};

export const useSidebarStore = create<SidebarStore>()(
    persist(
        (set) => ({
            isOpen: false,
            setIsOpen: (isOpen) => set({ isOpen }),
            toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
        }),
        {
            name: 'sidebar-store',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
