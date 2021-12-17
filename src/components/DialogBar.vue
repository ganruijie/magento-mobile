<template>
  <div class="dialog_bar">
    <van-popup
      v-model="showDialog"
      closeable
      @close="closeFn"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <div class="top">
        <p>Countries and regions</p>
      </div>
      <div class="content">
        <van-index-bar :sticky-offset-top="stickyTop" :index-list="indexList">
          <div v-for="(i, index) in list" :key="index">
            <van-index-anchor :index="i.index" />
            <van-cell v-for="(v, k) in i.item" :key="k" :data="v.code">
              <template #title>
                <p
                  class="custom-title"
                  @click="clickBar({ code: v.code, name: v.name })"
                >
                  {{ v.name }}
                </p>
              </template>
            </van-cell>
          </div>
        </van-index-bar>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "DialogBar",
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      indexList: ["C", "S"],
      showDialog: false,
      list: [
        {
          index: "C",
          item: [{ code: "86", name: "China(+86)" }]
        },
        {
          index: "S",
          item: [{ code: "94", name: "Sri Lanka(+94)" }]
        }
      ]
    };
  },
  watch: {
    show: {
      handler(val) {
        this.showDialog = val;
      }
    }
  },
  computed: {
    stickyTop() {
      return parseFloat(document.documentElement.style.fontSize) * 1.6;
    }
  },
  methods: {
    closeFn() {
      this.$emit("update:show", false);
    },
    clickBar(obj) {
      this.$emit("change", obj);
      this.closeFn();
    }
  }
};
</script>
<style lang="less" scoped>
.dialog_bar {
  .f-pingfang-regular();
}
.top {
  width: 100vw;
  height: 120px;
  line-height: 120px;
  // padding: 20px 0px;
  position: fixed;
  top: 0;
  z-index: 999;
  background-color: #fff;
  p {
    font-size: 32px;
    color: #333333;
    text-align: center;
  }
}
.content {
  margin-top: 122px;
  /deep/.van-index-bar {
    .van-index-bar__sidebar {
      .van-index-bar__index {
        font-size: 20px;
        line-height: 24px;
      }
    }
    .van-index-anchor {
      padding: 0px 30px;
      font-size: 36px;
      line-height: 50px;
      font-weight: 600;
      background-color: #ebe8e8;
    }
    .van-cell {
      font-size: 30px;
      line-height: 40px;
      color: #333333;
      padding: 16px 30px;
    }
  }
}
/deep/.van-icon-cross {
  font-size: 40px;
  position: fixed;
  z-index: 999;
  top: 30px !important;
}
</style>
