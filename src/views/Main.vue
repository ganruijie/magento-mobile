<template>
  <div class="main-content">
    <keep-alive :include="$$cacheAlive">
      <router-view />
    </keep-alive>
    <app-footer></app-footer>
  </div>
</template>
<script>
import Footer from "@/components/footer.vue"
export default {
  name: "Main",
  components: {
    'app-footer': Footer
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.main-content {
}
</style>
