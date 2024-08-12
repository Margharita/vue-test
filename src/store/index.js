import { createStore } from "vuex";
import { postModule } from "./postModule";

export default createStore({
  state: {
    // data in our App
    likes: 2,
    isAuth: false,
  },
  getters: {
    // cashed computed values
    doubleLikes(state) {
      return state.likes * 2;
    },
  },
  mutations: {
    // functions where we can change values in the store
    incrementLikes(state) {
      state.likes += 1;
    },
    decrementLikes(state) {
      state.likes -= 1;
    },
  },
  actions: {
    // functions which use mutations inside themselfs,
    // to make side effects e.g. get data from server API, call mutations and save data in state
  },
  modules: {
    post: postModule,
    // piece of state with own getters, mutations and actions
  },
});
