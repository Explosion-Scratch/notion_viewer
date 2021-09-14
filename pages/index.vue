<template>
  <div id="container">
    <Loader :loading="loading"></Loader>
    <template v-if="blockMap && Object.keys(blockMap) && title">
      <div
        @click="goBack()"
        class="
        text-white
          transition-all
          duration-300
          icon
          p-2
          hover:backdrop-blur-lg hover:bg-[#fff5]
          absolute
          top-5
          left-5
          rounded
          cursor-pointer
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23a1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z"
          />
        </svg>
      </div>
      <div class="notion -mt-1">
        <NotionRenderer :blockMap="blockMap" fullPage />
      </div>
    </template>
    <div
      v-else-if="!query"
      class="flex justify-center items-center flex-col h-screen"
    >
      <h1 class="text-2xl text-gray-700 text-center font-light">Hello!</h1>
      <i class="italic text-gray-500 text-center"
        >This app is a viewer for notion articles, please enter an ID below:</i
      >
      <input
        spellcheck="false"
        @keyup.enter="goTo($event.target.value)"
        type="text"
        placeholder="Enter an article ID here"
        class="
          w-96
          mt-2
          opacity-60
          hover:opacity-100
          focus:opacity-100
          placeholder-gray-400
          p-2
          px-3
          italic
          text-gray-400
          rounded
          border-2 border-gray-400
          focus:ring-4 focus:shadow-lg
          shadow-lg
          focus:outline-none
          ring-opacity-5
          focus:ring-gray-200
          transition-all
          outline-none
        "
      />
    </div>
    <div v-else class="flex justify-center items-center flex-col h-screen">
      <h1 class="text-2xl text-gray-700 text-center font-light">
        No article found!
      </h1>
      <i class="italic text-gray-500 text-center"
        >The article may not be public or it may not exist. Feel free to enter
        an article ID below:</i
      >
      <input
        spellcheck="false"
        @keyup.enter="goTo($event.target.value)"
        type="text"
        placeholder="Enter an article ID here"
        class="
          w-96
          mt-2
          opacity-60
          hover:opacity-100
          focus:opacity-100
          placeholder-gray-400
          p-2
          px-3
          italic
          text-gray-400
          rounded
          border-2 border-gray-400
          focus:ring-4 focus:shadow-lg
          shadow-lg
          focus:outline-none
          ring-opacity-5
          focus:ring-gray-200
          transition-all
          outline-none
        "
      />
    </div>
  </div>
</template>

<script>
import Loader from "../components/Loader.vue";
export default {
  components: {Loader},
  data: () => ({ blockMap: null, title: null, emoji: null, query: null, loading: true }),
  head() {
    return {
      title: this.title
        ? `${this.emoji || ""} ${this.title}`
        : this.query
        ? "Article not found!"
        : "Notion Article Viewer",
    };
  },
  async asyncData({ $notion, query }) {
    var id = query.q;
    console.log("Query found");
    if (!query.q) return { query: false, loading: false };
    // use Notion module to get Notion blocks from the API via a Notion pageId
    const blockMap = await $notion.getPageBlocks(id);
    console.log(blockMap);
    var title, emoji;
    try {
      title = blockMap[Object.keys(blockMap)[0]].value.properties.title[0][0];
      emoji = blockMap[Object.keys(blockMap)[0]].value.format.page_icon;
    } catch (e) {}
    var data = { blockMap, title, emoji, query: id, $notion, loading: false };
    console.log(data);
    return data;
  },
  methods: {
    async goTo(id) {
      this.loading = true;
      console.log("Going to: " + id);
      if (!id) return (this.query = false);
      // use Notion module to get Notion blocks from the API via a Notion pageId
      const blockMap = await this.$notion.getPageBlocks(id);
      console.log(blockMap);
      var title, emoji;
      try {
        title = blockMap[Object.keys(blockMap)[0]].value.properties.title[0][0];
        emoji = blockMap[Object.keys(blockMap)[0]].value.format.page_icon;
      } catch (e) {}
      if (process.browser) {
        history.replaceState({}, "Notion viewer", `?q=${id}`);
      }
      this.blockMap = blockMap;
      this.title = title;
      this.emoji = emoji;
      this.query = id;
      setTimeout(() => this.loading = false, 1000);
    },
    goBack() {
      this.loading = true;
      this.blockMap = null;
      this.title = null;
      this.emoji = null;
      this.query = null;
      if (process.browser) {
        history.replaceState({}, "Notion viewer", ``);
      }
      setTimeout(() => (this.loading = false), 1000)
    },
  },
};
</script>

<style>
@import "vue-notion/src/styles.css"; /* optional Notion-like styles */
</style>
