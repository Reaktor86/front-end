<template>
  <div class="quiz">
    <QuizTime :time="counter"></QuizTime>
    <div class="quiz__game-over" v-if="gameOver">
      Конец игры. Вы вынесли {{winPrice}}
      <button @click="resetGame">Начать сначала</button>
    </div>
    <div class="quiz__win" v-else-if="win">
      Победа
      <button @click="resetGame">Начать сначала</button>
    </div>
    <div v-else>

      <div class="quiz__time">00:{{allowTime}}</div>
      <div class="quiz__question">{{currentQuestion.question}}</div>
      <ul class="quiz__answers">
        <li v-for="item in currentQuestion.answers" @click="doAnswer(item)">{{item.value}}</li>
      </ul>
      <ul class="quiz__score">
          <li v-for="(item, index) in questions" v-bind:class="{active: isActivePrice(index)}">{{item.price}}</li>
      </ul>
    </div>

  </div>
</template>

<script>

import QuizTime from "vue/QuizTime.vue";
export default {
  name: "Quiz",
  components: {QuizTime},
  data() {
    return {
      allowTime: 6,
      allowTimeDefault: 6,
      gameOver: false,
      win: false,
      counter: 0,
      questions: [
        {
          question: 'Вопрос',
          price: 1000,
          answers: [
            {value: 'Ответ1', check: true},
            {value: 'Ответ2'},
            {value: 'Ответ3'},
            {value: 'Ответ4'},
          ]
        },
        {
          question: 'Вопрос2',
          price: 2000,
          answers: [
            {value: 'Ответ1'},
            {value: 'Ответ2'},
            {value: 'Ответ3'},
            {value: 'Ответ4', check: true},
          ]
        },
        {
          question: 'Вопрос3',
          price: 3000,
          answers: [
            {value: 'Ответ1'},
            {value: 'Ответ2'},
            {value: 'Ответ3'},
            {value: 'Ответ4', check: true},
          ]
        },
        {
          question: 'Вопрос4',
          price: 4000,
          answers: [
            {value: 'Ответ1'},
            {value: 'Ответ2'},
            {value: 'Ответ3'},
            {value: 'Ответ4', check: true},
          ]
        },
        {
          question: 'Вопрос5',
          price: 5000,
          answers: [
            {value: 'Ответ1'},
            {value: 'Ответ2'},
            {value: 'Ответ3'},
            {value: 'Ответ4', check: true},
          ]
        },
        {
          question: 'Вопрос6',
          price: 6000,
          answers: [
            {value: 'Ответ1'},
            {value: 'Ответ2'},
            {value: 'Ответ3'},
            {value: 'Ответ4', check: true},
          ]
        },
        {
          question: 'Вопрос7',
          price: 7000,
          answers: [
            {value: 'Ответ1'},
            {value: 'Ответ2'},
            {value: 'Ответ3'},
            {value: 'Ответ4', check: true},
          ]
        },
        {
          question: 'Вопрос8',
          price: 8000,
          answers: [
            {value: 'Ответ1'},
            {value: 'Ответ2'},
            {value: 'Ответ3'},
            {value: 'Ответ4', check: true},
          ]
        },
      ]
    }
  },
  watch: {
    allowTime: function (val) {
      if (val === 0) {
        this.gameOver = true;
      }
    }
  },
  computed: {
    currentQuestion: function () {
      return this.questions[this.counter]
    },
    winPrice: function () {
      return (this.counter > 0) ? this.questions[this.counter - 1].price : 0;
    }
  },
  methods: {
    doAnswer(answerItem) {
      if (Object.keys(answerItem).indexOf('check') !== -1 && answerItem.check) {
        this.counter++;
        this.resetTime();
        if (this.counter === this.questions.length) {
          this.win = true;
        }
      } else {
        this.gameOver = true;
      }
    },
    resetGame() {
      this.resetTime();
      this.counter = 0;
      this.win = false;
      this.gameOver = false;
    },
    resetTime() {
      this.allowTime = this.allowTimeDefault;
    },
    isActivePrice(index) {
      return this.counter === index;
    }
  },
  mounted() {
    setInterval(() => {
      this.allowTime--;
    }, 1000);
  }
}
</script>

<style scoped>
  .quiz__score li.active {
    color: #f00;
  }
</style>