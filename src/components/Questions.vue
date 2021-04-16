<template>
  <div>
    <div class="container">
      <div class="row pt-2">
        <div class="col-md-8 my-auto pb-4 border-bottom">
          <h5>
            {{ title.toUpperCase() }} - <small class="text-muted">Question {{ currentQuestion + 1 }}</small>
          </h5>
        </div>
        <div class="col-md-4">
          <span>Time Left: </span>
          <circular-count-down-timer
            :initial-value="1800"
            :stroke-width="2"
            :seconds-stroke-color="'#f00'"
            :minutes-stroke-color="'#0ff'"
            :underneath-stroke-color="'lightgrey'"
            :seconds-fill-color="'#ffffff'"
            :minutes-fill-color="'#ffffff'"
            :size="90"
            :padding="4"
            :show-second="true"
            :show-minute="true"
            :show-hour="false"
            :minute-label="'minutes'"
            :second-label="'seconds'"
            style="text-align: center"
            @finish="submitExam"
          ></circular-count-down-timer>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 pb-5">
          <div v-for="(question, index) in questions" v-bind:key="index">
            <div v-show="index == currentQuestion">
              <div class="questionbody">
                <span v-html="question.section" style="color: red"></span><br />
                <p v-html="question.question" class="lead"></p>
              </div>
              <ol type="A">
                <li
                  v-for="(option, key) in question.option"
                  v-bind:key="'A' + key"
                >
                  <div class="form-check pb-1">
                    <label class="form-check-label">
                      <input
                        class="form-check-input"
                        type="radio"
                        v-model="userResponse"
                        :name="index"
                        :value="key"
                      />{{ option }}
                    </label>
                  </div>
                </li>
              </ol>
            </div>
          </div>
          <div>
            <div
              class="btn-toolbar mt-5"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div class="btn-group" role="group" aria-label="Second group">
                <button type="button" class="btn btn-primary mr-3"
                v-show="currentQuestion > 0"
                @click="prevQuestion">
                  Previous
                </button>
                <button type="button" 
                class="btn btn-success"
                v-show="currentQuestion < (questions.length - 1)"
                @click="next">Next</button>
              </div>
              <div
                class="btn-group-md ml-auto"
                role="group"
                aria-label="Third group"
              >
                <button type="button" class="btn btn-outline-danger"
                @click="submitExam">
                  Submit All
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="questionmap mt-2 mb-5">
            <p>Jump To Question.....</p>
            <div class="btn-toolbar" role="toolbar">
              <div
                class="btn-group d-flex"
                v-for="(n, index) in questions.length"
                :key="index"
              >
                <div class="btn-group w-100">
                  <button
                    v-if="answers[index] == undefined"
                    class="btn btn-sm btn-outline-info mx-1 my-1"
                    @click="jumpQuestion(index)"
                  >
                    {{ n }}
                  </button>
                  <button
                    v-else-if="answers[index] == ''"
                    class="btn btn-sm btn-outline-info mx-1 my-1"
                    @click="jumpQuestion(index)"
                  >
                    {{ n }}
                  </button>
                  <button
                    v-else
                    class="btn btn-sm btn-success mx-1 my-1 w-100"
                    @click="jumpQuestion(index)"
                  >
                    {{ n }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      </div>
</template>

<script>
export default {
  data() {
    return {
      currentQuestion: 0,
      answers: [],
      userResponse: "",
      correct: 0,
    };
  },
  methods: {
    saveResults() {
      this.$set(this.answers, this.currentQuestion, this.userResponse);
    },
    setResponse() {
      if (this.userResponse != "") {
        this.userResponse = this.answers[this.currentQuestion];
      } else {
        this.userResponse = "";
      }
    },
    submitExam() {
      this.saveResults();
      this.handleResults();
      this.$emit("submitExam", this.correct);
    },
    next() {
      this.saveResults();
      this.currentQuestion++;
      this.setResponse();
      // if (this.userResponse != "") {
      //   this.userResponse = this.answers[this.currentQuestion];
      // } else {
      //   this.userResponse = "";
      // }
    },
    prevQuestion() {
      this.saveResults();
      this.currentQuestion--;
      this.setResponse();
    },
    handleResults() {
      this.questions.forEach((a, index) => {
        if (this.answers[index] === a.answer) {
          this.correct++;
        }
      });
      //   this.perc = ((this.correct / this.questions.length) * 100).toFixed(2);
    },
    jumpQuestion(index) {
      this.saveResults();
      this.currentQuestion = index;
      if (this.answers[this.currentQuestion] != "") {
        this.userResponse = this.answers[this.currentQuestion];
      }
    },
  },
  props: ["questions", "title"],
};
</script>

<style>
/* .btn-group.btn-block {
  display: table;
}
.btn-group.btn-block > .btn {
  display: table-cell;
} */
</style>