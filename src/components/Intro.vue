<template>
  <div>
      <h1 mt-5>Examination: {{this.title}}</h1>
      <h4 mb-2> You have 30mins to answer all questions.</h4>
      <button class=" btn btn-lg btn-success"
       @click="startQuiz"
       >START</button>
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