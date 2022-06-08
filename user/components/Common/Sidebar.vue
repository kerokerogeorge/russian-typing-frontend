<template>
  <div class="sidebar">
    <div class="sidebar__container">
      <div class="sidebar__container__content" :class="{'current': $route.query.type === 'letter'}">
        <NuxtLink :to="{'path':'/game', 'query':{type: 'letter'}}">
          一文字練習
        </NuxtLink>
      </div>
      <div class="sidebar__container__content" :class="{'current': $route.query.type === 'level-one'}">
        <NuxtLink :to="{'path':'/game', 'query':{type: 'level-one'}}">
          レベル1（~4文字）
        </NuxtLink>
      </div>
      <div class="sidebar__container__content" :class="{'current': $route.query.type === 'level-two'}">
        <NuxtLink :to="{'path':'/game', 'query':{type: 'level-two'}}">
          レベル2（5~7文字）
        </NuxtLink>
      </div>
      <div class="sidebar__container__content" :class="{'current': $route.query.type === 'level-three'}">
        <NuxtLink :to="{'path':'/game', 'query':{type: 'level-three'}}">
          レベル3（8~10文字）
        </NuxtLink>
      </div>
      <div class="sidebar__container__content" :class="{'current': $route.query.type === 'level-four'}">
        <NuxtLink :to="{'path':'/game', 'query':{type: 'level-four'}}">
          レベル4（11文字以上）
        </NuxtLink>
      </div>
      <!--  TODO: 将来的に追加 -->
      <!-- <div class="sidebar__container__content" :class="{'current': $route.query.type === 'sentence'}" @click="selectType('sentence')">
        <NuxtLink :to="{'path':'/game', 'query':{type: 'sentence'}}">
          文章で練習
        </NuxtLink>
      </div> -->
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
      &:hover {
        background-color: rgb(243, 255, 249);
      }

      a {
        padding: 5px 25px;
        display: block;
        width: 100%;
        height: 100%;
        color: #323232;
        // background-color: #b77b7b;
        text-decoration: none;
        line-height: 300%;
      }
    }
    .current {
      background-color: rgb(229, 252, 241);
    }
  }
}
</style>