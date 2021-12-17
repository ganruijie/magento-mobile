<!--
     author : liuzhuo
     date : 2019/8/28
     time : 18:14
 -->
<template>
  <a
    class="pull-app"
    href="https://a.app.qq.com/o/simple.jsp?pkgname=org.xianliao"
    >在app中打开</a
  >
</template>

<script>
export default {
  name: "OpenInAppLabel"
};
</script>

<style lang="less" scoped>
.pull-app {
  position: fixed;
  top: 172px;
  opacity: 0.9;
  background-color: #ff9301;
  color: #ffffff;
  text-align: center;
  height: 48px;
  line-height: 48px;
  width: 175px;
  .hairlines & {
    font-size: 12px;
    border-radius: 0 15px 15px 0;
  }
}
</style>
