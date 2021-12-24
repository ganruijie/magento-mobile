import "@/styles/index.less";
import Vue from "vue";
import VueProgressBar from "vue-progressbar";
import {
  Col,
  Row,
  Swipe,
  SwipeItem,
  Search,
  Grid,
  GridItem,
  Button,
  Field,
  Empty,
  Image,
  Icon,
  Picker,
  Tag,
  Loading,
  Toast,
  Collapse,
  CollapseItem,
  Divider,
  Dialog,
  NavBar,
  Popup,
  IndexBar,
  CountDown,
  Form,
  Sticky
} from "vant";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import { dispatchActiveSelector } from "@/modules/utils";
import Tips from "@/plugins/tips/index.vue";
import "./config/remconfig";

Vue.component(Col.name, Col);
Vue.component(Row.name, Row);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Search.name, Search);
Vue.component(Grid.name, Grid);
Vue.component(GridItem.name, GridItem);
Vue.component(Button.name, Button);
Vue.component(Field.name, Field);
Vue.component(Empty.name, Empty);
Vue.component(Image.name, Image);
Vue.component(Icon.name, Icon);
Vue.component(Tag.name, Tag);
Vue.component(Loading.name, Loading);
Vue.component(Toast.name, Toast);
Vue.component(Collapse.name, Collapse);
Vue.component(CollapseItem.name, CollapseItem);
Vue.component(Divider.name, Divider);
Vue.component(Dialog.name, Dialog);
Vue.component(NavBar.name, NavBar);
Vue.component(Popup.name, Popup);
Vue.component(IndexBar.name, IndexBar);
Vue.component(CountDown.name, CountDown);
Vue.component(Form.name, Form);
Vue.component(Picker.name, Picker);
Vue.component(Sticky.name, Sticky);

Vue.use(Tips);
Vue.use(VueProgressBar, {
  color: "deepskyblue",
  failedColor: "#874b4b",
  thickness: "3px",
  transition: {
    speed: "0.2s",
    opacity: "0.6s",
    termination: 300
  },
  autoRevert: true
});
Vue.prototype.$alert = Dialog.alert;
process.env.NODE_ENV === "development" &&
  import("@/plugins/clearSessionButton").then(module =>
    Vue.use(module.default)
  );

Vue.config.productionTip = process.env.NODE_ENV === "production";

dispatchActiveSelector(document.body);

export default new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
