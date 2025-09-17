import { create } from "zustand";
import apiInstance from "../lib/axios";
import { Producer,StoreState } from "@/types/types";



const useStore = create<StoreState>((set, get) => ({

  producers: [],
  
  getProducers: async () => {
    try {
      const response = await apiInstance.get<Producer[]>("/farmers");
      const producers: Producer[] = response.data;
      set({ producers }); // update the store
    } catch (err) {
      console.error("Failed to fetch producers:", err);
    }
  },

}));

export default useStore;


