<template>
  <div class="game">
    <div class="game__container">
      <div class="column-game">
        <div class="column-game__content-box">
          <div class="column-game__content-box__content game-section">
            <div class="game-section__starter">
              <button v-if="!gameProperty.started" @click="start">Click here to start</button>
              <p class="word-box" v-if="gameProperty.started">
                <span class="correct">{{ CorrectLetter }}</span>
                <span class="current" :class="{'normal': !gameProperty.miss, 'mistake': gameProperty.miss }">{{ CurrentLetter }}</span>
                <span class="remaining">{{ RemainingLetter }}</span>
              </p>
            </div>
          </div>
          <div class="column-game__content-box__content keyboard-section">
            <div class="keyboard-section__toggle">
              <div class="toggle-switch" @click="toggle">
                <input id="toggle" class="toggle-input" type='checkbox' />
                <label for="toggle" class="toggle-label-base" :class="{'show': show, 'hidden': !show}" />
              </div>
            </div>
            <div class="keyboard-section__keyboard-container" :class="{'is-open': show }">
              <div class="key-rowadsfsadf">
                <div class="key-row__base"><GameKeyRow :row-keys="key.firstRow" :pressed-key="PressedKey" :is-pressed="IsPressed" class="common first" /></div>
              </div>
              <div class="key-row">
                <div class="key-row__base"><GameKeyRow :row-keys="key.secondRow" :pressed-key="PressedKey" :is-pressed="IsPressed" class="common second" /></div>
              </div>
              <div class="key-row">
                <div class="key-row__base"><GameKeyRow :row-keys="key.thirdRow" :pressed-key="PressedKey" :is-pressed="IsPressed" class="common third" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column-attributes">
        <div class="column-attributes__container">
          <div class="column-attributes__container__box timer">
            <div class="timer__box">
              <div class="timer__box__icon">
                <img src="~/assets/icons/timer.svg" alt="">
              </div>
              <div class="timer__box__text">制限時間: </div>
              <div class="timer__box__time">{{ gameProperty.time }}</div>
            </div>
          </div>
          <div class="column-attributes__container__box result">
            <div class="result__table">
              <div class="result__table__row">
                <div class="content name"><p>ミスタイプの回数</p></div>
                <div class="content value"><p>{{ gameProperty.miscount }}</p></div>
              </div>
            </div>
          </div>
          <div class="column-attributes__container__box result">
            <div class="result__table">
              <div class="result__table__title">
                <p>前回の結果</p>
              </div>
              <div class="result__table__row">
                <div class="content name"><p></p></div>
                <div class="content value"><p></p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import keyData from '~/static/data/keys.json'
import keyboardData from '~/static/data/keyboards.json'
export default ({
  layout: 'gameLayout',
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
        miscount: 0
      },
      pressedKey: null,
      pressed: false,
      word: 'ладно',
      words: ['ладно', 'рус', 'вав', 'фылдпо', 'пфывп']
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
      return this.word.slice(0, this.gameProperty.currentLetterIndex)
    },
    CurrentLetter () {
      return this.word[this.gameProperty.currentLetterIndex]
    },
    RemainingLetter () {
      return this.word.slice(this.gameProperty.currentLetterIndex + 1)
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
        miscount: 0
      })
    },
    start () {
      this.setGame()
      this.word = this.words[0]
      this.gameProperty.timer = setInterval(() => {
        this.gameProperty.time -= 1
        if (this.gameProperty.time === 0) {
          clearInterval(this.gameProperty.timer)
          this.gameProperty.started = false
        }
      }, 1000)
    },
    onKeyDown(e) {
      this.pressedKey = e.code
      this.pressed = true
      if (this.gameProperty.started) {
        const letter = this.keys.find(key => key.keyCode === this.pressedKey)
        if (letter && this.word[this.gameProperty.currentLetterIndex] === letter.cyrillic) {
          this.gameProperty.currentLetterIndex += 1
          if (this.word.length === this.gameProperty.currentLetterIndex) {
            this.updateWordBox()
          }
        } else {
          this.gameProperty.miss = true
          this.gameProperty.miscount += 1
        }
      }
    },
    updateWordBox () {
      this.gameProperty.miss = false
      this.gameProperty.currentLetterIndex = 0
      this.gameProperty.currentWordIndex += 1
      this.word = this.words[this.gameProperty.currentWordIndex]
    },
    onKeyUp(e) {
      this.pressedKey = e.code
      this.pressed = false
    },

  }
})
</script>

<style lang="scss" scoped>
.game {
  // background-color: antiquewhite;
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
        .keyboard-section {
          &__toggle {
            height: 30px;
            display: flex;
            justify-content: flex-start;
            .toggle-switch {
              position: relative;
              width: 75px;
              height: 42px;
              .toggle-input {
                position: absolute;
                left: 0;
                top: 0;
                width: 60%;
                height: 60%;
                z-index: 5;
                opacity: 0;
                cursor: pointer;
              }
              .toggle-label-base {
                width: 45px;
                height: 21px;
                position: relative;
                display: inline-block;
                border-radius: 46px;
                transition: .4s;
                box-sizing: border-box;
              }

              .show {
                background-color: rgb(89, 179, 114);
                &:after{
                  content: '';
                  position: absolute;
                  width: 25px;
                  height: 25px;
                  border-radius: 100%;
                  left: 20px;
                  top: -2px;
                  z-index: 2;
                  background: #fff;
                  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
                  transition: .4s;
                }
              }

              .hidden {
                background: #ccc;
                &:after {
                  content: '';
                  position: absolute;
                  width: 25px;
                  height: 25px;
                  border-radius: 100%;
                  left: 0;
                  top: -2px;
                  z-index: 2;
                  background: #fff;
                  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
                  transition: .4s;
                }
              }
            }
          }
          &__keyboard-container {
            max-height: 0;
            padding: 0 20px;
            transition: max-height .5s, padding .5s;
            overflow: hidden;
            background-color: white;
            box-shadow: $box-shadow-base;
            border-radius: $border-radius;
            .key-row {
              &__base {
                min-height: 60px;
                position: relative;
                .common { position: absolute; }
                .first { left: -14px; }
                .second { left: 0px; }
                .third { left: 14px; }
              }
            }

            &.is-open {
              max-height: 500px;
              padding: 20px;
              overflow: visible;
            }
          }
        }
      }
    }
    .column-attributes {
      width: 30%;
      // background-color: rgb(171, 216, 201);
      &__container {
        width: 100%;
        padding: 30px 15px;

        &__box {
          background-color: white;
          box-shadow: $box-shadow-base;
          border-radius: $border-radius;
          margin: 0 0 30px 0;
          padding: 15px;
        }

        .timer {
          display: flex;
          justify-content: center;
          align-items: center;
          &__box {
            display: flex;
            align-items: center;
            &__icon { margin-right: 5px; }
            &__text {
              margin-right: 3px;
            }
            &__time {
            }
          }
        }

        .result {
          &__table {
            width: 100%;
            &__title {
              margin: 0 0 30px 0;
              p {
                font-size: 22px;
                font-weight: 600;
                color: $gray-500;
                text-align: center;
              }
            }
            &__row {
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              border-bottom: 1px solid rgba(224, 224, 224, 1);
              .content  {
                margin: 10px 0 5px 0;
                p {
                  color: $gray-500;
                  font-size: 18px;
                  padding: 0 0 10px 0;
                }
              }

              .name { width: 70%; }
              .value { width: 30%; }
            }
          }
        }
      }
    }
  }
}
</style>