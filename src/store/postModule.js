import axios from "axios";

export const postModule = {
  state: () => ({
    isPostsLoading: false,
    searchQuery: "",
    selectedSort: "",
    sortOptions: [
      { value: "title", name: "By name" },
      { value: "body", name: "By description" },
    ],
    // пагинация - page/limit/total
    page: 1,
    limit: 10,
    totalPages: 0,
    posts: [],
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) => {
        return post1[state.selectedSort]?.localeCompare(
          post2[state.selectedSort]
        );
      });
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, bool) {
      state.isPostsLoading = bool;
    },
    setPage(state, page) {
      state.page = page;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setTotalPages(state, total) {
      state.totalPages = total;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit("setLoading", true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        // вычисляем количество страниц
        commit(
          "setTotalPages",
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
        commit("setPosts", response.data);
        commit("setLoading", false);
      } catch (e) {
        console.log(e.error.message);
      }
    },
    async loadMorePosts({ state, commit }) {
      try {
        commit("setPage", (state.page += 1));
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        // вычисляем количество страниц
        commit(
          "setTotalPages",
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
        commit("setPosts", [...state.posts, ...response.data]); // добавляем в конец массива свежие посты
      } catch (e) {
        console.log(e.error.message);
      }
    },
  },
  namespaced: true,
};
