<!--
     author : liuzhuo
     date : 2019/6/24
     time : 10:01
 -->
<template>
  <transition name="dialog-fade" v-bind="$attrs" v-on="$listeners">
    <div class="mod-mask shadow" @click="close" v-show="show">
      <!--      <transition name="scale">-->
      <!--        <div v-show="show" class="dialog-panel" @click.stop>-->
      <slot :show="show" />
      <!--        </div>-->
      <!--      </transition>-->
    </div>
  </transition>
</template>

<script>
export default {
  name: "DialogBg",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    clickClose: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      document.body.appendChild(this.$el);
    });
  },
  destroyed() {
    this.$el &&
      this.$el.parentNode &&
      this.$el.parentNode.removeChild(this.$el);
  },
  methods: {
    close() {
      this.clickClose && this.$emit("update:show", false);
    }
  }
};
</script>

<style lang="less" scoped>
.mod-mask {
  justify-content: center;
}
</style>
