import { create } from 'zustand'

const useStore = create((set) => ({
  subscription: null,
  userInfo: null,
  setSubscription: (subscription) => set({ subscription }),
  setUserInfo: (userInfo) => set({ userInfo }),
}));

export default useStore;