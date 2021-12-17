export const code = {
  NET_ERR: 10001,
  PHONE_INVALID: 1879244800,
  OAUTH_FAILED: 65536,
  TEAM_DOES_NOT_EXIST: 1879441412,
  WX_PAY_CANCEL: "chooseWXPay:cancel"
};

export const msg = {
  [code.NET_ERR]: "网络异常，请稍后重试",
  [code.PHONE_INVALID]: "请输入正确的手机号",
  [code.OAUTH_FAILED]: "微信授权失败"
};
