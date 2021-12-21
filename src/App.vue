<template>
  <div id="app" class="hairlines" :class="[os]">
    <keep-alive :include="$$cacheAlive">
      <router-view />
    </keep-alive>
    <vue-progress-bar></vue-progress-bar>
    <app-footer></app-footer>
  </div>
</template>
<script>
import { isIos } from "@/modules/env";
import Footer from "@/components/footer.vue"

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    'app-footer': Footer
  },
  computed: {
    os() {
      return isIos() ? "ios" : "android";
    }
  }
};
</script>
<style lang="less" scoped></style>
