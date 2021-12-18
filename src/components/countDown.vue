<template>
  <div class="CountDown">
    <p v-if="timeUp">{{ timeUp }}</p>
    <p v-else>00:00:00</p>
  </div>
</template>
<script>
export default {
  name: 'CountDown',
  data() {
    return {
      timer: null,
      paidTime: 0,
      timeUp: 0
    }
  },
  props: {
    countTime: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  emits: ['timeOut'],
  watch: {
    'countTime': {
      handler(newVal, oldVal) {
        this.paidTime = newVal;
        this.add();
      },
    }
  },
  methods: {
    add() {
      window.clearInterval(this.timer);
      this.timer = window.setInterval(() => {
        if (this.paidTime < 1) {
          window.clearInterval(this.timer);
          this.$emit('timeOut');
          return false;
        }
        let hours = parseInt((this.paidTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = parseInt((this.paidTime % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = parseInt((this.paidTime % (1000 * 60)) / 1000);
        hours = hours < 10 ? `0${hours}` : hours;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        this.timeUp = `${hours}:${minutes}:${seconds}`;
        this.paidTime -= 1000;
      }, 1000);
    },
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
  }
};
</script>
<style lang="less" scoped>
  .CountDown {
    padding: 0px .px2rem(4) [];;
    font-size: .px2rem(16) [];
    p {
      line-height: .px2rem(22) [];
      color: #27273F;
      font-weight: 500;
    }
  }
</style>
