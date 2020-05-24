<template lang="pug">
  v-app-bar(app)
    v-app-bar-nav-icon(@click.stop="drawerController")
    v-toolbar-title {{role && role.text}}
    //- v-row(style="position: absolute; width: 100%; z-index: -1" v-if="role && role.type === 'player'")
    //-   v-col(cols="12")
    //-     v-row(justify="center")
    //-       v-toolbar-title {{headerText}}
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
    role: {
      get () {
        return this.$store.getters.getCurrentRole
      },
      set (value) {
        this.$store.commit('SET_CURRENT_ROLE', value)
      }
    },
    headerText () {
      return this.$store.getters.getHeaderText
    }
  },
  methods: {
    drawerController () {
      this.$emit('update:drawerFlag', !this.drawerFlag)
    }
  }
}
</script>