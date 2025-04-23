import { create } from 'zustand'
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (username) => set({ user: { name: username } }),
      logout: () => set({ user: null }),
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore