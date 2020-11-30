<template>
  <section>
    <div v-show="step === 0" class="s-hero">
      <div class="s-hero__wrapper">
        <div class="s-hero__top">
          <div class="s-hero__title-wrap">
            <h1 class="s-hero__title"><span class="s-hero__title--green">Super</span>Герои</h1>
            <h1 class="s-hero__title s-hero__title--mobile"><span class="s-hero__title--green">Super</span><span>Герои</span></h1>
          </div>
          <div class="title-board">
            <div class="text">Интернет-маркетинга</div>
          </div>
          <div class="s-hero__text-discription landing-discription">
            <div class="landing-discription__item landing-discription__item--not-mobile">
              <div class="logo-container"><img src="/images/quiz/martech-logo.png"></div>
            </div>
            <div class="s-hero__text-content">
              <p>В суровом мире интернет-маркетинга свои супергерои, и мы знаем, что ты один из них. Осталось выяснить, кто именно скрывается под камуфляжем простого офисного сотрудника.</p>
              <p>Мини-тест из 15 вопросов поможет раскрыть все карты, но торопись, ведь для ответа на каждый вопрос у тебя есть <nobr>30 секунд</nobr>. Таймер не будет ждать!</p>
            </div>
            <div class="landing-discription__item landing-discription__item--not-mobile">
              <div class="logo-container"><img src="/images/quiz/comagic-logo.png"></div>
            </div>
          </div>
          <div class="s-hero__mobile-logos">
            <div class="logo-container"><img src="/images/quiz/martech-logo.png"></div>
            <div class="logo-container"><img src="/images/quiz/comagic-logo.png"></div>
          </div>
        </div>
        <div class="s-hero__center">
          <div class="s-hero__list hero-list">
            <div class="hero-list__item hero-list__item--first">
              <div class="hero-list__item-name add-text-border">Беспощадный <span class="fsz-medium">повелитель</span> <span class="fsz-big">ROI</span></div>
            </div>
            <div class="hero-list__item hero-list__item--second">
              <div class="hero-list__item-name add-text-border ">Упорный digital-воин</div>
            </div>
            <div class="hero-list__item hero-list__item--third">
              <div class="hero-list__item-name add-text-border ">Тайный агент под прикрытием</div>
            </div>
          </div>
        </div>
        <div class="s-hero__bottom">
          <div class="s-hero__button-block">
            <div class="start-button" @click="this.runQuiz">
              <div class="text">старт</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="step === 1" class="s-quiz">
      <div class="s-quiz__wrapper">
        <div class="s-quiz__block">
          <div class="quiz-clock">
            <div class="quiz-clock__value">00:{{ getTimeLeft }}</div>
          </div>
          <div class="question-counter">
            <div class="question-counter__value">{{ this.getNumberQuestion() }}/{{ getCountQuestions }}</div>
          </div>
          <div class="quiz__all-questions" v-for="(question, index) in quizQuestions">
            <div v-show="index === getCurrentQuestionIndex">
              <div class="s-quiz__qustion">
              <div class="question-content">{{ question.text }}</div>
            </div>
              <div class="s-quiz__answers">
                <div class="answers-item" :class="{act: activeAnswer === question.number + '-' + answer.number, blocked: blockQuestionForm }" v-for="(answer, index) in question.answers" @click="selectAnswer(question.number, answer.number)">
                  <div class="answers-item__content">
                    <div class="answers-item__content-letter"><span class="letter">{{getAnswerNumberLetter(index)}}</span></div>
                    <div class="answers-item__content-text">
                      <div class="txt">{{ answer.text }}</div>
                    </div>
                  </div>
                </div>
            </div>
            </div>
          </div>
          <div class="s-quiz__logos">
            <div><img src="/images/quiz/martech-logo.png"></div>
            <div><img src="/images/quiz/comagic-logo.png"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="step === 3" class="s-quiz-result" v-bind:class="getResultHeroClass">
      <div class="s-quiz-result__wrapper">
        <div class="s-quiz-result__top">
          <h1 class="s-quiz-result__title">Мы разоблачили тебя!</h1>
          <div class="title-board">
            <div class="text">Ты правильно ответил на {{ this.countRightAnswers }} вопросов, и твой герой — это:</div>
          </div>
        </div>
        <div class="s-quiz-result__center">
          <div class="about-hero">
            <div class="about-hero__title">{{ getResultHeroData.name }}</div>
            <div class="about-hero__discription">
              <div class="about-hero__text"><p>{{ getResultHeroData.text }}</p></div>
              <div class="about-hero__image"><img :src=getResultHeroData.img></div>
            </div>
          </div>
        </div>
        <div class="s-quiz-result__bottom">
          <div class="s-quiz-result__bottom-item">
            <div class="logo-container"><img src="/images/quiz/martech-logo.png"></div>
          </div>
          <div class="s-quiz-result__bottom-item">
            <div class="social-buttons">
              <a @click='shareContent()' class="social-buttons__item social-buttons__item--vk">
                <div class="social-buttons__logo"></div>
                <div class="social-buttons__counter">0</div>
              </a>
              <a class="social-buttons__item social-buttons__item--fb">
                <div class="social-buttons__logo"></div>
                <div class="social-buttons__counter">0</div>
              </a>
              <div class="social-buttons__item social-buttons__item--ok">
                <div class="social-buttons__logo"></div>
                <div class="social-buttons__counter">0</div>
              </div>
              <div class="social-buttons__item social-buttons__item--tw social-buttons__item--not-counter">
                <div class="social-buttons__logo"></div>
              </div>
            </div>
          </div>
          <div class="s-quiz-result__bottom-item">
            <div class="logo-container"><img src="/images/quiz/comagic-logo.png"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="s-quiz-result-new" v-show="step === 2">
      <div class="s-quiz-result-new__wrapper">
        <div class="s-quiz-result-new__top">
          <div class="s-quiz-result-new__left">
            <div class="logo-block">
              <h1 class="s-hero__title"><span class="s-hero__title--green">Super</span>Герои
                <div class="title-board">
                  <div class="text">Интернет-маркетинга</div>
                </div>
              </h1>
            </div>
            <div class="title add-text-border">{{ getResultHeroData.name }}</div>
            <div class="you-result">Ты правильно ответил на {{ this.humanRightAnswer() }}</div>
            <div class="about-text">{{ getResultHeroData.text }}</div>
          </div>
          <div class="s-quiz-result-new__right">
            <div class="hero-image"><img :src=getResultHeroData.img></div>
            <div class="logos-block">
              <div class="logo-block__item"><img src="/images/quiz/comagic-logo.png" width="123"></div>
              <div class="logo-block__item"><img src="/images/quiz/martech-logo.png" width="116"></div>
            </div>
          </div>
        </div>
        <div class="s-quiz-result-new__bottom">
          <div class="s-quiz-result__bottom-item">
            <div class="social-buttons">
              <a @click='shareResultFb' class="social-buttons__item social-buttons__item--fb">
                <div class="social-buttons__logo"></div>
                <div class="social-buttons__counter">{{counterData.fbCount}}</div>
              </a>
              <a @click='shareResultVk' target="_blank" class="social-buttons__item social-buttons__item--vk">
                <div class="social-buttons__logo"></div>
                <div class="social-buttons__counter">{{counterData.vkCount}}</div>
              </a>
            </div>
          </div>
          <div class="promo-banner">
            <div class="promo-banner__wrapper">
              <div class="promo-banner__title">SUPERспособности — это хорошо, но это еще не все!</div>
              <div class="promo-banner__des">По промокоду superhero дарим 1 месяц бесплатного* пользования сервисом CoMagic!</div>
              <div class="promo-banner__contact">Подробности акции по телефону: + 7 (495) 135-44-49.</div>
              <div class="promo-banner__star">*Акция — только для новых клиентов.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
export default {
  name: "Quiz",
  data() {
      return {
          title: 'Quiz',
          //api: 'http://cm.local/api/quiz.php',
          api: '/api/quiz.php',
          quizQuestions: [],
          clockCurrentValue: 0,
          currentQuestionIndex: 0,
          interval: '',
          allottedTime: 30,
          countQuestions: 0,
          userSelectAnswers: [],
          step: 0,
          countRightAnswers: 0,
          success: false,
          resultHero: '',
          resultData: {},
          counterData: {},
          activeAnswer: '',
          blockQuestionForm: false,
          answerPause: 1000
      }
  },
  computed:  {
      getCurrentQuestionIndex() {

          if (this.blockQuestionForm === false && this.clockCurrentValue > (this.allottedTime - 1)) {
              const cIndex = this.nextQuestion();
              return cIndex;
          }

          return this.currentQuestionIndex
      },
      getCountQuestions() {
        return this.countQuestions;
      },
      getTimeLeft() {
          const leftTime = this.allottedTime - this.clockCurrentValue;
          return (leftTime < 10) ? '0' + leftTime : leftTime;
      },
      getResultHeroData() {
          const quizResultData = {
              first: {
                  name: 'БЕСПОЩАДНЫЙ ПОВЕЛИТЕЛЬ ROI',
                  text: 'В этой вселенной ни у кого нет сомнений в твоих безграничных знаниях и суперспособностях. В твоей власти все показатели эффективности от CTR до ROI. Ты одним лишь взглядом способен уничтожить чужие злодейские рекламные кампании. Другие маркетологи преклоняются пред тобой!',
                  hero: 'first',
                  img: '/images/quiz/result_hero-first.png',
                  ogTitle: 'БЕСПОЩАДНЫЙ ПОВЕЛИТЕЛЬ ROI | SUPERГЕРОИ интернет-маркетинга',
                  ogImage: '/images/quiz/soc-hero-1.png',
                  ogDescription: 'ogDescription',
              },
              second: {
                  name: 'УПОРНЫЙ DIGITAL-ВОИН',
                  text: 'Тебе многое удается в рекламных битвах, но пока сакральные знания и digital-тайны остаются нераскрытыми.Твое упорство — твоя главная сила, с каждой новой победой ты движешься к просветлению. Держись этого курса и ты станешь главным супергероем интернет-маркетинга!',
                  hero: 'second',
                  img: '/images/quiz/result_hero-second.png',
                  ogTitle: 'УПОРНЫЙ DIGITAL-ВОИН | SUPERГЕРОИ интернет-маркетинга',
                  ogImage: '/images/quiz/soc-hero-2.png',
                  ogDescription: 'ogDescription',
              },
              third: {
                  name: 'ТАЙНЫЙ АГЕНТ ПОД ПРИКРЫТИЕМ',
                  text: 'Мы разоблачили тебя — в этом офисе ты работаешь под прикрытием! Твоей подготовки и знаний интернет-маркетинга не хватило, чтобы обвести нас вокруг пальца. Скоро и другие узнают твой секрет. Если хочешь остаться в digital-тусовке, пора бы тщательнее изучить теорию и больше практиковаться!',
                  hero: 'third',
                  img: '/images/quiz/result_hero-third.png',
                  ogTitle: 'ТАЙНЫЙ АГЕНТ ПОД ПРИКРЫТИЕМ | SUPERГЕРОИ интернет-маркетинга',
                  ogImage: '/images/quiz/soc-hero-3.png',
                  ogDescription: 'ogDescription',
              }
          };

          if (!this.resultHero)
              return {};
          this.changeShareContent(quizResultData[this.resultHero]);
          return quizResultData[this.resultHero];
      },
      getResultHeroClass() {
          return 's-quiz-result--' + this.resultHero;
      }
  },
  mounted : function() {

      this.getQuestions();
  },
  methods: {
      humanRightAnswer: function() {
          const rightAnswer = this.countRightAnswers;
          if (rightAnswer > 4 || rightAnswer == 0) {
              return rightAnswer + ' вопросов';
          }
          else if (rightAnswer == 1) {
              return rightAnswer + ' вопрос';
          }
          else {
              return rightAnswer + ' вопроса';
          }
      },
      runQuiz: function() {
          this.step = 1;
          this.clock();
      },
      clock: function () {
          const th = this;
          th.interval = setInterval(function(){
                th.clockCurrentValue++;
          }, 1000);
      },
      nextQuestion: function () {
          this.clockCurrentValue = 1;
          const nextIndex = this.currentQuestionIndex + 1;

          if (!this.success && nextIndex > (this.countQuestions - 1)) {
              // need show result for user
              this.interval = '';
              this.getResult();
              this.success = true;
          }
          else {
              this.currentQuestionIndex = nextIndex;
          }

          return this.currentQuestionIndex;
      },
      getAnswerNumberLetter: function (index) {
          const letters = ['A', 'B', 'C', 'D'];
          return letters[index]
      },
      getNumberQuestion: function () {
          return this.currentQuestionIndex + 1;
      },
      selectAnswer: function(questionNumber, answerNumber) {
          if (this.blockQuestionForm === true) {
              return false;
          }
          this.blockQuestionForm = true;
          this.activeAnswer = questionNumber + '-' + answerNumber;
          const th = this;
          setTimeout(function() {
              th.userSelectAnswers.push({
                  questionNumber: questionNumber,
                  answerNumber: answerNumber,
              });
              th.nextQuestion();
              th.blockQuestionForm = false;
          }, this.answerPause);
      },
      getResult: function () {
          const apiUrl = this.api;
          const th = this;
          axios.get(apiUrl, {
              params: {
                  method: 'getResult',
                  answers: th.userSelectAnswers
              }
          }).then(function (data) {
              const res = data.data;
              th.countRightAnswers = res.data.right;
              th.step = 2;
              th.resultHero = res.data.number;
              th.resultData = res.data.result;
              th.initShareCount();
          });
      },
      getQuestions: function() {
          const apiUrl = this.api;
          const th = this;
          axios.get(apiUrl, {
              params: {
                  method: 'getQuestions',
                  answers: th.userSelectAnswers
              }
          }).then(function (data) {
              const res = data.data;
              let qustions = [];
              for (let q in res.data) {
                  qustions.push(res.data[q]);
              }

              th.quizQuestions = qustions;
              th.countQuestions = qustions.length;
          });
      },
      initShareCount: function() {
        const resultData = this.resultData;
        const counterData =  {
            vkCount: resultData.shareCounter.vk,
            fbCount: resultData.shareCounter.fb,
        };

        this.counterData = counterData;
      },
      getShareLink: function() {
          return {
              vk: function(purl, ptitle, pimg, text) {
                  let url  = 'https://vk.com/share.php?';
                  url += 'url='          + encodeURIComponent(purl);
                  url += '&title='       + encodeURIComponent(ptitle);
                  url += '&description=' + encodeURIComponent(text);
                  url += '&image='       + encodeURIComponent(pimg);
                  url += '&noparse=true';
                  console.log(url);
                  this.popup(url);
              },
              ok: function(purl, text) {
                  let url  = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
                  url += '&st.comments=' + encodeURIComponent(text);
                  url += '&st._surl='    + encodeURIComponent(purl);
                  this.popup(url);
              },
              fb: function(purl, ptitle, pimg, text) {
                  let url  = 'http://www.facebook.com/sharer.php?s=100';
                  url += '&p[title]='     + encodeURIComponent(ptitle);
                  url += '&p[summary]='   + encodeURIComponent(text);
                  url += '&p[url]='       + encodeURIComponent(purl);
                  url += '&p[images][0]=' + encodeURIComponent(pimg);
                  this.popup(url);
              },
              tw: function(purl, ptitle) {
                  let url  = 'http://twitter.com/share?';
                  url += 'text='      + encodeURIComponent(ptitle);
                  url += '&url='      + encodeURIComponent(purl);
                  url += '&counturl=' + encodeURIComponent(purl);
                  this.popup(url);
              },
              mail: function(purl, ptitle, pimg, text) {
                  let url = 'http://connect.mail.ru/share?';
                  url += 'url='          + encodeURIComponent(purl);
                  url += '&title='       + encodeURIComponent(ptitle);
                  url += '&description=' + encodeURIComponent(text);
                  url += '&imageurl='    + encodeURIComponent(pimg);
                  this.popup(url)
              },

              popup: function(url) {
                  window.open(url,'','toolbar=0,status=0,width=626,height=436');
              }
          };
      },
      changeShareContent: function (obj) {
          // изменяем меты для расшаривания
          const metaTitleElement = document.querySelector('meta[property="og:title"]').setAttribute('content', obj.ogTitle);
          const metaDescriptionElement = document.querySelector('meta[property="og:description"]').setAttribute('content', obj.text);
          const metaImageElement = document.querySelector('meta[property="og:image"]').setAttribute('content', obj.ogImage);
      },
      shareResult: function (type) {
        const socialType = type;
        const th = this;
        const shareObj = this.getShareLink(type);
        const metaResult = this.resultData.meta;
        console.log(metaResult);
        if (type === 'vk') {
            shareObj.vk('url', metaResult.ogTitle, metaResult.ogImage, metaResult.ogDescription);
        }
        else if (type === 'fb') {
            shareObj.fb('url', metaResult.ogTitle, metaResult.ogImage, metaResult.ogDescription);
        }
        axios.get(this.api, {
            params: {
                method: 'increasedShareCounter',
                typeShare: socialType,
                heroCode: th.resultHero
            }
        }).then(function (data) {
            // увеличим счетчик на 1
            if (type === 'vk') {
                th.counterData.vkCount++;
            }
            else if (type === 'fb') {
                th.counterData.fbCount++;
            }
        });
      },
      shareResultVk: function () {
          this.shareResult('vk');
      },
      shareResultFb: function () {
          this.shareResult('fb');
      }
  }
}
</script>

<style scoped>

</style>