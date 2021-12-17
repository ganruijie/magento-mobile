<!--
     author : liuzhuo
     date : 2019/7/5
     time : 20:08
 -->
<template>
  <div class="clear-session" @click="clear">
    清除session
  </div>
</template>

<script>
export default {
  name: "ClearSessionButton",
  methods: {
    clear() {
      fetch("/tools/delSession", {
        method: "GET",
        credentials: "include"
      }).finally(() => {
        alert("session已清除");
      });
    }
  },
  install(Vue) {
    let VComponent = Vue.extend(this);
    let single = new VComponent({
      el: document.createElement("div")
    });
    document.body.appendChild(single.$el);
  }
};
</script>

<style lang="less" scoped>
.clear-session {
  position: fixed;
  right: 50px;
  bottom: 120px;
  width: 200px;
  height: 70px;
  font-size: 28px;
  text-align: center;
  line-height: 70px;
  .btn-color(deepskyblue);
  color: white;
  border-radius: 10px;
}
</style>
