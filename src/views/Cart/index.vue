<template>
  <div class="content">
    <p>home</p>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      loaded: false
    };
  },
  created() {
    this.$Progress.start();
    this.init();
  },
  activated() {
    this.$Progress.finish();
  },
  methods: {
    init() {
      this.$tips.showLoading();
    },
  }
};
</script>
<style lang="less" scoped>
.content {

}
/deep/.van-search__content {
  background-color: #fff;
  border: 1px solid #f23030;
  .van-icon-search {
    font-size: 4.2vw;
    color: #f23030;
  }
}
/deep/.van-search {
  padding: .px2rem(8) [] .px2rem(15) [];
}
</style>
