import { create } from "zustand";

const useUserStore = create((set) => ({
    currentUser: null,
    isLoading: true,
    fetchUserInfo: async (uid) => {
      if (!uid) return set({ currentUser: null, isLoading: false });
  
      try {
       set({ currentUser: uid, isLoading: false });
      } catch(err) {
        console.log(err.message)
      }
    },
  }));
  
  export default useUserStore;