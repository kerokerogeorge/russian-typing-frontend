<template>
  <div class="container">
    <div class="first-section">
      <div class="first-section__content">
        <div class="first-section__content__left">
          <div class="first-section__content__left__box">
            <div class="main-description">Best typing application for cyrillic letters</div>
            <div class="sub-description">
              <div class="typewrite">
                <span class="wrap"></span>
              </div>
            </div>
            <div class="button-section">
              <AssetButton :text="'Play / играю'" :color="'YELLOW'" @func="goToGame" />
            </div>
          </div>
        </div>
        <div class="first-section__content__right">
          <div class="scroll-container">
            <AssetWordCard
              v-for="(word, index) in words"
              :key="index"
              :text="word.text"
              :word-type="word.type"
              :meaning="word.meaning"
              :description="word.description"
              :position="word.position"
              :bg-color="word.color"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wordData from '~/static/data/assetWords.json'

export default ({
  data () {
    return {
      typeWritingProps: {
        texts: '["Привет.", "Improve your russian typing skills.", "Are you ready?"]'
      },
      toRotate: null,
      el: null,
      loomNum: null,
      period: null,
      txt: null,
      isDeleting: false,
      words: wordData
    }
  },
  mounted () {
    this.appendTypewritingText()
  },
  methods: {
    appendTypewritingText () {
      const elements = document.getElementsByClassName('typewrite');
      for (let i=0; i<elements.length; i++) {
        const toRotate = this.typeWritingProps.texts;
        const period = 2000;
        if (toRotate) {
          this.txtType(elements[i], JSON.parse(toRotate), period);
        }
      }
      let css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
      document.body.appendChild(css);
    },
    txtType (el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
    },
    tick() {
      let i = this.loopNum % this.toRotate.length;
      const fullTxt = this.toRotate[i];
      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
      this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
      const that = this;
      let delta = 200 - Math.random() * 100;
      if (this.isDeleting) { delta /= 2; }
      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }
      setTimeout(function() {
        that.tick();
      }, delta);
    },
    goToGame() {
      window.open('/game?type=letter', '_blank');
    }
  }
})
</script>

<style lang="scss" scoped>
@mixin pcM {
  @media (max-width: ($pcM)) { @content; }
}
@mixin tab {
  @media (max-width: ($tab)) { @content; }
}
@mixin sp {
  @media (max-width: ($sp)) { @content; }
}
.container {
  .first-section {
    min-height: 100vh;
    max-width: 100vw;
    overflow: hidden;
    position: relative;
    background-image: url("~/assets/image/main.jpg");
    background-size: cover;

    &__content {
      display: flex;
      width: 100%;
      height: 100%;
      @include tab {
        flex-direction: column;
        height: 100vh;
      }
      &__left {
        z-index: 100;
        width: 55%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        @include tab {
          width: 100%;
          margin-top: 260px;
          padding: 0 20px;
          background-color: rgba($color: #191414, $alpha: .4);
        }
        &__box {
          // padding: 0 30px;
          .main-description {
            color: white;
            font-size: 30px;
            font-weight: 500;
            margin: 30px 0;
            @include tab {
              font-size: 18px;
            }
          }
          .sub-description {
            max-width: 500px;
            min-height: 180px;
            @include tab {
              max-width: 300px;
              min-height: 70px;
            }
            .typewrite {
              color: white;
              font-size: 70px;
              font-weight: 500;
              font-family: 'Source Sans Pro', sans-serif;
              @include tab {
                font-size: 35px;
              }
            }
          }
          .button-section {
            margin: 35px 0;
          }
        }
      }
      &__right {
        width: 45%;
        height: 100vh;
        @include tab {
          width: 100%;
        }
        .scroll-container {
          width: 90%;
          overflow: hidden;
          animation: loop-slide 30s infinite linear 1s both;

          &:hover {
            animation-play-state: paused;
          }
        }
        @keyframes loop-slide {
          from { transform: translateY(0);}
          to { transform: translateY(-80%); }
        }
      }
    }
  }
}
</style>
