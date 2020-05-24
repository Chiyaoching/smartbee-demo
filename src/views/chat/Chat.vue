<template lang="pug">
  v-container(fluid)
    v-row
      v-col(cols="auto")
        v-btn(outlined @click="$router.push('/chat')" color="primary") Back To list
</template>

<script>
export default {
  mounted () {
    console.log(this.$router)
  }
}
</script>

<style lang="scss" scoped>

</style>