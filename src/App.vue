<template>
  <div id="app">
    <notifications  position="top center" :speed="500" />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>

</style>
