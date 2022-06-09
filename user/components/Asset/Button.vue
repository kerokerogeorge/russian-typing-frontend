<template>
  <button :class="{'bg-black': color === 'BLACK', 'bg-yellow': color === 'YELLOW'}" @click="emitFunc()">
    <div class="button-content">
      <div class="img-container">
        <img src="~/assets/icons/login.svg" alt="">
        <!-- <img v-if="color === 'BLUE'" src="~/assets/LpAssets/top/section-5/login.svg" alt=""> -->
      </div>
      <div class="message-container">
        <p :class="{'black': color === 'YELLOW', 'white': color === 'BLACK'}">{{ text }}</p>
      </div>
    </div>
  </button>
</template>

<script>
export default ({
  props: {
    text: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    },
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
.bg-yellow {
  background-color: #faf7c1;
  &:hover {
    border: 1px solid #faf7c1;
    background-color: transparent;
  }
}
.bg-black {
  background-color:#191414;
  &:hover {
    border: 1px solid #191414;
    background-color: transparent;
  }
}
button {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 20px 48px -12px rgba(0, 0, 0, 0.1);
  border-radius: 100px;
  padding: 19px 30px;
  border: 1px solid transparent;
  @include tab {
    border-radius: 60px;
    padding: 10px 20px;
  }
  .button-content {
    display: flex;
    align-items: center;
    .img-container {
      margin-right: 10px;
      display: flex;
      align-items: center;
    }
    .message-container {
      p {
        font-size: 1rem;
        @include tab {
          font-size: 14px;
        }
      }
      .black {
        color: #191414;
      }
      .white { color: #fff; }
    }
  }

  &:hover > .button-content > .message-container > .black { color: #faf7c1; }
  &:hover > .button-content > .message-container > .white { color: #191414; }
}
</style>
