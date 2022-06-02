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
        const apiUrl = process.env.APP_ENV === 'production'
          ? 'https://russian-typing-api.herokuapp.com'
          : 'http://localhost:8000'
        const { data } = await this.$axios.$get(apiUrl + '/api/word')
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
