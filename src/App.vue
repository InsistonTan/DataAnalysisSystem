<template>
  <div id="app">
    <router-view v-if="$route.meta.keepAlive!=true" :key="$route.fullPath"/>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive==true" :key="$route.fullPath"/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
