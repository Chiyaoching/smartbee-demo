<template lang="pug">
  v-container(fluid)
    v-row
      v-col(cols="12")
        v-btn(outlined @click="addDialog = true" color="primary") Create Room

    v-data-table(
      :headers="headers"
      :items="roomList"
      :items-per-page="10"
      class="elevation-1")
      template(v-slot:item.actions="{ item }")
        v-btn.black--text(small color="primary" @click="roomEvents('chat', {id: item.id})")
          v-icon(:left="!smallWidth" small class="material-icons") chat_bubble_outline
          span(v-if="!smallWidth") Chat
        v-btn.ml-1(small outlined dark color="red" @click="roomEvents('remove', {id: item.id})")
          v-icon(:left="!smallWidth" small class="material-icons") delete
          span(v-if="!smallWidth") Delete

    v-dialog(v-model="addDialog" width="500")
      v-card()
        v-card-title(class="headline primary black--text" primary-title) Create New Room
        v-card-text
          v-container(  )
            v-row
              v-text-field(label="Room name" v-model="roomName")
        v-card-actions
          v-spacer
          v-btn(outlined @click="roomEvents('create', {name: roomName})" color="primary" :loading="isCreatingRoom") Create
            
              

</template>

<script>
import {db} from '@/plugins/firebase'

export default {
  data: () => ({
    headers: [
      { text: 'Name', align: 'start', width: '20%', value: 'name' },
      { text: '', align: 'end', sortable: false, value: 'actions' },
    ],
    rooms: [],
    addDialog: false,
    roomName: '',
    isCreatingRoom: false
  }),
  firestore: {
    message: db.collection('Messages'),
    rooms: db.collection('Rooms')
  },
  mounted () {
  },
  methods: {
    roomEvents (action, params) {
      console.log(params)
      switch (action) {
        case 'create':
          if (params.name !== '') {
            this.isCreatingRoom = true
            db.collection('Rooms').add({
              'name': params.name,
              'createTime': new Date()
            })
            .then(() => {
              console.log('success')
              this.roomName = ''
              this.addDialog = false
              this.isCreatingRoom = false
            })
          }
          break
        case 'remove':
          if (params.id !== '') {
            db.collection('Rooms').doc(params.id).delete()
          }
          break
        case 'chat':
          if (params.id !== '') {
            this.$router.push(`/chat/${params.id}`)
          }
          break
      }
    }
  },
  computed: {
    roomList () {
      return this.rooms
      .filter(item => item.name !== '')
      .map(item => ({
        id: item.id,
        name: item.name,
        createTime: item.createTime
      }))
    },
    smallWidth () {
      return this.$vuetify.breakpoint.smAndDown
    },
  }
}
</script>

<style lang="sass" scoped>

</style>