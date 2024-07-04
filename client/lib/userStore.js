import { create } from "zustand";

const useUserStore = create((set) => ({
  currentUsername: null,
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false });

    try {
      set({ currentUser: uid, isLoading: false });
      const response = await fetch("http://localhost:3000/getUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestFromUserID: uid }),
      });
      const data = await response.json();
      set({ currentUsername: data[0].username });
    } catch (err) {
      console.log(err.message);
    }
  },
}));

export default useUserStore;
