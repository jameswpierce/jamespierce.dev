module.exports = {
  title: "James Willard Pierce",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Blog", link: "/posts/" },
      { text: "Contact", link: "mailto:hello@jamespierce.dev" }
    ]
  },
  plugins: [
    [
      "@vuepress/blog",
      {
        directories: [
          {
            id: "post",
            dirname: "_posts",
            path: "/posts/",
            itemPermalink: "/posts/:slug"
          }
        ]
      }
    ]
  ]
};
