<template lang="pug">
  v-app-bar(app)
    v-avatar
      v-img(:src="require('@/assets/img/smartbee.png')")
    v-tabs
      v-tab(v-for="item in pages" :key="item.link" link :to="item.link") {{item.text}}
    v-spacer
    v-avatar(color="primary")
      span(class="black--text") User
</template>

<script>
export default {
  props: {
  },
  data: () => ({
  }),
  computed: {
    pages () {
      return this.$store.getters.getPageList
    }
  },
  methods: {
  }
}
</script>