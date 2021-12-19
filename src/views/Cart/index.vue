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
                #{{ preOrder.outOrderNo }}
              </p>
            </div>
          </div>
          <div class="order-amount">
            <p class="option-item-title">{{ preOrder.amount }}</p>
            <p class="option-item-text">{{ preOrder.currency }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-item">
      <h3 class="title">Billing Information</h3>
      <div class="content">
        <van-form 
        class="input-form"
        ref="inputForm"
        @submit="onSubmit"
        @failed="onFailed">
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
          <!-- coin -select -->
          <div
            :class="[
              'select-item',
              noSelectItem ? 'input-info-no-select' : '',
              selectAmountIsHasChange && selectItem ? 'switch-color' : ''
            ]"
            @click="coinSelectOpen"
          >
            <div class="place-holder" v-if="!selectItem">
              <p>Please Select Coin</p>
              <div class="">
                <van-icon name="arrow-up" v-if="coinSelectArrow" :size="`${12/37.5}rem`" />
                <van-icon name="arrow-down" v-else :size="`${12/37.5}rem`" />
              </div>
            </div>
            <div class="select-coin" v-else>
              <div class="left">
                <div class="img-box">
                  <img :src="`${appApi}${selectItem.logoUrl}`" alt=""
                  />
                </div>
                <div class="content-box">
                  <p class="symbol">{{ selectItem.symbol }}</p>
                  <p class="name">
                    {{ selectItem.name }}
                  </p>
                </div>
              </div>
              <div class="right">
                <p>{{ selectItem.amount }}</p>
                <div class="arrow">
                  <van-icon name="arrow-up" v-if="coinSelectArrow" :size="`${12/37.5}rem`" />
                  <van-icon name="arrow-down" v-else :size="`${12/37.5}rem`" />
                </div>
              </div>
            </div>
          </div>
          <!-- network - select -->
          <div v-if="selectItem" :class="['select-item', noSelectNetwork ? 'input-info-no-select' : '']" @click="netWorkSelectOpen">
            <div class="place-holder" v-if="!selectNetwork">
              <p>Please Select Network</p>
              <div class="">
                <van-icon name="arrow-up" v-if="netWorkSelectArrow" :size="`${12/37.5}rem`" />
                <van-icon name="arrow-down" v-else :size="`${12/37.5}rem`" />
              </div>
            </div>
            <div class="select-coin" v-else>
              <div class="left">
                <div class="img-box">
                  <van-icon name="checked" :size="`${24/37.5}rem`" color="#3E66FB" />
                </div>
                <div class="content-box">
                  <p class="network">{{ selectNetwork.network }}</p>
                  <p class="network-name" style="color:#7C8DB0;">
                    {{ selectNetwork.networkName }}
                  </p>
                </div>
              </div>
              <div class="right">
                <div class="arrow">
                  <van-icon name="arrow-up" v-if="netWorkSelectArrow" :size="`${12/37.5}rem`" />
                  <van-icon name="arrow-down" v-else :size="`${12/37.5}rem`" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="submit-btn">
        <van-button 
          color="#3E66FB" 
          :loading-size="`${20/37.5}rem`"
          loading-text="submit..."
          :loading="submitLoading"
          @click="submitBtn">Complete Checkout</van-button>
      </div>
    </div>
    <!-- coin 选择的popup -->
    <van-popup
      v-model="coinSelectPopup"
      round
      position="bottom"
      :style="{ height: '60%' }"
      class="coin-select-popup">
      <van-picker
        ref="coinPopup"
        :columns="refreshOffer"
        visible-item-count="6"
        :show-toolbar="true"
        @cancel="coinSelectPopup = false"
        :item-height="`${64/37.5}rem`"
        :default-index="defaultIndexCoin"
        value-key="symbol"
      >
      <template #default>
        <div class="top-title">
          <span class="cancel" @click="coinSelectPopup = false">Cancel</span>
          <span class="title">please choose Coin</span>
          <span class="ok" @click="onConfirmCoinSelect">OK</span>
        </div>
        <div class="top-filter">
          <van-field
            v-model="selectSearch"
            clearable
            :border="false"
            label=""
            placeholder="Filter by name or ticker"
            @input="keySearchName"
          >
          <template #left-icon>
            <van-icon :size="`${16/37.5}rem`" name="search" />
          </template>
          </van-field>
        </div>
      </template>
      <template #option="props">
        <div class="select-item" >
          <div class="item-left">
            <div class="images">
              <img :src="`${appApi}${props.logoUrl}`" alt="">
            </div>
            <div class="title">
              <p clas="symbol">{{ props.symbol }}</p>
              <p class="name">{{ props.name }}</p>
            </div>
          </div>
          <div class="item-right">
            <p class="value">{{ props.amount }}</p>
          </div>
        </div>
      </template>
      </van-picker>
    </van-popup>
    <!-- network 选择的popup -->
    <van-popup
      v-model="netWorkSelectPopup"
      round
      position="bottom"
      :style="{ height: '60%' }"
      class="net-select-popup"
    >
      <van-picker
        ref="netWorkPopup"
        :columns="selectItem&&selectItem.tokenOffers"
        visible-item-count="6"
        :show-toolbar="true"
        @cancel="netWorkSelectPopup = false"
        :item-height="`${64/37.5}rem`"
        value-key="tokenId"
      >
      <template #default>
        <div class="top-title">
          <span class="cancel" @click="netWorkSelectPopup = false">Cancel</span>
          <span class="title">please choose Network </span>
          <span class="ok" @click="onConfirmNetWorkSelect">OK</span>
        </div>
      </template>
      <template #option="props">
        <div class="select-item" >
          <div class="item-left-net">
            <div class="title">{{ props.network }}</div>
            <div class="subtitle">{{ props.networkName }}</div>
          </div>
          <div class="item-right">
            <p class="value"></p>
          </div>
        </div>
      </template>
      </van-picker>
    </van-popup>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers("cart");
import * as cartTypes from "@/store/types/cart/mutations";
import api from '@/modules/api.js';
import { Throttle } from '@/modules/utils.js';
export default {
  name: "Cart",
  data() {
    return {
      appApi: process.env.VUE_APP_API,
      loading: false,
      inputInfo: {
        customer_name: "",
        customer_email: ""
      },
      selectAmountIsHasChange: false,
      coinSelectArrow: false,
      netWorkSelectArrow: false,
      selectItem: null,
      selectNetwork: null,
      coinSelectPopup: false,
      netWorkSelectPopup: false,
      selectSearch: '',
      timer: null,
      countDown: 30,
      selectAmountIsHasChange: false,
      submitLoading: false,
      noSelectItem: false,
      noSelectNetwork: false,
      redBorderTimer: null,
      defaultIndexCoin: 0,
      refreshOfferopy: []
    };
  },
  created() {
    this.$Progress.start();
    let { customer_first_name, customer_last_name, customer_email } = this.$route.query;
    this.inputInfo.customer_name = `${customer_first_name || ''} ${customer_last_name || ''}`.trim();
    this.inputInfo.customer_email = customer_email;
    this.init();
  },
  computed: {
    ...mapState({
      preOrder: state => state.orderOffer.preOrder
    }),
    ...mapState(['refreshOffer']),
  },
  watch: {
    "selectAmountIsHasChange": {
      handler(newValue) {
        if (newValue) {
          setTimeout(() => {
            this.selectAmountIsHasChange = false;
          }, 3000);
        }
      }
    }
  },
  methods: {
    ...mapActions(['getOrderOffer', 'getRefreshOffer']),
    ...mapMutations({setRefreshOffer: cartTypes.GET_REFRESH_OFFER}),
    init() {
      let param = {};
      Object.assign(param, this.$route.query);
      this.$tips.showLoading();
      this.getOrderOffer(param).then(() => {
        this.refreshOfferopy = [...this.refreshOffer];
        clearInterval(this.timer);
        this.countDownFn();
      }).finally(() => {
        this.$tips.removeLoading();
        this.$Progress.finish();
      });
    },
    submitBtn() {
      const infoInputForm = this.$refs.inputForm;
      infoInputForm.submit();
    },
    async onSubmit() {
      if (!this.selectItem) { this.noSelectItem = false; this.changeStatus(1); this.$toast({ position: "top", message: 'Please Select Coin' }); return false; }
      if (!this.selectNetwork) { this.noSelectNetwork = false; this.changeStatus(2); this.$toast({ position: "top", message: 'Please Select Network' }); return false; }
      const param = {
        pre_order_id: this.preOrder.id,
        customer_name: this.inputInfo.customer_name.trim(),
        customer_email: this.inputInfo.customer_email,
        token_id: this.selectNetwork.tokenId,
        coin_price: this.selectItem.price,
        amount: this.selectItem.amount, // check接口返回的offer中原样传递
        offer_time: this.selectItem.offerTime, // check接口返回的offer中原样传递
        code: this.selectItem.code, // check接口返回的offer中原样传递
      };
      this.submitLoading = true;
      await api.post('/place-order', param).then((res) => {
        const { transactionNo } = res.data;
        this.$router.replace({
          path: '/order-detail',
          query: {
            transaction_no: transactionNo,
          },
        });
      }).finally(() => {
        this.submitLoading = false;
      });
    },
    onFailed() {},
    coinSelectOpen() {
      this.coinSelectPopup = !this.coinSelectPopup;
      this.selectSearch = "";
      this.filterSearchFn(this.selectSearch);
    },
    netWorkSelectOpen() {
      this.netWorkSelectPopup = !this.netWorkSelectPopup;
    },
    onConfirmNetWorkSelect() {
      let result = this.$refs.netWorkPopup.getValues();
      this.selectNetwork = result[0];
      this.netWorkSelectPopup = false;
    },
    onConfirmCoinSelect() {
      let result = this.$refs.coinPopup.getValues();
      if (result.symbol !== (this.selectItem&&this.selectItem.symbol)) {
        this.selectNetwork = null;
      }
      this.selectItem = result[0];
      this.coinSelectPopup = false;
    },
    countDownFn() {
      let offersArr = [];
      this.timer = setInterval(() => {
        this.countDown -= 1;
        if (this.countDown === 3) {
          this.refreshOfferAuto().then(res => {
            this.selectAmountIsHasChange = true;
            const { offers } = res.data;
            offersArr = offers;
          });
        }else if (this.countDown === 0) {
          // 将选中的selectItem进行覆盖最新的
          offersArr.map((item, index) => {
            if (item.symbol === (this.selectItem&&this.selectItem.symbol)) {
              this.selectItem = item;
              this.defaultIndexCoin = index;
            }
          });
          this.refreshOfferopy = [...this.refreshOffer];
          if (this.coinSelectPopup) {
            this.filterSearchFn(this.selectSearch);
          }
          clearInterval(this.timer);
          this.countDown = 30;
          this.countDownFn();
        }
      }, 1000);
    },
    refreshOfferAuto() {
      const param = {
        pre_order_id: this.preOrder.id,
      };
      this.selectAmountIsHasChange = false;
      return this.getRefreshOffer(param).then((res) => {
        return res;
      }).finally(() => {});
    },
    filterSearchFn(value) {
      const reg = new RegExp(value.toLowerCase());
      // 使用备份数据过滤搜索框中匹配项
      const arr = [...this.refreshOfferopy];
      let result = [];
      arr.map((item) => {
        if (reg.test(item.symbol.toLowerCase())) {
          result = [...result, item];
        }
      });
      this.setRefreshOffer(result);
    },
    keySearchName(value) {
      Throttle(this.filterSearchFn(value), 500);
    },
    changeStatus(type) {
      clearInterval(this.redBorderTimer);
      let time = 0;
      this.redBorderTimer = setInterval(() => {
        if (time <= 5) {
          if (type === 1) {
            this.noSelectItem = !this.noSelectItem;
          } else {
            this.noSelectNetwork = !this.noSelectNetwork;
          }
          time++;
        } else {
          time = 0;
          clearInterval(this.redBorderTimer);
        }
      }, 600);
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.redBorderTimer);
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
        // padding: 0px .px2rem(10) [];
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
          img {
            width: .px2rem(30) [];
            height: .px2rem(30) [];;
          }
        }
        .arrow {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: .px2rem(10) [];
        }
        .content-box {
          .symbol, .network {
            color:#000000;
            font-size: .px2rem(14) [];
            line-height: .px2rem(20) [];
          }
          .name, .network-name {
            color:#7C8DB0;
            font-size: .px2rem(12) [];
            line-height: .px2rem(16) [];
          }
        }
        .right {
          p {
            font-size: .px2rem(14) [];
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
  ::v-deep .coin-select-popup, ::v-deep .net-select-popup {
    .van-picker__toolbar {
      display: block;
      height: unset;
      .top-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .mg-b(.px2rem(16) []);
        .title {
          display: inline-block;
          font-size: .px2rem(16) [];
          line-height: .px2rem(22) [];
          padding: 0px .px2rem(8) [];
        }
        .cancel, .ok { 
          color: #000000;
          font-size: .px2rem(16) [];
          line-height: .px2rem(22) [];
        }
        .ok {
          color: #3E66FB;
        }
      }
      .top-filter {
        border: 1px solid #D7DEEA;
        padding: .px2rem(6) [] .px2rem(16) [];
        border-radius: .px2rem(4) [];
        .van-cell {
          font-size: .px2rem(14) [];
          line-height: .px2rem(20) [];
          padding: 0px;
        }
        .van-field__clear {
          font-size:.px2rem(14) [];
        }
      }
    }
    .van-picker {
      padding: .px2rem(15) [];
    }
    .van-picker-column__item {
      box-sizing: border-box;
      display: block;
      padding: .px2rem(10) [];
    }
    .title {
      font-size: .px2rem(14) [];
      color: #000000;
      line-height: .px2rem(20) [];
    }
    .select-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item-left {
        display: flex;
        align-items: center;
        .images {
          margin-right: .px2rem(16) [];
          img {
            width: .px2rem(30) [];
            height: .px2rem(30) [];
            display: block;
            font-size: 0px;
          }
        }
        .name {
          color: #7C8DB0;
          font-size: .px2rem(12) [];
          line-height: .px2rem(16) [];
        }
      }
      .item-left-net {
        .subtitle {
          margin-top: .px2rem(4) [];
          color: #7C8DB0;
          font-size: .px2rem(12) [];
          line-height: .px2rem(16) [];
        }
      }
      .item-right {
        p {
          font-size: .px2rem(14) [];
          line-height: .px2rem(20) [];
          color: #000000;
        }
      }
    }

  }
}
.input-info-no-select {
  border: 1px solid @color-red !important;
}
.switch-color {
  animation: shake 1s infinite;
}
@keyframes shake {
  50% {
    background-color: #dcdfe6;
  }
}
</style>
