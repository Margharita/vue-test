import { createStore } from "vuex";

export default createStore({
  state: {
    // data in our App
  },
  getters: {
    // cashed computed values
  },
  mutations: {
    // functions where we can change values in the store
  },
  actions: {
    // functions which use mutations inside themselfs,
    // to make side effects e.g. get data from server API, call mutations and save data in state
  },
});
