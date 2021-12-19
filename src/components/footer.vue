<template>
  <div class="footer">
    <div class="wave-wrapper-inner bg-top">
      <div class="wave wave-top"></div>
    </div>
    <div class="wave-wrapper-inner bg-middle">
      <div class="wave wave-middle"></div>
    </div>
    <div class="wave-wrapper-inner bg-bottom">
      <div class="wave wave-bottom"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  setup() {

  },
};
</script>
<style lang="less" scoped>
.footer {
  width: 100vw;
  position: relative;
  margin: 0 auto;
  height: .px2rem(100) [];
  overflow: hidden;
  .wave-wrapper-inner {
    position: absolute;
    width: 100%;
    overflow: hidden;
    height: .px2rem(100) [];
    bottom: -1px;
    .wave {
      position: absolute;
      left: 0;
      width: 200%;
      height: 100%;
      background-repeat: repeat no-repeat;
      background-position: 0 bottom;
      transform-origin: center bottom;
    }
    .wave-top {
      animation: move-wave 8s linear infinite;
      background-size: 50% .px2rem(60) [];
      background-image: url(~@/assets/footer/wave-top.png);
    }
    .wave-middle {
      animation: move-wave 16s linear infinite;
      background-size: 50% .px2rem(86) [];
      background-image: url(~@/assets/footer/wave-mid.png);
    }
    .wave-bottom {
      animation: move-wave 24s linear infinite;
      background-size: 50% .px2rem(60) [];
      background-image: url(~@/assets/footer/wave-bot.png);
    }
  }
  .bg-top {
    z-index: 15;
    opacity: 0.5;
  }
  .bg-middle {
    z-index: 10;
    opacity: 0.75;
  }
  .bg-bottom {
    z-index: 5;
  }
}
@keyframes move-wave {
  0% {
      transform: translateX(0) translateZ(0) scaleY(1)
  }
  50% {
      transform: translateX(-25%) translateZ(0) scaleY(0.55)
  }
  100% {
      transform: translateX(-50%) translateZ(0) scaleY(1)
  }
}
</style>
