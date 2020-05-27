<template lang="pug">
  v-container(fluid)
    v-row
      v-col(cols="auto")
        v-btn(outlined @click="$router.push('/chat')" color="primary") Back To list

    v-row(justify="center")
      v-col(cols="auto")
        v-card(width="800")
          v-card-text
            v-row(style="padding-bottom: 50px")
              v-col(cols="12")
                v-card#chatArea(height="500" color="grey" style="overflow-y: auto")
                  v-card-text
                    v-row(v-for="(item, index) in messages" :key="item.msg + index" :justify="item.isSelf ? 'end' : 'start'" v-if="userInfo")
                      v-col(cols="auto")
                        h4(:class="item.isSelf ? 'text-right' : 'text-left'") {{item.username}}
                        v-chip(class="ma-2" :outlined="!item.isSelf" :color="!item.isSelf ? 'black' : ''" label v-if="!item.image") {{item.msg}}
                        img(:src="item.image" :width="imgWidth" contain v-else)
                      
            v-row.input-line(align="baseline" :class="isExtend ? 'extend' : ''")
              v-btn.mx-5(icon @click="isExtend = true" )
                v-icon insert_photo
              v-btn.mx-5(icon @click="isExtend = true" )
                v-icon mood
              v-text-field(v-model="inputMsg")
              v-btn.mx-5(icon @click="sendMsg" )
                v-icon send
              v-col(cols="12" v-show="isExtend")
                v-row.justify-space-around
                  v-col.justify-center(cols="auto" v-for="(item, index) in allImages" :key="`image${index}`")
                    v-img(:id="`image${index+1}`" :src="require(`@/assets/img/${item}.png`)" width="100" @click="sendImage(item)")
                    canvas(:id="`cimage${index+1}`" style="display: none")
          //- v-overlay(:value="isExtend" z-index="1" @click="isExtend = false")
          div.overlay(v-show="isExtend" @click="isExtend = false")
                  

</template>

<script>
import {db} from '@/plugins/firebase'

export default {
  data: () => ({
    inputMsg: '',
    roomId: '',
    allImages: ['image1', 'image2', 'image3'],
    messages: [],
    allMessages: [],
    isExtend: false,
    imgHeight: 120,
    imgWidth: 120
  }),
  firestore: {
    allMessages: db.collection('Messages').orderBy('createTime')
  },
  mounted () {
    this.roomId = this.$route.params.roomId
    // db.collection('Messages')
    //   .get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach((doc) => {
    //       console.log(doc.data())
    //       this.messages.push({...doc.data(), isSelf: true})
    //     })
    //   })
    console.log(this.userInfo)
  },
  computed: {
    userInfo () {
      return this.$store.getters.getUserObj
    }
  },
  methods: {
    sendMsg () {
      if (this.inputMsg) {
        db.collection('Messages').add({
          roomId: this.roomId,
          userId: this.userInfo.userId,
          username: this.userInfo.name,
          msg: this.inputMsg,
          image: '',
          createTime: Date.now()
        })
        .then(() => {
          console.log('success')
          this.inputMsg = ''
        })
      }
    },
    sendImage (item) {
      this.__convertImgtoBase64(item)
      .then(base64 => {
        db.collection('Messages').add({
          roomId: this.roomId,
          userId: this.userInfo.userId,
          username: this.userInfo.name,
          msg: '',
          image: base64,
          createTime: Date.now()
        })
      }).then(() => {
        console.log('success')
        this.isExtend = false
      }).catch(err => {
        console.error(err)
      }) 
    },
    __convertImgtoBase64 (image) {
      return new Promise((resolve, reject) => {
        try {
          let canvas = document.getElementById('c' + image)
          let ctx = canvas.getContext('2d')
          let img = new Image()
          img.onload = () => {
            canvas.height = img.height
            canvas.width = img.width
            ctx.drawImage(img,0,0, img.height, img.width)
            resolve(canvas.toDataURL())
          }
          img.height = this.imgHeight
          img.width = this.imgWidth
          img.src = require(`@/assets/img/${image}.png`)
        } catch (err) {
          reject(err)
        }
      })
    }
  },
  watch: {
    'allMessages' (value) {
      if (this.userInfo) {
        this.messages = value
          .filter(item => item.roomId === this.roomId)
          .map(item => ({...item, isSelf: item.userId === this.userInfo.userId}))
          setTimeout(() => {
            document.getElementById('chatArea').scrollTop = document.getElementById('chatArea').scrollHeight
          }, 100)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .input-line
    background-color: #1e1e1e
    position: absolute
    bottom: 0
    width: calc(100% - 8px)
    z-index: 2
    height: 66px
    transition: .5s
    &.extend
      height: 220px
  .overlay
    width: 100%
    height: 100%
    position: absolute
    top: 0
    left: 0
    background-color: rgba(30, 30, 30, 0.6)
</style>