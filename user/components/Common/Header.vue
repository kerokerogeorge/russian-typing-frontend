<template>
  <div class="header">
    <div class="logo-section">
      <NuxtLink :to="{'path':'/'}">
        <img src="~/assets/image/title.svg" alt="">
      </NuxtLink>
    </div>
  </div>
</template>

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
.header {
  top: 0;
  height: $header-height;
  width: 100vw;
  background-color: #fff;
  box-shadow: $box-shadow-base;
  position: fixed;
  z-index: 15;
  display: flex;
  align-items: center;
  .logo-section {
    margin: 0 0 0 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 80%;
    }
  }
}
</style>