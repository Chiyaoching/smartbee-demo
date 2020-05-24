<template lang="pug">
  v-navigation-drawer(
    :value="drawerFlag"
    temporary
    app
    overflow
    @input="updateDrawerFlag"
  )
    v-row.my-5
      v-col(cols="12")
        v-row(justify="center")
          v-avatar(size="100px")
            v-img(:src="require('@/assets/img/smartbee.png')" position="left")
    v-list(dense)
      v-list-item-group(v-model="role")
        template(v-for="item in roles")
          v-list-item(:key="item.text" :value="item" link :to="item.link" v-if="item.link")
            v-list-item-content
              v-list-item-title {{item.text}}
          v-subheader(class="mt-4 grey--text text--darken-1" v-else)
            h2 {{item.text}}

    template(v-slot:append)
      v-row.pa-2
        v-col.version-block(cols="auto")
          div
            span.font-weight-bold Web:
            span.ml-1 dev
          div
            span.font-weight-bold Server:
            span.ml-1 firebase
</template>

<script>

export default {
  props: {
    drawerFlag: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    roles () {
      return this.$store.getters.getRoleList
    },
    role: {
      get () {
        return this.$store.getters.getCurrentRole
      },
      set (value) {
        this.$store.commit('SET_CURRENT_ROLE', value)
      }
    }
  },
  methods: {
    updateDrawerFlag (event) {
      this.$emit('update:drawerFlag', event)
    }
  },
  watch: {
    'role' (value) {
      this.$emit('update:role', value)
    }
  }
}
</script>

<style lang="sass" scoped>
  .version-block
    font-size: 10px
    color: #6a6a6a
</style>