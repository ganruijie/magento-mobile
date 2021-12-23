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
              <p class="content-item_title">Payment Process Expiration</p>
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
            <h4 style="color:#f23030;font-weight:600;">[Important]</h4>
          </div>
          <van-divider :hairline="false" />
          <div class="code-content">
            <p style="color:#f23030;">
              To make sure the payment goes through successfully, please:
            </p>
            <ul class="ul-box">
              <li>
                Use a regular transfer instead of any smart contract or
                third-party DApps
              </li>
              <li>
                Send the payment through the correct network or it could lead to
                payment failure and permanent asset loss
              </li>
            </ul>
            <div class="order-code" style="margin-top: 0.426667rem">
              <div>
                <span class="code-title">Payment ID：</span>
                <span class="collapse-text-type1">{{
                  orderDetail.orderNo
                }}</span>
              </div>
              <div>
                <span class="code-title">Verification Code：</span>
                <span class="collapse-text-type1">{{
                  orderDetail.verificationCode
                }}</span
                >(Save this verification code in case there are any issues with
                your payment)
              </div>
            </div>
          </div>
        </div>
        <div class="collapse">
          <van-collapse v-model="activeNames">
            <van-collapse-item title="What to do next?" name="1">
              <div class="collapse-text">
                <p>
                  1) Please complete the payment before the payment expiration.
                  You will need to initiate the payment using your
                  cryptocurrency wallet. Please scan the QRcode or copy/paste
                  the address and payment amount to avoid any mistakes. A
                  notification email will be sent to your email when all funds
                  have been received by SafePal Pay. If the transaction cannot
                  be confirmed or is less than the order amount before the
                  payment expiration, you will receive an automatic email of
                  payment failure. In such a case, please
                  <a
                    target="_blank"
                    href="https://safepalsupport.zendesk.com/hc/en-us/requests/new"
                    >contact us
                    https://safepalsupport.zendesk.com/hc/en-us/requests/new</a
                  >
                  with the information below for a full refund:
                </p>
                <p>
                  i) Transaction ID: <span>{{ orderDetail.orderNo }}</span>
                </p>
                <p>
                  ii) Your refund address (Only a decentralized wallet address
                  is accepted. Please do not use an exchange address for the
                  refund)
                </p>
                <p>
                  iii) The payment verification code :
                  <span>{{ orderDetail.verificationCode }}</span> (to verify
                  that you are the transaction sender)
                </p>
              </div>
              <div style="margin-top:16px;" class="collapse-text">
                2) After you sign the payment, please wait patienly until the
                transaction is fully confirmed. This process usually takes 10-45
                minutes, pending on the actual blockchain traffic. Once the
                payment is confirmed, a notification e-mail will be sent to your
                mailbox, including the payment details.
              </div>
            </van-collapse-item>
            <van-collapse-item
              title="What if I didn’t send sufficient amount for the first time?"
              name="2"
            >
              <div class="collapse-text">
                If you didn’t send sufficient amount for the order, please go
                ahead and send the remainder to the same payment address before
                the payment expiration.
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
      // font-weight: 600;
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
    .ul-box {
      color: #f23030;
      li {
        position: relative;
        line-height: .px2rem(20) [];
        padding-left: .px2rem(16) [];
        &::after {
          position: absolute;
          content: "";
          left: 0;
          top: .px2rem(6) [];
          width: .px2rem(8) [];
          height: .px2rem(8) [];
          border-radius: 50%;
          background-color: #f23030;
        }
      }
    }
    p {
      line-height: .px2rem(20) [];
    }
    .order-code {
      div {
        word-break: break-all;
        line-height: .px2rem(20) [];
      }
      .code-title {
        display: inline-block;
        line-height: .px2rem(20) [];
        font-weight: 600;
      }
    }
  }
  .collapse-text-type1 {
    color: @color-title-style2;
  }
}
::v-deep .collapse {
  .van-collapse-item__title {
    background-color: #f5f7ff;
    color: #596c90;
    font-size: .px2rem(18) [];
    line-height: .px2rem(22) [];
    padding: .px2rem(14) [] .px2rem(20) [];
    font-weight: 600;
  }
  .van-collapse-item__content {
    padding: .px2rem(16) [];
  }
  .collapse-text {
    color: #596c90;
    font-size: .px2rem(14) [];
    line-height: .px2rem(20) [];
    word-break: break-word;
    a {
      color: #3e66fb;
      text-decoration-line: underline;
    }
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
