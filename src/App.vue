<template>
  <div id="app" class="hairlines" :class="[os]">
    <keep-alive :include="$$cacheAlive">
      <router-view />
    </keep-alive>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>
<script>
import { isIos } from "@/modules/env";

export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    os() {
      return isIos() ? "ios" : "android";
    }
  }
};
</script>
<style lang="less" scoped></style>
