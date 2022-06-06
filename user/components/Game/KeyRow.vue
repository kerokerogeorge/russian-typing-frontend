<template>
  <div class="key-row">
    <GameKey
      v-for="(key, index) in rowKeys"
      :key="index"
      :key-cyrillic="key.cyrillic"
      :key-alphabet="key.alphabet"
      :pressed="key.keyCode === pressedKey"
      :is-pressed="IsPressed"
    />
  </div>
</template>

<script>
export default ({
  props: {
    rowKeys: {
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
    }
  },
  computed: {
    IsPressed () {
      return this.isPressed
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
.key-row {
  display: flex;
}
</style>