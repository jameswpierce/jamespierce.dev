<template>
  <Layout>
    <template #page-top>
      <div class="theme-default-content content__default posts">
        <div v-for="post in $pagination.pages" class="posts__post">
          <h2>
            <router-link class="post-link" :to="post.path">
              {{ post.frontmatter.title }} 
            </router-link>
          </h2>
          <h4><strong>{{ formatDate(post.frontmatter.date) }}</strong></h4>
          <p>{{ post.frontmatter.excerpt }}</p>
        </div>
        <div id="pagination">
          <router-link v-if="$pagination.hasPrev" :to="$pagination.prevLink"
            >Prev</router-link
          >
          <router-link v-if="$pagination.hasNext" :to="$pagination.nextLink"
            >Next</router-link
          >
        </div>
      </div>
    </template>
  </Layout>
</template>
<script>
import Layout from "@theme/layouts/Layout.vue";

export default {
  components: {
    Layout
  },
  methods: {
    formatDate(date) {
      const d = new Date(date);
      return `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`
    }
  }
};
</script>