import { ref, onMounted } from "vue";
import axios from "axios";

export default function usePosts(limit) {
  const posts = ref([]);
  const total = ref(0);
  const isPostsLoading = ref(true);
  const fetching = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _page: 0,
            _limit: limit,
          },
        }
      );
      // вычисляем количество страниц
      total.value = Math.ceil(response.headers["x-total-count"] / limit);
      posts.value = response.data;
      // isPostsLoading.value = false;
    } catch (e) {
      console.log(e.error.message);
    } finally {
      isPostsLoading.value = false;
    }
  };
  onMounted(fetching);
  // onCreated();
  // computed();
  // watch();
  console.log(posts.value);
  return {
    posts,
    isPostsLoading,
    total,
  };
}
