<template>
  <div>
      <h1 mt-5>{{this.title.toUpperCase()}}</h1>
      <h4 mb-5> You have 30mins to answer all questions.</h4>
      
      <button class=" btn btn-lg btn-success"
       @click="startQuiz"
       >START QUIZ</button>
  </div>
</template>

<script>
export default {
 props: ['title',],
 methods: {
     startQuiz(){
         this.$emit('startQuiz')
     }
 },
}
</script>

<style>

</style>