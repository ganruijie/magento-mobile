<template>
    <div class="order-result">
        <div class="result-card">
            <div class="bill">
                <div class="card-item-title bill-title">
                <h3 class="title-text">Your bill</h3>
                </div>
                <div class="common-content bill-content">
                <div class="content-item">
                    <div class="name">Name</div>
                    <div class="value">{{ orderResult.name }}</div>
                </div>
                <div class="content-item">
                    <div class="name">Email</div>
                    <div class="value">{{ orderResult.buyerEmail }}</div>
                </div>
                <div class="content-item">
                    <div class="name">Amount</div>
                    <div class="value">{{ orderResult.amount }}</div>
                </div>
                <div v-if="[3].includes(orderResult.status)" class="content-item">
                    <div class="name">Paid Amount</div>
                    <div class="value">{{ orderResult.paidAmount }}</div>
                </div>
                <div class="content-item">
                    <div class="name">Thing</div>
                    <div class="value">{{ orderResult.description }}</div>
                </div>
                <div class="content-item">
                    <div class="name">Price</div>
                    <div class="value">{{ orderResult.coinPrice }}{{ orderResult.symbol }}</div>
                </div>
                <div v-if="[3].includes(orderResult.status)" class="content-item">
                    <div class="name">Remaining Amount</div>
                    <div class="value">{{ orderResult.paidAmount }}</div>
                </div>
                <div v-if="[2, 3].includes(orderResult.status)" class="content-item">
                    <div class="name">Address</div>
                    <div class="value">{{ orderResult.poolAddress }}</div>
                </div>
                <div v-if="![4, 6].includes(orderResult.status)" class="content-item">
                    <div class="name">Network</div>
                    <div class="value">{{ orderResult.network }}</div>
                </div>
                <div v-if="[4, 3].includes(orderResult.status)" class="content-item">
                    <div class="name">Paid Time</div>
                    <div class="value">{{ orderResult.paidTime }}</div>
                </div>
                <div v-if="![4, 6].includes(orderResult.status)&&orderResult.poolAddressTag" class="content-item">
                    <div class="name">Memo</div>
                    <div class="value">{{ orderResult.poolAddressTag }}</div>
                </div>
                <div class="item-status">
                    <div :class="['status-box', 
                        orderResult.status === 4 
                        ? 'success-color-b' : [2,3].includes(orderResult.status) 
                        ? 'wait-color-b' : orderResult.status === 6 
                        ? 'fail-color-b' : '']">
                    <div class="status-icon" style="font-size:0;">
                        <van-icon name="checked" size="0.64rem" color="#3E66FB" v-if="orderResult.status === 4" />
                        <van-icon name="clock-o" size="0.64rem" color="#FF0000" v-else-if="[2,3].includes(orderResult.status)" />
                        <van-icon name="close" size="0.64rem" color="#27273F" v-else-if="orderResult.status === 6" />
                        <van-icon name="info-o" size="0.64rem" v-else />
                    </div>
                    <div class="status-des">
                        <p>{{ payStatus[orderResult.status] || '--' }}</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="verification">
                <div class="top">
                <div class="card-item-title verification-title">
                    <h3 class="title-text">Verification code</h3>
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
                <div class="common-content">
                    <p style="display: inner-block;margin-bottom:0.26667rem;">Please keep your account and verification code</p>
                    <p>lf you don't receive the email contact us with the information below and CoinPayments.net will send you a refund:
                    i) The transaction ID: {{ orderResult.orderNo }} ii) A payment address to send the funds to.
                    iii) This verification code: {{ orderResult.verificationCode }} (to verify that you are the transaction sender.)</p>
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
export default {
    name: "OrderResult",
    data() {
        return {
            payStatus: {
                1: 'Waiting to bind the payment address',
                2: 'Waiting for your funds',
                3: 'Waiting for remaining funds',
                4: 'Completed',
                5: 'Time out',
                6: 'Canceled'
            }
        }
    },
    computed: {
        ...mapState(['orderResult']),
    },
    created() {
        this.$Progress.start();
        this.init();
    },
    methods: {
        ...mapActions(['getOrderResult']),
        init() {
            let param = {};
            Object.assign(param, this.$route.query);
            this.$tips.showLoading();
            this.getOrderResult(param).finally(() => {
                this.$tips.removeLoading();
                this.$Progress.finish();
            });
        }
    }
}
</script>
<style lang="less" scoped>
.order-result {
    width: 100vw;
    background-color: #F5F7FF;
}
.result-card {
    padding: .px2rem(20) [] .px2rem(15) [];
  .bill {
      background-color: #ffffff;
    padding: .px2rem(10) [];
    border: 1px solid #D7DEEA;
    box-sizing: border-box;
    border-radius: .px2rem(4) [];
    box-shadow: 0px .px2rem(8) [] .px2rem(18) [] .px2rem(-6) [] rgba(24, 39, 75, 0.12);
    margin-bottom: .px2rem(10) [];
  }
  .card-item-title {
    position: relative;
    margin-bottom: .px2rem(8) [];
    .title-text {
      color:#3E66FB;
      line-height: .px2rem(34) [];
      font-size: .px2rem(24) [];
      font-weight: 600;
      padding-left: .px2rem(30) [];
      &::after {
        position: absolute;
        content: '';
        width: .px2rem(4) [];
        height: .px2rem(24) [];
        background-color: #3E66FB;
        top: 50%;
        left: 0;
        margin-top: .px2rem(-12) [];
      }
    }
  }
  .verification {
    border: 1px solid #D7DEEA;
    box-sizing: border-box;
    border-radius: .px2rem(4) [];
    box-shadow: 0px .px2rem(8) [] .px2rem(18) [] .px2rem(-6) [] rgba(24, 39, 75, 0.12);
    background-color: #ffffff;
    .top, .bottom {
      padding: .px2rem(20) [];
    }
    .top {
      border-bottom: 1px solid #D7DEEA;
    }
    .bottom {
      p {
        color: #596C90;
        font-size: .px2rem(14) [];
        line-height: .px2rem(20) [];
      }
    }
  }
  .common-content {
    .content-item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      font-size: .px2rem(13) [];
      line-height: .px2rem(18) [];
      padding: .px2rem(8) [] 0px;
      .name {
        color: #7C8DB0;
        padding-right: .px2rem(10) []
      }
      .value {
        color: #27273F;
        padding-left: .px2rem(10) [];
        word-break: break-word;
      }
    }
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
      border-color: #3E66FB;
      color: #3E66FB;
    }
    .fail-color-b {
      border-color: #27273F;
      color: #27273F;
    }
    .wait-color-b {
      border-color: #FF0000;
      color: #FF0000;
    }
  }
}
</style>