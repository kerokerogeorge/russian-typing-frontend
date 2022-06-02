<template>
  <div>
    <button @click="getWords()">
      getWORDs
    </button>
    {{ words.length > 0 ? words : 'nothing' }}
  </div>
</template>

<script>
export default ({
  data () {
    return {
      words: []
    }
  },
  methods: {
    async getWords () {
      console.log('pushed')
      try {
        console.log('USED: ' + process.env.apiUri)
        const { data } = await this.$axios.$get(process.env.apiUri + '/api/word')
        this.words = data
      } catch (e) {
        console.log(e)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
button {
  color: rgb(225, 225, 225);
  background-color: rgb(68, 51, 51);
  cursor: pointer;
  padding: 8px 10px;
}
</style>
