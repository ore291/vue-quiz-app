<template>
  <div  id="quiz">
    <!-- subject stage -->
    <div class="subjectstage" v-if="subjectStage">
      <SubjectStage @setSubjects='setStage' :subjects='subjects'/>
    </div>
    <!-- end of subject stage -->
    <!-- intro stage -->
    <div class="container mt-5" style="text-align:center" v-if="introStage">
      <introStage :title='title' @startQuiz='startQuiz' />
    </div>
    <!-- end of intro stage -->
    <div v-else-if="questionStage">
      <Questions @submitExam='submitExam' :questions='questions' :title='title'/>
    </div>
    <div class="resultsstage" v-if="resultsStage">
      <h1>
        <center>{{this.title}}</center>
      </h1>
       <h2><strong>Score: {{correct}}/{{questions.length}}</strong></h2>
       <h3>You got {{perc}}% correct, Do you want to restart? </h3>
      <button class="btn btn-lg btn-info" @click="restart">Restart</button>
    </div>
  </div> 
</template>

<script>

import SubjectStage from './Subject'
import introStage from './Intro'
import Questions from './Questions'

export default {
  name: 'Quiz',
  components: {
    SubjectStage,
    introStage,
    Questions
  },
  props: {
    
  },
   data() {
    return {
      subjectStage : false,
      introStage: false,
      questionStage: false,
      resultsStage: false,
      questions: null,
      title: '',
      currentQuestion: 0,
      
      answers:[],
      correct: 0,
      perc: null,
      squestions: [
        {
          "id": 26,
          "question": "\"Of 0 cam fasten nut one cup upon him with that which he had drunk tonight already. He'll be as full of quarrel and offence as my young mistress' dog ... \" Shakespeare, Othello  from the statement above it can be inferred that the speaker is ",
          "option": {
            "a": "disobedient ",
            "b": "quarrelsome ",
            "c": "drunkard ",
            "d": "scheming "
        },
          "answer": "d",
        },
        {
          "id": 30,
          "question": "One rhyme scheme typical of the English sonnet is ",
          "option": {
            "a": "bba abba cde cde ",
            "b": "bba abba cde dce ",
            "c": "abab cdcd efef gg ",
            "d": "abcd babb cde cc"
          },
          "answer": "c",
        },
        {
          "id": 30,
          "question": "blah blah blah ",
          "option": {
            "a": "correct ",
            "b": "false",
            "c": "false",
            "d": "false"
          },
          "answer": "a",
        }
      ],
      userResponse: '',
      subjects: [
        {
        'English language' : 'english',
        'Mathematics' : 'mathematics',
        'Commerce':'commerce',
        'Accounting':'accounting',
        'Biology':'biology',
        'Physics':'physics',
        'Chemistry': 'chemistry',
        'English literature': 'englishlit',
        'Government': 'government',
        'Christian Religious Knowledge':'crk',
        'Geography':'geography',
        'Economics':'economics',
        'Civic Education':'civiledu',
        'History':'history'
        },
        [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013]
      ]
    };
  },

  created () {
    // this.getAll();
    // this.introStage = true;
    this.subjectStage = true;
  },
    
  methods: {
    startQuiz(){
      this.questionStage = true;
      this.introStage = false;
    },
    submitExam(correct){
      this.correct = correct;
      this.perc = ((this.correct / this.questions.length) * 100).toFixed(2);
      this.questionStage = false; 
      this.resultsStage = true; 
    },
    // next(){
    //   this.$set(this.answers, this.currentQuestion, this.userResponse);
    //   this.currentQuestion++;
    //   if(this.userResponse != ""){
    //     this.userResponse = this.answers[this.currentQuestion]
    //   }
    //   else{
    //    this.userResponse='';
    //   }
    // },
    // prevQuestion(){
    //   this.$set(this.answers, this.currentQuestion, this.userResponse);
    //   this.currentQuestion--;
    //   if(this.userResponse != ""){
    //     this.userResponse = this.answers[this.currentQuestion];
    //   }
    //   else{
    //    this.userResponse='';
    //   }
    // },
    // submitExam(){
    //   this.$set(this.answers, this.currentQuestion, this.userResponse);
    //   this.handleResults();
    //   this.questionStage = false; 
    //   this.resultsStage = true; 
    // },
    // handleResults(){
    //   this.questions.forEach((a, index) => {
    //     if(this.answers[index] === a.answer) this.correct++;
    //   });
    //   this.perc = ((this.correct / this.questions.length) * 100).toFixed(2);

    // },
    // jumpQuestion(index){
    //   this.$set(this.answers, this.currentQuestion, this.userResponse);
    //   this.currentQuestion = index;
    // },
    restart(){
        Object.assign(this.$data, this.$options.data());
        this.subjectStage = true;
        // this.introStage = true;
        this.resultsStage = false;
    },
    setStage(response) {
          this.questions = response.response.data.data;
          this.title = response.response.data.subject;
          this.introStage = true;
          this.subjectStage = false;
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.questionbody{
  text-align: justify;
  color: green;
  border-style: solid;
  border-width: 1px;
  border-color: black;
  border-radius: 50px;
  padding: 30px 50px 30px 50px;
  margin-top: 10px;
}
.subjectstage{
 padding: 50px 50px 50px ;
 margin-top: 50px;
 background-color: rgb(192, 199, 223);
}
.subjectstage label {
  text-align: center;
  text-transform: uppercase;
  color: rgb(255, 0, 0);
  font-size: 25px;
}

.resultsstage{
 padding: 50px 50px 50px ;
 margin-top: 50px;
 background-color: rgb(192, 199, 223);
}

.questionmap {
  border-style: dotted;
  border-width: 1px;
  border-color: black;
  margin-top: 20px;
}
</style>
