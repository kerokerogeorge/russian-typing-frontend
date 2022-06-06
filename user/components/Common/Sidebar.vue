<template>
  <div class="sidebar">
    <div class="sidebar__container">
      <div class="sidebar__container__content">
        1
      </div>
      <div class="sidebar__container__content">
        2
      </div>
      <div class="sidebar__container__content">
        3
      </div>
    </div>
  </div>
</template>

<script>
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
.sidebar {
  top: 0;
  height: 100vh;
  width: $sidebar-width-base;
  background-color: #fff;
  position: fixed;
  z-index: 10;
  @include pcS {
    width: $sidebar-width-small;
  }

  &__container {
    padding-top: $header-height;
    height: 100%;
    width: 100%;
    &__content {
      width: 100%;
      cursor: pointer;
      box-sizing: border-box;
      padding: 20px 25px;
      &:hover {
        background-color: rgb(243, 255, 249);
      }
    }
  }
}
</style>