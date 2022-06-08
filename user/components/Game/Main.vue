<template>
  <div class="game">
    <div class="game__container">
      <div class="column-game">
        <div class="column-game__content-box">
          <div v-if="GameType === 'letter'" class="column-game__content-box__content game-section">
            <div class="game-section__starter">
              <button v-if="!gameProperty.started" @click="start">Click here to start（letter）</button>
              <p class="word-box" v-if="gameProperty.started">
                <span :class="{'normal': !gameProperty.miss, 'mistake': gameProperty.miss }">{{ CurrentLetter }}</span>
              </p>
            </div>
          </div>
          <div v-if="GameType === 'level-one' || GameType === 'level-two' || GameType === 'level-three' || GameType === 'sentence'" class="column-game__content-box__content game-section">
            <div class="game-section__starter">
              <button v-if="!gameProperty.started" @click="start">Click here to start（word）</button>
              <p class="word-box" v-if="gameProperty.started">
                <span class="correct">{{ CorrectLetter }}</span>
                <span class="current" :class="{'normal': !gameProperty.miss, 'mistake': gameProperty.miss }">{{ CurrentLetter }}</span>
                <span class="remaining">{{ RemainingLetter }}</span>
              </p>
            </div>
          </div>
          <div class="column-game__content-box__content">
            <GameKeyboard
              :first-row-keys="key.firstRow"
              :second-row-keys="key.secondRow"
              :third-row-keys="key.thirdRow"
              :pressed-key="PressedKey"
              :is-pressed="IsPressed"
              :show="show"
              @toggle="toggle"
            />
          </div>
          <div class="column-game__content-box__content words-section">
            <div class="words-section__table">
              <div class="words-section__table__header words-section__table__row">
                <div class="cell-number" />
                <div class="cell-word">単語</div>
                <div class="cell-definition">意味</div>
              </div>
              <template v-if="gameResult.correctWords.length > 0">
                <div v-for="(word, index) in gameResult.correctWords" :key="index" class="words-section__table__row">
                <div class="cell-number">
                  {{ index + 1 }}
                </div>
                <div class="cell-word">
                  <p>{{ word.text }}</p>
                </div>
                <div class="cell-definition">
                  <p>
                    {{ word.definition }}
                  </p>
                </div>
              </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="column-attributes">
        <GameAttributes :game-property="gameProperty" :game-result="gameResult" />
      </div>
    </div>
  </div>
</template>

<script>
import keyData from '~/static/data/keys.json'
import keyboardData from '~/static/data/keyboards.json'
import wordsData from '~/static/data/words.json'
export default ({
  props: {
    gameType: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      show: false,
      active: false,
      keys: keyData,
      key: {
        firstRow: keyboardData[0].us.firstRow,
        secondRow: keyboardData[0].us.secondRow,
        thirdRow: keyboardData[0].us.thirdRow,
      },
      gameProperty: {
        started: false,
        currentLetterIndex: 0,
        currentWordIndex: 0,
        miss: false,
        timer: null,
        time: 10,
        miscount: 0,
        correctCount: 0,
        accuracy: 0,
        wpm: 0,
        correctWords: []
      },
      gameResult: {
        miscount: 0,
        correctCount: 0,
        accuracy: 0,
        wpm: 0,
        correctWords: []
      },
      pressedKey: null,
      pressed: false,
      word: 'ладно',
      words: wordsData,
      apiWords: [],
      questionsList: [],
    }
  },
  computed: {
    PressedKey () {
      return this.pressedKey
    },
    IsPressed () {
      return this.pressed
    },
    CorrectLetter () {
      return this.word.text.slice(0, this.gameProperty.currentLetterIndex)
    },
    CurrentLetter () {
      return this.gameType === 'letter' ? this.word.text : this.word.text[this.gameProperty.currentLetterIndex]
    },
    RemainingLetter () {
      return this.word.text.slice(this.gameProperty.currentLetterIndex + 1)
    },
    GameType () {
      console.log(this.gameType)
      return this.gameType
    }
  },
  mounted() {
    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown)
    document.removeEventListener('keyup', this.onKeyUp)
  },
  methods: {
    toggle () {
      this.show = !this.show
    },
    setGame () {
      Object.assign(this.gameProperty, {
        started: true,
        currentLetterIndex: 0,
        currentWordIndex: 0,
        miss: false,
        timer: null,
        time: 20,
        miscount: 0,
        correctCount: 0,
        accuracy: 0,
        wpm: 0,
        correctWords: []
      })
    },
    start () {
      this.setGame()
      this.questionsList = this.setQuestion()
      const questionIndex = Math.floor(Math.random() * this.questionsList.length)
      this.word = this.questionsList[questionIndex]
      this.gameProperty.timer = setInterval(() => {
        this.gameProperty.time -= 1
        if (this.gameProperty.time === 0) {
          clearInterval(this.gameProperty.timer)
          this.gameProperty.started = false
          this.getResult()
        }
      }, 1000)
    },
    setQuestion () {
      if (this.gameType === 'letter') {
        return this.keys.map(key => key.cyrillic)
      }
      if (this.gameType === 'level-one') {
        return this.words
      }
      if (this.gameType === 'level-two') {
        return this.words
      }
      if (this.gameType === 'level-three') {
        return this.words
      }
      if (this.gameType === 'sentence') {
        return this.sentences
      }
    },
    onKeyDown(e) {
      this.pressedKey = e.code
      this.pressed = true
      if (this.gameProperty.started) {
        const letter = this.keys.find(key => key.keyCode === this.pressedKey)
        if (letter && this.word.text[this.gameProperty.currentLetterIndex] === letter.cyrillic) {
          this.gameProperty.currentLetterIndex += 1
          if (this.word.text.length === this.gameProperty.currentLetterIndex) {
            this.gameProperty.correctCount += 1
            this.gameProperty.correctWords.push(this.word)
            console.log(this.gameProperty.correctWords)
            this.updateWordBox()
          }
        } else {
          this.gameProperty.miss = true
          this.gameProperty.miscount += 1
        }
      }
    },
    onKeyUp(e) {
      this.pressedKey = e.code
      this.pressed = false
    },
    updateWordBox () {
      this.gameProperty.miss = false
      this.gameProperty.currentLetterIndex = 0
      // TODO: 出題単語を被らせない場合はこれを使う
      // this.gameProperty.currentWordIndex += 1
      this.gameProperty.currentWordIndex = Math.floor(Math.random() * this.questionsList.length)
      this.word = this.questionsList[this.gameProperty.currentWordIndex]
    },
    getResult () {
      this.gameProperty.accuracy = this.getAccuracy(this.gameProperty.correctCount, this.gameProperty.miscount)
      this.gameProperty.wpm = this.getWPM(this.gameProperty.correctCount, this.gameProperty.miscount)
      Object.assign(this.gameResult, {
        miscount: this.gameProperty.miscount,
        correctCount: this.gameProperty.correctCount,
        accuracy: this.gameProperty.accuracy,
        wpm: this.gameProperty.wpm,
        correctWords: this.gameProperty.correctWords
      })
    },
    getAccuracy (correctCount, mistakeCount) {
      let num = (correctCount / (correctCount + mistakeCount)) * 100
      let calculate = (Math.floor(num * 100)) / 100
      return calculate
    },
    getWPM (correctCount, mistakeCount) {
      let numerator = correctCount + mistakeCount;
      let calResult = ( numerator / 20 ) * 60;
      return calResult
    },
    async getWords () {
      try {
        // console.log('USED: ' + process.env.apiUri)
        const { data } = await this.$axios.$get(process.env.apiUri + '/api/word')
        this.apiWords = data
      } catch (e) {
        console.log(e)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.game {
  padding: $header-height 0 0 $sidebar-width-base;
  height: 100%;
  width: 100%;

  &__container {
    margin: 10px;
    display: flex;

    .column-game {
      width: 70%;
      // background-color: rgb(214, 127, 255);
      display: flex;
      justify-content: flex-end;
      &__content-box {
        width: 740px;
        // background-color: rgb(129, 127, 255);

        &__content {
          margin: 30px 30px;
        }

        .game-section {
          height: 230px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: white;
          box-shadow: $box-shadow-base;
          border-radius: $border-radius;
          &__starter {
            display: flex;
            justify-content: center;
            align-items: center;
            button {
              font-family: 'Source Sans Pro', sans-serif;
              cursor: pointer;
              font-size: 44px;
              color: rgba(75, 85, 99, 1);
              font-weight: 500;
              &:hover {
                opacity: .7;
              }
            }
            .word-box {
              font-family: 'Source Sans Pro', sans-serif;
              text-align: center;
              font-size: 44px;
              display: flex;

              .correct { margin: 0; color: #2EC262; }
              .current { margin: 0; background-color: #e0e0e0; }
              .mistake { margin: 0; color: #e3586a ;}
              .normal { margin: 0; color: #323232; }
              .remaining { margin: 0; color: gray; }
            }
          }

        }

        .words-section {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: white;
          box-shadow: $box-shadow-base;
          border-radius: $border-radius;
          // width: 100%;
          &__table {
            width: 100%;
            // background-color: #2EC262;
            &__header {
              color: $gray-500;
              border-bottom: 1px solid rgba(209, 213, 219, 1);
            }
            &__row {
              display: flex;
              align-items: center;
              padding: 20px 0;
              .cell-number {
                width: 40px;
                padding-left: 15px;
              }
              .cell-word {
                width: 150px;
                padding: 0 10px;
                p {
                  font-family: 'Source Sans Pro', sans-serif;
                  font-size: 18px;
                  overflow-wrap: break-word;
                  word-wrap: break-word;
                 }
              }
              .cell-definition {
                width: 490px;
                padding: 0 10px;
                p {
                  font-size: 14px;
                  overflow-wrap: break-word;
                  word-wrap: break-word;
                }
              }
            }
          }
        }
      }
    }
    .column-attributes {
      width: 30%;
    }
  }
}
</style>