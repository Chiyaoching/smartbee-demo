<template lang="pug">
  v-footer(app)
    v-spacer
    span Seven.Chi for SmartBee &copy; {{year}}
</template>

<script>
import moment from 'moment'

export default {
  data: () => ({
    year: moment().format('YYYY')
  })
}
</script>