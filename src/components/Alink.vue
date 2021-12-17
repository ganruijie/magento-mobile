<template>
  <a :href="to">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: "Alink",
  props: {
    to: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      msg: "this is from alink.vue"
    };
  },
  methods: {}
};
</script>
<style lang="less">
.alink {
}
</style>
