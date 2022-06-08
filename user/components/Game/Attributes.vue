<template>
<div class="attributes">
  <div class="attributes__container">
    <div class="attributes__container__box timer">
      <div class="timer__box">
        <div class="timer__box__icon">
          <img src="~/assets/icons/timer.svg" alt="">
        </div>
        <div class="timer__box__text">制限時間: </div>
        <div class="timer__box__time">{{ gameProperty.time }}</div>
      </div>
    </div>
    <div class="attributes__container__box result">
      <div class="result__table">
        <div class="result__table__row">
          <div class="content name"><p>タイプミスの回数</p></div>
          <div class="content value"><p>{{ GameProperty.miscount }}</p></div>
        </div>
        <div class="result__table__row">
          <div class="content name"><p>正解数</p></div>
          <div class="content value"><p>{{ GameProperty.correctCount }}</p></div>
        </div>
      </div>
    </div>
    <div class="attributes__container__box result">
      <div class="result__table">
        <div class="result__table__title">
          <p>前回の結果</p>
        </div>
        <div class="result__table__row">
          <div class="content name"><p>タイプミスの回数</p></div>
          <div class="content value"><p>{{ GameResult.miscount }}</p></div>
        </div>
        <div class="result__table__row">
          <div class="content name"><p>正解数</p></div>
          <div class="content value"><p>{{ GameResult.correctCount }}</p></div>
        </div>
        <div class="result__table__row">
          <div class="content name"><p>正答率</p></div>
          <div class="content value"><p>{{ GameResult.accuracy }} %</p></div>
        </div>
        <div class="result__table__row">
          <div class="content name"><p>WPM</p></div>
          <div class="content value"><p>{{ GameResult.wpm }}</p></div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default ({
  props: {
    gameProperty: {
      type: Object,
      default: null
    },
    gameResult: {
      type: Object,
      default: null
    },
  },
  computed: {
    GameProperty () {
      return this.gameProperty
    },
    GameResult () {
      return this.gameResult
    }
  },
  methods: {
    toggle () {
      this.$emit('toggle')
    }
  }
})
</script>

<style lang="scss" scoped>
@mixin pcL {
  @media (max-width: ($pcL)) { @content; }
}
@mixin pcM {
  @media (max-width: ($pcM)) { @content; }
}
@mixin pcS {
  @media (max-width: ($pcS)) { @content; }
}
@mixin tab {
  @media (max-width: ($tab)) { @content; }
}
@mixin sp {
  @media (max-width: ($sp)) { @content; }
}
.attributes {
  width: 100%;
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
          .name {
            width: 70%;
            p {
              font-size: 14px;
            }
          }
          .value {
            width: 30%;
            p {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>