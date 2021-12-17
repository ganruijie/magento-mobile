<template>
  <div class="main-content">
    <keep-alive :include="$$cacheAlive">
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: "Main",
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.main-content {
}
</style>
