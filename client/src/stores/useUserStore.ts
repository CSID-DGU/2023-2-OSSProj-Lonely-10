import { create, StateCreator } from "zustand";

interface UserStore {
  userInfo: string;
  setUser: (newCode: string) => void;
}

const createStore: StateCreator<UserStore> = (set, get, api) => ({
  userInfo: "",
  setUser: (newCode: string) => set({ userInfo: newCode }),
});

const useUserStore = create<UserStore>(createStore);

export { useUserStore };
