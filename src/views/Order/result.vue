<template>
  <div class="order-result">
    <div class="result-card">
      <div class="qr-code-box" v-if="orderResult.status === 3 && false">
        <div class="card-item-title bill-title">
          <h3 class="title-text">QR code for payment</h3>
        </div>
        <div class="common-content">
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
        </div>
      </div>
      <div class="bill">
        <div class="card-item-title bill-title">
          <h3 v-if="[6, 7].includes(orderResult.status)" class="title-text">
            Your payment process expired
          </h3>
          <h3 v-else-if="orderResult.status === 2" class="title-text">
            Please complete the payment
          </h3>
          <h3 v-else-if="orderResult.status === 3" class="title-text">
            Please pay the remaining amount
          </h3>
          <h3 v-else-if="orderResult.status === 4" class="title-text">
            The payment is completed
          </h3>
          <h3 v-else class="title-text">Your bill</h3>
        </div>
        <div class="common-content bill-content">
          <div class="content-item">
            <div class="name">Name</div>
            <div class="value">{{ orderResult.buyerName }}</div>
          </div>
          <div class="content-item">
            <div class="name">Email</div>
            <div class="value">{{ orderResult.buyerEmail }}</div>
          </div>
          <div class="content-item">
            <div class="name">Amount</div>
            <div class="value">
              {{ orderResult.amount }} {{ orderResult.symbol }}
            </div>
          </div>
          <div
            v-if="[3, 6, 7].includes(orderResult.status)"
            class="content-item"
          >
            <div class="name">Paid Amount</div>
            <div
              v-if="
                [6, 7].includes(orderResult.status) && orderResult.paidAmount
              "
              class="value"
            >
              {{ orderResult.paidAmount }} {{ orderResult.symbol }}
            </div>
            <div v-else class="value">
              {{ orderResult.paidAmount }} {{ orderResult.symbol }}
            </div>
          </div>
          <div
            v-if="
              [2, 4, 3, 6, 7].includes(orderResult.status) &&
                orderResult.paidTime
            "
            class="content-item"
          >
            <div class="name">Payment Time</div>
            <div class="value">
              {{ dateFormate(`${orderResult.paidTime}`) }}
            </div>
          </div>
          <div v-if="orderResult.status === 3" class="content-item">
            <div class="name">Remaining Amount</div>
            <div class="value">
              {{ orderResult.remainingAmount }} {{ orderResult.symbol }}
            </div>
          </div>
          <div
            v-if="![4, 6, 7].includes(orderResult.status)"
            class="content-item"
          >
            <div class="name">Network</div>
            <div class="value">{{ orderResult.networkName }}</div>
          </div>
          <div v-if="[2, 3].includes(orderResult.status)" class="content-item">
            <div class="name">Address</div>
            <div class="value">{{ orderResult.poolAddress }}</div>
          </div>
          <div
            v-if="
              ![4, 6, 7].includes(orderResult.status) &&
                orderResult.poolAddressTag
            "
            class="content-item"
          >
            <div style="color:#f23030;" class="name">Memo</div>
            <div style="color:#f23030;" class="value">
              <p>{{ orderResult.poolAddressTag }}</p>
              <p>
                (Tips:Make sure you enter both the address and Memo correctly
                before the transfer.)
              </p>
            </div>
          </div>
          <div class="item-status">
            <div
              :class="[
                'status-box',
                orderResult.status === 4
                  ? 'success-color-b'
                  : [2, 3].includes(orderResult.status)
                  ? 'wait-color-b'
                  : orderResult.status === 6
                  ? 'fail-color-b'
                  : ''
              ]"
            >
              <div class="status-icon" style="font-size:0;">
                <van-icon
                  name="checked"
                  size="0.64rem"
                  color="#3E66FB"
                  v-if="orderResult.status === 4"
                />
                <van-icon
                  name="clock-o"
                  size="0.64rem"
                  color="#FF0000"
                  v-else-if="[2, 3].includes(orderResult.status)"
                />
                <van-icon
                  name="close"
                  size="0.64rem"
                  color="#27273F"
                  v-else-if="[6, 7].includes(orderResult.status)"
                />
                <van-icon name="info-o" size="0.64rem" v-else />
              </div>
              <div class="status-des">
                <p>{{ payStatus[orderResult.status] || "--" }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="verification">
        <div class="top">
          <div class="card-item-title verification-title">
            <h3 class="title-text">Payment details</h3>
          </div>
          <div class="common-content verification-content">
            <div class="content-item">
              <div class="name">Payment ID</div>
              <div class="value">{{ orderResult.orderNo }}</div>
            </div>
            <div class="content-item">
              <div class="name">Verification Code</div>
              <div class="value">{{ orderResult.verificationCode }}</div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <!-- [6, 7].includes(orderResult.status) && orderResult.paidAmount --- 部分付款-超时 -->
          <div v-if="[6, 7].includes(orderResult.status)">
            <div
              class="common-content"
              v-if="orderResult.paidAmount && orderResult.paidAmount !== '0'"
            >
              <p style="display: inner-block;margin-bottom:0.26667rem;">
                Please
                <a
                  target="_blank"
                  href="https://safepalsupport.zendesk.com/hc/en-us/requests/new"
                  >contact us
                  https://safepalsupport.zendesk.com/hc/en-us/requests/new</a
                >
                with the information below for a refund of the amount paid:
              </p>
              <p>
                i) Payment ID: <span>{{ orderResult.orderNo }}</span>
              </p>
              <p>
                ii) Your refund address (Only a decentralized wallet address is
                accepted. Please do not use an exchange address for the refund)
              </p>
              <p>
                iii) The payment verification code :<span>{{
                  orderResult.verificationCode
                }}</span>
                (to verify that you are the transaction sender)
              </p>
            </div>
          </div>
          <div v-else>
            <div v-if="orderResult.status === 2" class="common-content">
              <p style="display: inner-block;margin-bottom:0.26667rem;">
                If the transaction cannot be confirmed or is less than the order
                amount before the payment expiration, you will receive an
                automatic email of payment failure. In such a case, please
                <a
                  target="_blank"
                  href="https://safepalsupport.zendesk.com/hc/en-us/requests/new"
                  >contact us
                  https://safepalsupport.zendesk.com/hc/en-us/requests/new</a
                >
                with the information below for a full refund:
              </p>
              <p>i) Payment ID: {{ orderResult.orderNo }}</p>
              <p>
                ii) Your refund address (Only a decentralized wallet address is
                accepted. Please do not use an exchange address for the refund)
              </p>
              <p>
                iii) The payment verification code :
                {{ orderResult.verificationCode }} (to verify that you are the
                transaction sender)
              </p>
            </div>
            <div class="common-content" v-else-if="orderResult.status === 3">
              <p style="display: inner-block;margin-bottom:0.26667rem;">
                If the transaction cannot be confirmed or is less than the order
                amount before the payment expiration, you will receive an
                automatic email of payment failure. In such a case, please
                <a
                  target="_blank"
                  href="https://safepalsupport.zendesk.com/hc/en-us/requests/new"
                  >contact us
                  https://safepalsupport.zendesk.com/hc/en-us/requests/new</a
                >
                with the information below for a full refund:
              </p>
              <p>i) Payment ID: {{ orderResult.orderNo }}</p>
              <p>
                ii) our refund address (Only a decentralized wallet address is
                accepted. Please do not use an exchange address for the refund)
              </p>
              <p>
                iii) The payment verification code :
                {{ orderResult.verificationCode }} (to verify that you are the
                transaction sender)
              </p>
            </div>
            <div class="common-content" v-else-if="orderResult.status === 4">
              <p style="display: inner-block;margin-bottom:0.26667rem;">
                Once the payment is confirmed, a notification e-mail will be
                sent to your mailbox, including the payment details. Please
                check your spam box if you don’t see the email in the inbox.
              </p>
            </div>
            <div class="common-content" v-else>
              <p style="display: inner-block;margin-bottom:0.26667rem;">
                Please keep your account and verification code
              </p>
              <p>
                lf you don't receive the email, contact us with the information
                below and we will send you a refund: i) The transaction ID:
                {{ orderResult.orderNo }} ii) A payment address to send the
                funds to. iii) This verification code:
                {{ orderResult.verificationCode }} (to verify that you are the
                transaction sender.)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * WAITING_BIND(1),                // 等待绑定收款地址
    WAITING_PAY(2),                 // 等待付款
    PARTIALLY_PAID(3),              // 部分付款
    TOTALLY_PAID(4),                // 全部付款
    REFUND(5),                      // 退款
    EXPIRED(6),                     // 超时
    CLOSED(7);                      // 关闭（由商户主动关闭）
*/
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("order");
import { filterDate } from "@/modules/formatter.js";
const AraleQRCode = require("@/modules/qrcode/index.js");
export default {
  name: "OrderResult",
  data() {
    return {
      payStatus: {
        1: "Waiting to bind the payment address",
        2: "Waiting for your funds",
        3: "Waiting for the remaining payment",
        4: "Completed",
        5: "Refund",
        6: "Time out",
        7: "Canceled"
      }
    };
  },
  computed: {
    ...mapState(["orderResult"])
  },
  created() {
    this.$Progress.start();
    this.init();
  },
  methods: {
    ...mapActions(["getOrderResult"]),
    init() {
      let param = {};
      Object.assign(param, this.$route.query);
      this.$tips.showLoading();
      this.getOrderResult(param)
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
    dateFormate(value) {
      return filterDate(value, "yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>
<style lang="less" scoped>
.cart-style {
  background-color: #ffffff;
  padding: .px2rem(10) [];
  border: 1px solid #d7deea;
  box-sizing: border-box;
  border-radius: .px2rem(4) [];
  box-shadow: 0px .px2rem(8) [] .px2rem(18) [] .px2rem(-6) []
    rgba(24, 39, 75, 0.12);
  margin-bottom: .px2rem(10) [];
}
.order-result {
  width: 100vw;
  min-height: 100vh;
  background-color: #f5f7ff;
}
.result-card {
  padding: .px2rem(20) [] .px2rem(15) [];
  .qr-code-box {
    .cart-style();
    .qr-code {
      .qrCode-box {
        display: flex;
        justify-content: center;
        padding: .px2rem(30) [] 0px;
      }
    }
  }
  .bill {
    .cart-style();
  }
  .card-item-title {
    position: relative;
    margin-bottom: .px2rem(8) [];
    .title-text {
      color: #3e66fb;
      line-height: .px2rem(30) [];
      font-size: .px2rem(20) [];
      // font-weight: 600;
      padding-left: .px2rem(20) [];
      &::after {
        position: absolute;
        content: "";
        width: .px2rem(4) [];
        height: .px2rem(20) [];
        background-color: #3e66fb;
        top: .px2rem(5) [];
        left: 0;
      }
    }
  }
  .verification {
    border: 1px solid #d7deea;
    box-sizing: border-box;
    border-radius: .px2rem(4) [];
    box-shadow: 0px .px2rem(8) [] .px2rem(18) [] .px2rem(-6) []
      rgba(24, 39, 75, 0.12);
    background-color: #ffffff;
    .top {
      padding: .px2rem(20) [];
    }
    .top {
      border-bottom: 1px solid #d7deea;
    }
    .bottom {
      p {
        color: #596c90;
        font-size: .px2rem(14) [];
        line-height: .px2rem(20) [];
      }
    }
  }
  .common-content {
    word-break: break-all;
    padding: .px2rem(20) [];
    .content-item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      font-size: .px2rem(13) [];
      line-height: .px2rem(18) [];
      padding: .px2rem(8) [] 0px;
      .name {
        color: #7c8db0;
        padding-right: .px2rem(10) [];
        min-width: 1.8rem;
      }
      .value {
        color: #27273f;
        padding-left: .px2rem(10) [];
        word-break: break-word;
      }
    }
    a {
      text-decoration: underline;
      color: #3e66fb;
    }
  }
  .verification-content {
    padding: 0;
  }
  .item-status {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: .px2rem(16) [];
    .status-box {
      border-width: 1px;
      border-style: solid;
      box-sizing: border-box;
      border-radius: .px2rem(4) [];
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: .px2rem(10) [];
    }
    .status-des {
      margin-left: .px2rem(16) [];
      font-size: .px2rem(18) [];
      line-height: .px2rem(26) [];
    }
    .success-color-b {
      border-color: #3e66fb;
      color: #3e66fb;
    }
    .fail-color-b {
      border-color: #27273f;
      color: #27273f;
    }
    .wait-color-b {
      border-color: #ff0000;
      color: #ff0000;
    }
  }
}
</style>
