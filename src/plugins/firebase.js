import Vue from 'vue'
import {firestorePlugin} from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDG8dXPZ4SGiMqdb-DW3j7CGlAS6RvKHk0",
  authDomain: "smartbee-d9733.firebaseapp.com",
  databaseURL: "https://smartbee-d9733.firebaseio.com",
  projectId: "smartbee-d9733",
  storageBucket: "smartbee-d9733.appspot.com",
  messagingSenderId: "687189098154",
  appId: "1:687189098154:web:7209764b7bab9139bc9ad3",
  measurementId: "G-2K2VK4M5Y1"
}
const firebaseApp = firebase.initializeApp(firebaseConfig)
// global register
window.firestore = firebaseApp.firestore()

Vue.use(firestorePlugin)
