<template>
  <div>
    <header class="header">
      <h1>Posts</h1>
      <app-input v-focus v-model="searchQuery" placeholder="Search..." />
      <div class="app__btns">
        <app-select v-model="selectedSort" :options="sortOptions" />
      </div>
    </header>
    <post-list :posts="sortedAndSearchedPosts" v-if="!isPostsLoading" />
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import usePosts from "./../hooks/usePosts";
import useSortedPosts from "./../hooks/useSortedPosts";
import useSortedAndSearchedPosts from "./../hooks/useSortedAndSearchedPosts";

export default {
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: "title", name: "By name" },
        { value: "body", name: "By description" },
      ],
    };
  },
  setup() {
    const { posts, total, isPostsLoading } = usePosts(10);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } =
      useSortedAndSearchedPosts(sortedPosts);
    return {
      posts,
      isPostsLoading,
      total,
      sortedPosts,
      selectedSort,
      sortedAndSearchedPosts,
      searchQuery,
    };
  },
};
</script>

<style>
.header {
  display: flex;
  flex-direction: column;
  margin: 15px 0;
}

.app__btns {
  align-self: flex-end;
  display: flex;
  justify-content: space-between;
  width: 250px;
  padding-top: 15px;
}
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  padding: 10px;
  border: 1px solid black;
  cursor: pointer;
}
.current-page {
  border: 1px solid teal;
  background-color: ghostwhite;
  color: darkcyan;
}
.observer {
  height: 30px;
  background-color: gray;
  visibility: hidden;
}
</style>
