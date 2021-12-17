<template>
  <main>
    <h1 style="margin-top:calc(50vh - 7px);font-size: 16px;text-align: center">
      抱歉，你要找的东西消失了~
    </h1>
  </main>
</template>

<script>
export default {
  name: "NotFound404",
  beforeRouteUpdate(to, from, next) {
    this.$Progress.start();
    this.nextTick(() => {
      this.$Progress.finish();
      next();
    });
  }
};
</script>

<style lang="less" scoped></style>
