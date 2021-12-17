<template>
  <div class="cart-content">
    <div class="cart-item">
      <h3 class="title">Your cart</h3>
      <div class="content">
        <div class="input-info-order">
          <div class="order-number">
            <p class="option-item-title">All order</p>
            <div class="option-item-text">
              <p class="order-number">order number:</p>
              <p class="option-item-title" style="text-decoration:underline">
                #111
              </p>
            </div>
          </div>
          <div class="order-amount">
            <p class="option-item-title">1111</p>
            <p class="option-item-text">1111</p>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-item">
      <h3 class="title">Billing Information</h3>
      <div class="content">
        <van-form class="input-form" @submit="onSubmit">
          <van-field
            v-model="inputInfo.customer_name"
            :border="false"
            name="customer_name"
            label=""
            placeholder="Name"
            :rules="[{ required: true, message: 'Name is missing' }]"
          />
          <van-field
            v-model="inputInfo.customer_email"
            :border="false"
            type="password"
            name="customer_email"
            label=""
            placeholder="Emial"
            :rules="[{ required: true, message: 'Emial is missing' }]"
          />
        </van-form>
      </div>
    </div>
    <div class="cart-item">
      <div class="input-info-title-flex">
        <div class="title_left">
          <h3 style="margin-bottom:0;" class="title">Coin & Network</h3>
        </div>
        <div class="title_right">({{ countDown }}s)</div>
      </div>
      <div class="content">
        <div class="select-box">
          <div
            :class="[
              'select-item',
              selectAmountIsHasChange ? 'switch-color' : ''
            ]"
            @click="coinSelectOpen"
          >
            <div class="place-holder" v-if="!selectItem">
              <p>Please Select Coin</p>
              <div class="">
                <van-icon name="arrow-up" v-if="coinSelectArrow" />
                <van-icon name="arrow-down" v-else />
              </div>
            </div>
            <div class="select-coin" v-else>
              <div class="left">
                <div class="img-box">
                  <img
                    :src="`${appApi}${selectItem.logoUrl}`"
                    alt=""
                    width="40"
                    height="40"
                  />
                </div>
                <div class="content-box">
                  <p>{{ selectItem.symbol }}</p>
                  <p style="color:#7C8DB0;font-size:14px;line-height: 20px">
                    {{ selectItem.name }}
                  </p>
                </div>
              </div>
              <div class="right">
                <p>{{ selectItem.amount }}</p>
                <div class="arrow">
                  <van-icon name="arrow-up" v-if="coinSelectArrow" />
                  <van-icon name="arrow-down" v-else />
                </div>
              </div>
            </div>
          </div>
          <div v-if="selectItem" class="select-item" @click="netWorkSelectOpen">
            <div class="place-holder" v-if="!selectNetwork">
              <p>Please Select Network</p>
              <div class="">
                <van-icon name="arrow-up" v-if="netWorkSelectArrow" />
                <van-icon name="arrow-down" v-else />
              </div>
            </div>
            <div class="select-coin" v-else>
              <div class="left">
                <div class="img-box">
                  <van-icon name="checked" />
                </div>
                <div class="content-box">
                  <p style="font-size:16px;color:#000000;">
                    {{ selectNetwork.network }}
                  </p>
                  <p style="font-size:14px;color:#7C8DB0;">
                    {{ selectNetwork.networkName }}
                  </p>
                </div>
              </div>
              <div class="right">
                <div class="arrow">
                  <van-icon name="arrow-up" v-if="netWorkSelectArrow" />
                  <van-icon name="arrow-down" v-else />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="submit-btn">
        <van-button color="#3E66FB">Complete Checkout</van-button>
      </div>
    </div>
    <van-popup
      v-model="coinSelectPopup"
      round
      position="bottom"
      :style="{ height: '60%' }"
    />
    <van-popup
      v-model="netWorkSelectPopup"
      round
      position="bottom"
      :style="{ height: '60%' }"
    />
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      appApi: process.env.VUE_APP_API,
      loaded: false,
      inputInfo: {
        customer_name: "",
        customer_email: ""
      },
      createPreOrder: null,
      countDown: 0,
      selectAmountIsHasChange: false,
      coinSelectArrow: false,
      netWorkSelectArrow: false,
      selectItem: null,
      selectNetwork: null,
      coinSelectPopup: false,
      netWorkSelectPopup: false
    };
  },
  created() {
    this.$Progress.start();
    this.init();
  },
  methods: {
    init() {
      this.$tips.showLoading();
      this.$tips.removeLoading();
      this.$Progress.finish();
    },
    onSubmit() {},
    coinSelectOpen() {
      this.coinSelectPopup = !this.coinSelectPopup;
    },
    netWorkSelectOpen() {
      this.netWorkSelectPopup = !this.netWorkSelectPopup;
    }
  }
};
</script>
<style lang="less" scoped>
.mg-b(@value) {
  margin-bottom: @value;
}
.cart-content {
  height: 100vh;
  padding: .px2rem(30) [] .px2rem(15) [];
  .cart-item {
    .mg-b(.px2rem(24) []);
    .title {
      color: @color-title;
      font-size: .px2rem(24) [];
      line-height: .px2rem(32) [];
      margin-bottom: .px2rem(16) [];
    }
  }
  .input-info-order {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #d7deea;
    border-radius: .px2rem(4) [];
    padding: .px2rem(18) [] .px2rem(12) [];
    .option-item-title {
      font-size: .px2rem(18) [];
      color: #27273f;
      font-weight: 600;
      line-height: .px2rem(26) [];
      .mg-b(.px2rem(5) []);
    }
    .option-item-text {
      font-size: .px2rem(16) [];
      line-height: .px2rem(22) [];
      color: @color-sub-title;
    }
    .order-number {
      color: @color-sub-title;
    }
  }
  ::v-deep .input-form {
    .van-field {
      line-height: normal;
      padding: 0;
      .mg-b(.px2rem(32) []);
      .van-field__body {
        padding: .px2rem(8) [] .px2rem(12) [];
        border-radius: .px2rem(4) [];
        color: #7c8db0;
        line-height: .px2rem(28) [];
        border: 1px solid #d7deea;
        font-size: .px2rem(14) [];
      }
      .van-field__error-message {
        margin-top: .px2rem(4) [];
        color: @color-tips;
        font-size: .px2rem(14) [];
        line-height: .px2rem(20) [];
      }
    }
    input::-webkit-input-placeholder {
      color: #d7deea;
      font-size: .px2rem(14) [];
    }
  }
  .input-info-title-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .px2rem(16) [];
    .title_right {
      color: #ff0000;
      font-size: .px2rem(15) [];
    }
  }
  .select-box {
    .select-item {
      background-color: #ffffff;
      cursor: pointer;
      height: .px2rem(48) [];
      line-height: .px2rem(48) [];
      padding: 0 .px2rem(10) [];
      box-sizing: border-box;
      border: 1px solid #dcdfe6;
      border-radius: .px2rem(4) [];
      .mg-b(.px2rem(16) []);
      &:hover {
        border-color: #c0c4cc;
      }
      .place-holder {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #7c8db0;
        font-size: .px2rem(14) [];
      }
      .select-coin {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px .px2rem(10) [];
        .left,
        .right {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          height: .px2rem(48) [];
        }
        .img-box {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-right: .px2rem(16) [];
        }
        .arrow {
          margin-left: .px2rem(20) [];
        }
        .content-box {
          p {
            line-height: .px2rem(20) [];
          }
        }
      }
    }
  }
  ::v-deep .submit-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: .px2rem(30) [];
    .van-button {
      padding: .px2rem(12) [] .px2rem(20) [];
      height: auto;
      border-radius: .px2rem(4) [];
      .van-button__text {
        font-size: .px2rem(18) [];
        line-height: .px2rem(26) [];
      }
    }
  }
}
</style>
