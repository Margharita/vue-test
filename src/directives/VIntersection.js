export default {
  mounted(el, binding) {
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };

    // eslint-disable-next-line no-unused-vars
    const callback = (entries, observer) => {
      // && binding.value.isLastPage - don't working
      if (entries[0].isIntersecting) {
        binding.value.loadMorePosts();
      }
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  },
  name: "intersection",
};
