import { action, createStore } from "easy-peasy";

export default createStore({
  isLoading: false,
  setLoading: action((state: any) => {
    state.isLoading = true;
  }),
  clearLoading: action((state: any) => {
    state.isLoading = false;
  }),
});
