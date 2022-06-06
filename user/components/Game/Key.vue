<template>
  <div class="key" :class="{'active': IsPressed, 'inactive': !IsPressed }">
    <div class="base-key cyrillic">{{ keyAlphabet }}</div>
    <div class="base-key alphabet">{{ keyCyrillic }}</div>
  </div>
</template>

<script>
export default ({
  props: {
    keyAlphabet: {
      type: String,
      default: null
    },
    keyCyrillic: {
      type: String,
      default: null
    },
    pressed: {
      type: Boolean,
      default: false
    },
    isPressed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      active: false
    }
  },
  computed: {
    IsPressed () {
      if (this.pressed) {
        return this.isPressed
      }
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
.key {
  margin: 2px 1px;
  cursor: pointer;
  width: 49px;
  height: 52px;
  border-radius: 3px;
  position: relative;
  background-color: #323232;
  .base-key {
    color: #fff;
    font-size: 16px;
  }
  .cyrillic {
    position: absolute;
    top: 6px;
    left: 6px;
  }
  .alphabet {
    position: absolute;
    bottom: 6px;
    right: 6px;
  }
}

.inactive {
  background-color: #323232;
  border-bottom: solid 4px #0A0A0A;

}
.active {
  -webkit-transform: translateY(4px);
  transform: translateY(4px);
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);
  background-color: rgb(79, 79, 79);
  // border-bottom: none;
}
</style>