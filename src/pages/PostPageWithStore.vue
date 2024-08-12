<template>
  <div>
    <header class="header">
      <h1>Posts</h1>
      <!-- мы не можем использувать v-model здесь, тк изменять store state напрямую не через mutation нельзя -->
      <app-input
        v-focus
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Search..."
      />
      <div class="app__btns">
        <app-select
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="sortOptions"
        />
        <app-button class="create__btn" @click="showDialog"
          >Create post</app-button
        >
      </div>
    </header>
    <app-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"
    /></app-dialog>
    <!-- v-bind:prop - прокидывает пропсы в компонент |v-bind:prop === :prop| -->
    <!-- @delete - прослушка конечная и вызов функции в родительском компоненте -->
    <post-list
      :posts="sortedAndSearchedPosts"
      @delete="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else>Loading...</div>
    <!-- блок за которым следим чтобы определить что мы достигл конца страницы -->
    <!-- <div class="observer" ref="observer"></div> -->
    <div
      v-intersection="{
        loadMorePosts: loadMorePosts,
        isLastPage: page < totalPages,
      }"
      class="observer"
    ></div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import PostForm from "./../components/PostForm.vue";
import PostList from "./../components/PostList.vue";

export default {
  components: { PostForm, PostList },

  data() {
    return {
      dialogVisible: false,
    };
  },
  mounted() {
    console.log("mount");
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      isPostsLoading: (state) => state.post.isPostsLoading,
      searchQuery: (state) => state.post.searchQuery,
      selectedSort: (state) => state.post.selectedSort,
      sortOptions: (state) => state.post.sortOptions,
      // пагинация - page/limit/total
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
      posts: (state) => state.post.posts,
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortedAndSearchedPosts: "post/sortedAndSearchedPosts",
    }),
  },

  methods: {
    ...mapMutations({
      setPage: "post/setPage",
      setSearchQuery: "post/setSearchQuery",
      setSelectedSort: "post/setSelectedSort",
    }),
    ...mapActions({
      loadMorePosts: "post/loadMorePosts",
      fetchPosts: "post/fetchPosts",
    }),
    showDialog() {
      this.dialogVisible = true;
    },
    createPost(post) {
      this.store.state.post.posts.push(post);
      this.dialogVisible = false;
    },
    inputTitle(e) {
      this.title = e.target.value;
    },
    inputDescription(e) {
      this.body = e.target.value;
    },
    removePost(post) {
      this.store.state.post.posts = this.store.state.post.posts.filter(
        (p) => p.id !== post.id
      );
    },
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
.text__value {
  color: darksalmon;
}
</style>
