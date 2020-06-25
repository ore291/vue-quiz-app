<template>
  <div class="container flex justify-content-center" id="quiz">
    <div class="subjectstage" v-if="subjectStage">
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
      </div>
    </div>
    <div class="container mt-5" style="text-align:center" v-if="introStage">
      <h1 mt-5>Examination: {{this.title}}</h1>
      <h4 mb-2> You have 30mins to answer all questions.</h4>
      <button class=" btn btn-lg btn-success"
       @click="startQuiz"
       >START</button>
    </div>
    <div v-else-if="questionStage">
      <circular-count-down-timer
        :initial-value="1800"
        :stroke-width="5"
        :seconds-stroke-color="'#f00'"
        :minutes-stroke-color="'#0ff'"
        :underneath-stroke-color="'lightgrey'"
        :seconds-fill-color="'#00ffff66'"
        :minutes-fill-color="'#00ff0066'"
        :size="80"
        :padding="6"
        :minute-label="'minutes'"
        :second-label="'seconds'"
        :show-second="true"
        :show-minute="true"
        :show-hour="false"
        style="text-align:center"
        @finish="submitExam"
      ></circular-count-down-timer>
      <div style="text-align:right"> 
        <button class="btn btn-lg btn-danger" 
          @click="submitExam"
          >Submit All</button>
      </div>
      <span > Question {{currentQuestion+1}} of {{questions.length}}</span>
      <br/>
      <div class="container"
        v-for="(question, index) in questions" 
        v-bind:key="index">
        <div v-show="index == currentQuestion">
          <div class="questionbody"><span v-html="question.section" style="color:red"></span><br><p v-html="question.question"></p></div>
          <ol type="A">
            <li v-for="(option, key) in question.option" v-bind:key="option">
              <label class="form-check-label" >
                <div class="form-check">
                  <input class="form-check-input" id="exampleRadios1" type="radio" v-model="userResponse" 
                  :name="index"  
                  :value="key" 
                  >{{option}}
                </div>
              </label>
            </li>
          </ol>
          <div class="quiz-footer">
            <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div>
                  <button v-show="currentQuestion > 0"
                    class="btn btn-md btn-outline-danger " 
                    @click="prevQuestion">Prev</button>
                </div>
                <div>
                  <button v-show="currentQuestion < (questions.length - 1)"
                    class="btn btn-md btn-success ml-4" 
                    @click="next"
                    >Next</button>
                </div>
                <div>
                  <button v-show="currentQuestion == (questions.length - 1)"
                    class="btn btn-md btn-info ml-4" 
                    @click="submitExam"
                    >Submit</button>
                </div>
              </div>
              <div class="questionmap">
                <p>Jump To Question.....</p>
                <div class="btn-toolbar" role="toolbar" style="margin: 0;">
                  <div class="btn-group" v-for="(n, index) in questions.length"
                  :key='index'>
                      <a 
                        v-if="answers[index] == undefined " class="btn btn-sm btn-outline-info mx-1 my-2"
                        @click="jumpQuestion(index)" 
                        >{{n}}
                      </a>
                      <a 
                        v-else-if="answers[index] == ''" class="btn btn-sm btn-outline-info mx-1 my-2" 
                        @click="jumpQuestion(index)" 
                        >{{n}}
                      </a>
                       <a 
                        v-else class="btn btn-sm btn-info mx-1 my-2" 
                        @click="jumpQuestion(index)" 
                        >{{n}}
                      </a>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
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
import axios from 'axios';

export default {
  name: 'Quiz',
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
      loading: false,
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
      year: '2010',
      subject: null,
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
    getAll(){
     var url = "https://questions.aloc.ng/api/q/40?subject=" + this.subject + "&year=" + this.year + "&type=utme";
     this.loading = true;
     axios.get(url)
      .then((response) => {this.questions = response.data.data;
                          this.title = response.data.subject;
                          this.loading =false
                          this.introStage = true;
                          this.subjectStage = false;});
    },
    startQuiz(){
      this.questionStage = true;
      this.introStage = false;
    },
    next(){
      this.$set(this.answers, this.currentQuestion, this.userResponse);
      this.currentQuestion++;
      if(this.userResponse != ""){
        this.userResponse = this.answers[this.currentQuestion]
      }
      else{
       this.userResponse='';
      }
    },
    prevQuestion(){
      this.$set(this.answers, this.currentQuestion, this.userResponse);
      this.currentQuestion--;
      if(this.userResponse != ""){
        this.userResponse = this.answers[this.currentQuestion];
      }
      else{
       this.userResponse='';
      }
    },
    submitExam(){
      this.$set(this.answers, this.currentQuestion, this.userResponse);
      this.handleResults();
      this.questionStage = false; 
      this.resultsStage = true; 
    },
    handleResults(){
      this.questions.forEach((a, index) => {
        if(this.answers[index] === a.answer) this.correct++;
      });
      this.perc = ((this.correct / this.questions.length) * 100).toFixed(2);

    },
    jumpQuestion(index){
      this.$set(this.answers, this.currentQuestion, this.userResponse);
      this.currentQuestion = index;
    },
    restart(){
        Object.assign(this.$data, this.$options.data());
        this.subjectStage = true;
        // this.introStage = true;
        this.resultsStage = false;
    },
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
  padding: 20px 50px 0px 50px;
}
</style>
