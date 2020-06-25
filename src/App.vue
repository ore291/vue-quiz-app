<template>
  <div id="app">
    <navbar/>
    <quiz/>
  </div>
</template>

<script>
import Quiz from './components/Quiz.vue'
import navbar from './components/navbar.vue'

export default {
  name: 'App',
  components: {
    Quiz,
    navbar
  }
}
</script>

<style>

</style>
