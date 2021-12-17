import "@/styles/index.less";
import Vue from "vue";
import VueProgressBar from "vue-progressbar";
import {
  Col,
  Row,
  Cell,
  CellGroup,
  Swipe,
  SwipeItem,
  Search,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  Grid,
  GridItem,
  Button,
  Field,
  Empty,
  Image,
  Icon,
  ActionSheet,
  Tag,
  Loading,
  Toast,
  Overlay,
  Divider,
  Dialog,
  Lazyload,
  List,
  Sticky,
  NavBar,
  Popup,
  IndexBar,
  IndexAnchor,
  RadioGroup,
  Radio,
  CountDown,
} from "vant";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "./registerServiceWorker";
import { dispatchActiveSelector } from "@/modules/utils";
import Tips from "@/plugins/tips/index.vue";
import "./config/remconfig";

Vue.use(Lazyload, {
  lazyComponent: true
});
Vue.component(Col.name, Col);
Vue.component(Row.name, Row);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Search.name, Search);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabbarItem.name, TabbarItem);
Vue.component(Tab.name, Tab);
Vue.component(Tabs.name, Tabs);
Vue.component(Cell.name, Cell);
Vue.component(CellGroup.name, CellGroup);
Vue.component(Grid.name, Grid);
Vue.component(GridItem.name, GridItem);
Vue.component(Button.name, Button);
Vue.component(Field.name, Field);
Vue.component(Empty.name, Empty);
Vue.component(Image.name, Image);
Vue.component(Icon.name, Icon);
Vue.component(ActionSheet.name, ActionSheet);
Vue.component(Tag.name, Tag);
Vue.component(Loading.name, Loading);
Vue.component(Toast.name, Toast);
Vue.component(Overlay.name, Overlay);
Vue.component(Divider.name, Divider);
Vue.component(Dialog.name, Dialog);
Vue.component(List.name, List);
Vue.component(Sticky.name, Sticky);
Vue.component(NavBar.name, NavBar);
Vue.component(Popup.name, Popup);
Vue.component(IndexBar.name, IndexBar);
Vue.component(IndexAnchor.name, IndexAnchor);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(Radio.name, Radio);
Vue.component(CountDown.name, CountDown);

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
