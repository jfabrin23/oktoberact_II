<template>
  <div id='app'>
    <router-view></router-view>
  </div>
</template>

<script>
import Firebase from 'firebase'
let config = {
  apiKey: 'AIzaSyDDqlgTs04hmZzuFnLbZD8-3XkXtBcL4os',
  authDomain: 'oktoberact-13af8.firebaseapp.com',
  databaseURL: 'https://oktoberact-13af8.firebaseio.com',
  projectId: 'oktoberact-13af8',
  storageBucket: 'oktoberact-13af8.appspot.com',
  messagingSenderId: '326792147321'
}
Firebase.initializeApp(config)
export default {
  name: 'app'
}
</script>

<style>

</style>
