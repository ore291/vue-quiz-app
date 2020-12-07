<template>
<div>
    <div class="form-group col-md-3"  >
        <label for="FormControlSelect1">Select Exam</label>
        <select class="form-control"
         id="FormControlSelect1"
         v-model="subject"
         >
           <option v-for="(subjectname, subjectcode) in subjects[0]" 
           :key='subjectname' 
           :value="subjectname" 
           >{{subjectcode}}</option>
        </select>
        <label for="FormControlSelect2">Select Year</label>
        <select class="form-control"
         id="FormControlSelect2"
            v-model="year"
         >
           <option v-for="year in subjects[1]" 
           :key='year' 
           :value="year" 
           >{{year}}</option>
        </select>
        <button class="btn btn-lg btn-success mt-5"
          @click="getAll">Start Exam</button>
      </div>
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status" v-if="loading">
          <span class="sr-only">Loading...</span>
        </div>
        <div v-if='error'>
          <p> we are having issues getting the questions, try again later</p>
        </div>
      </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
 name: 'subject',
 data() {
     return {
        year: '2010',
        subject: null,
        loading: false,
        error: false,
        response: null
     }
 }, 
 methods: {
     getAll(){
     var url = "https://questions.aloc.ng/api/q/40?subject=" + this.subject + "&year=" + this.year + "&type=utme";
     this.loading = true;
     axios.get(url)
      .then((response) => {
            this.response = response
            this.loading = false  
            this.sendResponse()})
            
        .catch(err => {
          this.loading = false;
          this.error = true;
          console.log(err);
         })
    },
    sendResponse(){
        this.$emit('setSubjects', {
          'response' : this.response,
      })
    },
 },
 props: ['subjects',]
}
</script>

<style>

</style>