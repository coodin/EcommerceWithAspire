import { create } from "zustand";

type State = {
  loading: "Started" | "Loading" | "Finsihed" | "Error";
};

type Action = {
  setLoading: (loadingPayload: State["loading"]) => void;
};

export const useLoading = create<State & Action>((set) => ({
  loading: "Started",
  setLoading: (loadingPayload) => set(() => ({ loading: loadingPayload })),
}));
