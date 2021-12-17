<!--
     author : liuzhuo
     date : 2019/8/29
     time : 10:28
 -->
<template>
  <div class="m-marquee">
    <transition name="marquee">
      <slot></slot>
    </transition>
  </div>
</template>

<script>
export default {
  name: "VMarquee"
};
</script>

<style lang="less" scoped>
.m-marquee {
  height: 100%;
}
.marquee-enter-active,
.marquee-leave-active {
  transition: transform 0.2s ease-out;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}
.marquee-leave-to {
  transform: translate(0, -100%);
}
.marquee-enter-to,
.marquee-leave {
  transform: translate(0, 0);
}
.marquee-enter {
  transform: translate(0, 100%);
}
</style>
