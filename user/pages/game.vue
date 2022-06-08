<template>
  <div class="game">
    <GameMain :game-type="Type" />
  </div>
</template>

<script>
export default ({
  layout: 'gameLayout',
  computed: {
    Type () {
      return this.$route.query.type
    }
  }
})
</script>
