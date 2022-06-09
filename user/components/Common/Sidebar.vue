<template>
  <div class="sidebar">
    <div class="sidebar__container">
      <div class="sidebar__container__content" :class="{'current': $route.query.type === 'letter'}" @click="update">
        <NuxtLink :to="{'path':'/game', 'query':{type: 'letter'}}">
          一文字練習
        </NuxtLink>
      </div>
      <div class="sidebar__container__content" :class="{'current': $route.query.type === 'level-one'}" @click="update">
        <NuxtLink :to="{'path':'/game', 'query':{type: 'level-one'}}">
          <span class="main">レベル1</span>
          <span class="sub">（~4文字）</span>
        </NuxtLink>
      </div>
      <div class="sidebar__container__content" :class="{'current': $route.query.type === 'level-two'}" @click="update">
        <NuxtLink :to="{'path':'/game', 'query':{type: 'level-two'}}">
          <span class="main">レベル2</span>
          <span class="sub">（5~7文字）</span>
        </NuxtLink>
      </div>
      <div class="sidebar__container__content" :class="{'current': $route.query.type === 'level-three'}" @click="update">
        <NuxtLink :to="{'path':'/game', 'query':{type: 'level-three'}}">
          <span class="main">レベル3</span>
          <span class="sub">（8~10文字）</span>
        </NuxtLink>
      </div>
      <!-- <div class="sidebar__container__content" :class="{'current': $route.query.type === 'level-four'}" @click="update">
        <NuxtLink :to="{'path':'/game', 'query':{type: 'level-four'}}">
          レベル4（11文字以上）
        </NuxtLink>
      </div> -->
      <!--  TODO: 将来的に追加 -->
      <!-- <div class="sidebar__container__content" :class="{'current': $route.query.type === 'sentence'}" @click="selectType('sentence')">
        <NuxtLink :to="{'path':'/game', 'query':{type: 'sentence'}}">
          文章で練習
        </NuxtLink>
      </div> -->
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default ({
  methods: {
    ...mapActions('game', [
      'updateStatus'
    ]),
    update () {
      this.updateStatus({type: 'sidebar'})
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
@mixin custom {
  @media (max-width: ($custom)) { @content; }
}
.sidebar {
  top: 0;
  height: 100vh;
  width: $sidebar-width-base;
  background-color: #fff;
  position: fixed;
  z-index: 10;
  @include custom {
    width: $sidebar-width-small;
  }
  @include sp {
    display: none;
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
        @include custom {
          padding: 10px 5px;
          font-size: 12px;
          display: flex;
          flex-direction: column;
          // margin: 15px 0;
        }

        .main {
          display: inline-block;
          line-height: 15px;
        }
        .sub {
          display: inline-block;
          line-height: 15px;
        }
      }
    }
    .current {
      background-color: rgb(229, 252, 241);
    }
  }
}
</style>