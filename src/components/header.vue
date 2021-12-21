<template>
  <div class="header">
    <div class="header-content">
      <div class="header-content-left">
        <div class="logo">
          <img class="logo-img" src="@/assets/logo.png" alt="" />
        </div>
      </div>
      <!-- <div class="header-content-right">
        <div class="help">
          <router-link :to="{
            name: 'Help'
          }">help</router-link>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "Header"
};
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  height: .px2rem(50) [];
  line-height: .px2rem(50) [];
  background-color: @color-base-blue;
  .header-content {
    padding: 0 .px2rem(15) [];
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: .px2rem(50) [];
  }
  .header-content-left,
  .header-content-right {
    // height: 80px;
  }
  .logo {
    font-size: 0px;
    line-height: .px2rem(50) [];
    display: flex;
    align-items: center;
    .logo-img {
      width: .px2rem(96) [];
      height: .px2rem(40) [];
    }
  }
  .help {
    font-size: .px2rem(14) [];
    a {
      color: #fff;
    }
  }
}
</style>
