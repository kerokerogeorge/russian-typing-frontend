<template>
<div class="keyboard-section">
  <div class="keyboard-section__toggle">
    <div class="toggle-switch" @click="toggle">
      <input id="toggle" class="toggle-input" type='checkbox' />
      <label for="toggle" class="toggle-label-base" :class="{'show': show, 'hidden': !show}" />
    </div>
  </div>
  <div class="keyboard-section__keyboard-container" :class="{'is-open': show }">
    <div class="key-rowadsfsadf">
      <div class="key-row__base"><GameKeyRow :row-keys="firstRowKeys" :pressed-key="PressedKey" :is-pressed="IsPressed" class="common first" /></div>
    </div>
    <div class="key-row">
      <div class="key-row__base"><GameKeyRow :row-keys="secondRowKeys" :pressed-key="PressedKey" :is-pressed="IsPressed" class="common second" /></div>
    </div>
    <div class="key-row">
      <div class="key-row__base"><GameKeyRow :row-keys="thirdRowKeys" :pressed-key="PressedKey" :is-pressed="IsPressed" class="common third" /></div>
    </div>
  </div>
</div>
</template>

<script>
export default ({
  props: {
    firstRowKeys: {
      type: Array,
      default: null
    },
    secondRowKeys: {
      type: Array,
      default: null
    },
    thirdRowKeys: {
      type: Array,
      default: null
    },
    pressedKey: {
      type: String,
      default: null
    },
    isPressed: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    PressedKey () {
      return this.pressedKey
    },
    IsPressed () {
      return this.isPressed
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
</style>