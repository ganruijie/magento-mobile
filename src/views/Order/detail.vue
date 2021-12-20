<template>
  <div class="order-detail">
    <div class="content">
      <div class="qr-message">
        <div class="qr-code">
          <div ref="qrCodeBox" class="qrCode-box">
            <div class="qrcode-box-qr">
              <canvas
                width="180"
                height="180"
                style="width: 180px; height: 180px;"
              />
            </div>
          </div>
          <div class="info"></div>
        </div>
        <div class="message">
          <div class="common-title">
            <h4>Message</h4>
          </div>
          <van-divider :hairline="false" />
          <div class="content-message">
            <div class="content-item">
              <p class="content-item_title">Amount Remaining</p>
              <div class="item_fiatCurrency">
                <div class="left">
                  <p>{{ orderDetail.amount }} {{ orderDetail.symbol }}</p>
                </div>
                <div class="right"></div>
              </div>
            </div>
            <div class="content-item">
              <p class="content-item_title">{{ orderDetail.networkName }}</p>
              <div class="item_address">
                <div class="address">{{ orderDetail.poolAddress }}</div>
                <div v-if="orderDetail.poolAddressTag" class="memo">
                  <p>Memo：{{ orderDetail.poolAddressTag }}</p>
                </div>
              </div>
            </div>
            <div class="content-item screen-xs24">
              <p class="content-item_title">Time Left</p>
              <div class="item_time">
                <app-count-down
                  :count-time="paidTime"
                  @timeOut="timeOut"
                ></app-count-down>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="verification-code">
        <div>
          <div class="common-title">
            <h4>Verification code</h4>
          </div>
          <van-divider :hairline="false" />
          <div class="code-content">
            <p>Make sure to use a regular send and not from a contract!</p>
            <p>
              Make sure to send enough to cover any coin transaction fees! Only
              send this coin over the ETH network and
            </p>
            <p>make sure to use regular sends not via any kind of contract!</p>
            <div style="margin-top: 16px">
              <p>
                Payment ID：<span class="collapse-text-type1">{{
                  orderDetail.orderNo
                }}</span>
              </p>
              <p>
                Verification Code：<span class="collapse-text-type1">{{
                  orderDetail.verificationCode
                }}</span
                >(save in case there are any issues with your payment)
              </p>
            </div>
          </div>
        </div>
        <div class="collapse">
          <van-collapse v-model="activeNames">
            <van-collapse-item title="What to do next?" name="1">
              <div class="collapse-text">
                1) Please send
                <span class="collapse-text-type1"
                  >{{ orderDetail.amount }} {{ orderDetail.symbol }}</span
                >
                to address
                <span class="collapse-text-type2">{{
                  orderDetail.address
                }}</span
                >.(Make sure to send enough to cover any coin transaction fees!)
                You will need to initiate the payment using your software or
                online wallet and copy/paste the address and payment amount into
                it. We will email you when all funds have been received.You have
                3 hours,59 minutes, 54 seconds for us to receive confirmed
                funds.lf you send funds that don't confirm by the timeout or
                don't send enough coins you will receive an automatic email to
                claim your funds within 8 hours. lf you don't receive the email
                contact us with the information below and we will send you a
                refund: i) The transaction ID:<span>{{
                  orderDetail.orderNo
                }}</span>
                ii) A payment address to send the funds to. iii) This
                verification code:
                <span>{{ orderDetail.verificationCode }}</span>
                (to verify that you are the transaction sender.)
              </div>
              <div style="margin-top:16px;" class="collapse-text">
                2) After sending payment,review the status of your transaction
                <router-link
                  class="collapse-text-type1"
                  :to="{
                    path: '/order-result',
                    query: {
                      transaction_no: orderDetail.orderNo
                    }
                  }"
                  >on this page</router-link
                >
                . Once the payment is confirmed several times in the block
                chain, the payment will be completed and the merchant will be
                notified. The confirmation process usually takes 10-45 minutes
                but varies based on the coin's target block time and number of
                block confirms required. The status page is available for the
                next 30 days.
              </div>
            </van-collapse-item>
            <van-collapse-item
              title="What if l accidentally don't send enough?"
              name="2"
            >
              <div class="collapse-text">
                lf you don't send enough,that is OK. Just send the remainder and
                we will combine them for you. You can also send from multiple
                wallets/accounts.
              </div>
            </van-collapse-item>
          </van-collapse>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("order");
import CountDown from "@/components/countDown.vue";
const AraleQRCode = require("@/modules/qrcode/index.js");
export default {
  name: "OrderDetail",
  components: {
    "app-count-down": CountDown
  },
  data() {
    return {
      activeNames: [""]
    };
  },
  computed: {
    ...mapState(["orderDetail"]),
    paidTime() {
      return this.orderDetail.expireTime
        ? +new Date(this.orderDetail.expireTime) - +new Date()
        : 0;
    }
  },
  created() {
    this.$Progress.start();
    this.init();
  },
  methods: {
    ...mapActions(["getOrderDetail"]),
    init() {
      let param = {};
      Object.assign(param, this.$route.query);
      this.$tips.showLoading();
      this.getOrderDetail(param)
        .then(res => {
          const { qrCodeUrl } = res;
          this.$nextTick(() => {
            const qr = new AraleQRCode({ text: qrCodeUrl, size: 180 });
            const tar = this.$refs.qrCodeBox.querySelector(".qrcode-box-qr");
            tar.innerHTML = "";
            tar.appendChild(qr);
          });
        })
        .finally(() => {
          this.$tips.removeLoading();
          this.$Progress.finish();
        });
    },
    timeOut() {
      this.$router.replace({
        path: "/order-detail-result",
        query: {
          transaction_no: this.orderDetail.orderNo
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.order-detail {
  width: 100vw;
  background-color: #f5f7ff;
  .content {
    padding: .px2rem(20) [] .px2rem(15) [];
  }
  .common-title {
    padding: .px2rem(8) [] .px2rem(20) [];
    h4 {
      display: block;
      font-size: .px2rem(18) [];
      color: @color-title;
      line-height: .px2rem(26) [];
    }
  }
}
.qr-message {
  background: #ffffff;
  box-shadow: 0px .px2rem(8) [] .px2rem(18) [] .px2rem(-6) []
    rgba(24, 39, 75, 0.12);
  border-radius: .px2rem(4) [];
  .qr-code {
    .qrCode-box {
      display: flex;
      justify-content: center;
      padding: .px2rem(30) [] 0px;
    }
  }
  .content-message {
    padding-bottom: .px2rem(20) [];
  }
  .content-item {
    padding: .px2rem(12) [] .px2rem(16) [] 0;
    .content-item_title {
      color: #7c8db0;
      font-size: .px2rem(14) [];
      line-height: .px2rem(20) [];
      margin-bottom: .px2rem(8) [];
    }
  }
  .item_fiatCurrency {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      p {
        color: #3e66fb;
        font-size: .px2rem(20) [];
        line-height: .px2rem(28) [];
        text-decoration: underline;
        word-break: break-all;
      }
    }
    .right {
      display: inline-block;
      width: .px2rem(24) [];
      height: .px2rem(18) [];
      line-height: .px2rem(16) [];
      background-image: url(~@/assets/order/right-arrow.svg);
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
  }
  .item_address {
    text-align: left;
    background-color: #ecf0ff;
    padding: .px2rem(10) [] .px2rem(16) [];
    .address {
      font-size: .px2rem(16) [];
      line-height: .px2rem(22) [];
      word-break: break-all;
    }
    .memo {
      margin-top: .px2rem(10) [];
      color: #e65c00;
      font-size: .px2rem(13) [];
      line-height: .px2rem(18) [];
    }
  }
}
.verification-code {
  margin-top: .px2rem(20) [];
  background: #ffffff;
  box-shadow: 0px .px2rem(8) [] .px2rem(18) [] .px2rem(-6) []
    rgba(24, 39, 75, 0.12);
  border-radius: .px2rem(4) [];
  .code-content {
    padding: .px2rem(16) [];
    color: #596c90;
    font-size: .px2rem(14) [];
    p {
      line-height: .px2rem(20) [];
    }
  }
  .collapse-text-type1 {
    color: #3e66fb;
  }
}
::v-deep .collapse {
  .van-collapse-item__title {
    background-color: #f5f7ff;
    color: #596c90;
    font-size: .px2rem(14) [];
    line-height: .px2rem(20) [];
    padding: .px2rem(14) [] .px2rem(20) [];
  }
  .van-collapse-item__content {
    padding: .px2rem(16) [];
  }
  .collapse-text {
    color: #596c90;
    font-size: .px2rem(14) [];
    line-height: .px2rem(20) [];
    word-break: break-word;
  }
  .collapse-text-type1 {
    color: #3e66fb;
    font-size: .px2rem(16) [];
  }
  .collapse-text-type2 {
    color: #333333;
    font-size: .px2rem(14) [];
  }
}
</style>
