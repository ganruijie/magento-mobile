<template>
  <main>
    <div class="error-box">
      <div class="content">
        <van-empty class="custom-image" :image="imgUrl" :description="text" />
      </div>
    </div>
  </main>
</template>

<script>
import img from "@/assets/error.gif";
export default {
  name: "Error",
  data() {
    return {
      imgUrl: img,
      text: ""
    };
  },
  created() {
    let { des } = this.$route.query;
    this.text = des || "Error";
  },
  beforeRouteUpdate(to, from, next) {
    this.$Progress.start();
    this.nextTick(() => {
      this.$Progress.finish();
      next();
    });
  }
};
</script>

<style lang="less" scoped>
.error-box {
  height: 100vh;
  background-color: #ffffff;
  padding: .px2rem(20) [];
  .content {
    background-color: #ffffff;
    padding: .px2rem(10) [];
  }
  ::v-deep .custom-image {
    .van-empty__image {
      height: auto;
      width: auto;
      img {
        height: .px2rem(240) [];
        width: auto;
      }
    }
    .van-empty__description {
      font-size: .px2rem(16) [];
      line-height: .px2rem(22) [];
      color: #f56c6c;
      padding: 0;
    }
  }
}
</style>
