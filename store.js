import { create } from 'zustand'

const useStore = create((set) => ({
  // user/subscription info
  subscription: null,
  userInfo: null,
  setSubscription: (subscription) => set({ subscription }),
  setUserInfo: (userInfo) => set({ userInfo }),
  // History
  history: [],
  setHistory: (history) => set({ history }),
}));

export default useStore;