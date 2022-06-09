<template>
  <div
    class="word-container"
    :class="{
      'position-1': position === 1,
      'position-2': position === 2,
      'position-3': position === 3,
      'position-4': position === 4,
      'position-5': position === 5,
      'position-6': position === 6,
    }"
  >
    <div class="word-card" :class="{'bg-purple': bgColor === 'PURPLE', 'bg-yellow': bgColor === 'YELLOW', 'bg-white': bgColor === 'WHITE'}">
      <div class="title">{{ text }}</div>
      <div class="word-type">{{ wordType }}</div>
      <div class="meaning">{{ meaning }}</div>
      <div class="description">{{ description }}</div>
    </div>
  </div>
</template>

<script>
export default ({
  props: {
    text: {
      type: String,
      default: null
    },
    wordType: {
      type: String,
      default: null
    },
    meaning: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    bgColor: {
      type: String,
      default: null
    },
    position: {
      type: Number,
      default: null
    }
  },
  methods: {
    emitFunc() {
      this.$emit('func')
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
.word-container {
  margin: 20px 0;
  min-height: 240px;
  display: flex;
  .word-card {
    cursor: pointer;
    min-width: 250px;
    max-width: 250px;
    height: auto;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
    transition: all 0.2s;
    &:hover  {
      transform: translateY(-10px);
      box-shadow: 0 3px 10px 0 #333;
      opacity: .8;
    }
    .title {
      font-family: 'Helvetica', sans-serif;
      font-size: 22px;
      margin: 5px 0;
    }
    .word-type {
      font-family: 'Helvetica', sans-serif;
      font-size: 16px;
      font-weight: 300;
      color: rgba(0, 0, 0, 0.54)
    }
    .meaning {
      font-family: 'Helvetica', sans-serif;
      margin: 20px 0 5px 0;
      font-weight: 400;
      line-height: 130%;
    }
    .description {
      font-family: 'Helvetica', sans-serif;
      font-weight: 300;
    }
  }
  .bg-yellow { background-color: #faf7c1; }
  .bg-purple { background-color: #CCC1FA; }
  .bg-white { background-color: #fff; }
}

.position-1 { justify-content: flex-start; align-items: center; }
.position-2 { justify-content: center; align-items: center; }
.position-3 { justify-content: flex-end; align-items: center; }
</style>
