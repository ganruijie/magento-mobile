<!--
     author : liuzhuo
     date : 2018/10/11 0011
     time : 17:37
     这个组件不指定 tag属性时除了样式基本就表现为原生<button type="button"></button>
     可直接v-on监听原生事件
 -->
<script>
export default {
  name: "StyledButton",
  props: {
    tag: {
      type: String,
      default: "button"
    }
  },
  computed: {
    listeners() {
      return Object.assign({}, this.$listeners);
    }
  },
  render(createElement) {
    return createElement(
      //用render函数来做到根据传入的 tag来生成响应的根元素
      this.tag,
      {
        class: ["styled-button"],
        on: {
          ...this.listeners
        },
        attrs: {
          type: "button",
          ...this.$attrs
        }
      },
      [this.$slots.default]
    );
  }
};
</script>

<style lang="less" scoped>
.styled-button {
  margin: 0;
  height: 50px;
  line-height: 50px;
  width: 100%;
  text-align: center;
  font-size: inherit;
  border-radius: 8px;
  color: #fff;
  .btn-color(@color-btn-bg);
  &:disabled,
  &[disabled] {
    color: @color-btn-disable-ft;
    background-color: @color-btn-disable-bg;
  }
}
</style>
