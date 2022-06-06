<template>
  <div>
    <div class="header-section">
      <CommonHeader />
    </div>
    <div class="main-section">
      <div class="sidear-section">
        <CommonSidebar />
      </div>
      <main>
      <Nuxt/>
      </main>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.main-section {
  height: 100vh;
  background-color: #EBEFF2;
}
</style>
