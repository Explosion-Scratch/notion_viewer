export default {
  ssr: false,
  // Telemetry (https://github.com/nuxt/telemetry)
  telemetry: false,
  router: {
    base: '/notion_viewer/'
  },
  loadingIndicator: {
    name: 'folding-cube',
    color: '#3B8070',
    background: 'white'
  },
  build: {
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
        preserveLineBreaks: false,
        collapseWhitespace: true
      }
    },
 },
  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "😁 Notion viewer!",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "A cool site!" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/notion_viewer/app-icon.jpg" }],
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ["vue-notion/nuxt", '@nuxtjs/tailwindcss', "@nuxtjs/pwa"],

  // Plugins (e.g. vue-katex for equations)
  plugins: ["~/plugins/vue-katex.js"],
  pwa: {
    icon: {
      fileName: 'app-icon.jpg',
    }
  }
};
