<template>
  <div>
    <header class="header">
      <h1>Posts</h1>
      <app-input v-model="searchQuery" placeholder="Search..." />
      <div class="app__btns">
        <app-select v-model="selectedSort" :options="sortOptions" />
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
        isLastPage: this.page < this.total,
      }"
      class="observer"
    ></div>
    <!-- <div class="page__wrapper">  // обычная пагинация
      динамическое добавление класса :class
      <div
        v-for="pageNumber in total"
        :key="pageNumber"
        class="page"
        :class="{
          'current-page': page === pageNumber,
        }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
import PostForm from "./../components/PostForm.vue";
import PostList from "./../components/PostList.vue";

export default {
  components: { PostForm, PostList },

  data() {
    return {
      dialogVisible: false,
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
      total: 0,
      posts: [],
    };
  },
  mounted() {
    console.log("mount");
    this.fetchPosts();

    // from https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API - register Intersection_Observer
    // const options = {
    //   rootMargin: "0px",
    //   threshold: 1.0,
    // };

    // // eslint-disable-next-line no-unused-vars
    // const callback = (entries, observer) => {
    //   if (entries[0].isIntersecting && this.page < this.total) {
    //     this.loadMorePosts();
    //   }
    // };

    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer);
  },
  // watch: {
  // наблюдатель, отрабатываемый на смену страницы и подгружающий посты
  // page() {
  //   this.fetchPosts();
  // },
  //   selectedSort(newValue) {
  //     // oтрабатывает в тот момет когда меняется модель selectedSort
  //     this.posts.sort((post1, post2) => {
  //       return post1[newValue]?.localeCompare(post2[newValue])
  //     });
  //   },
  computed: {
    sortedPosts() {
      //prevent init array mutaion (only new array will be mutated)
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(
          post2[this.selectedSort]
        );
      });
    },
    // в новом computed свойстве можем использовать старое computed свойство
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },

  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    inputTitle(e) {
      this.title = e.target.value;
    },
    inputDescription(e) {
      this.body = e.target.value;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    // changePage(clickedPage) { // обычная пагинация
    //   this.page = clickedPage;
    //   // можно подгружать посты с новой страницы здесь...
    //   // this.fetchPosts();
    // },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        // вычисляем количество страниц
        this.total = Math.ceil(response.headers["x-total-count"] / this.limit);
        this.posts = response.data;
        this.isPostsLoading = false;
      } catch (e) {
        console.log(e.error.message);
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        // вычисляем количество страниц
        this.total = Math.ceil(response.headers["x-total-count"] / this.limit);
        this.posts = [...this.posts, ...response.data]; // добавляем в конец массива свежие посты
      } catch (e) {
        console.log(e.error.message);
      }
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
</style>
