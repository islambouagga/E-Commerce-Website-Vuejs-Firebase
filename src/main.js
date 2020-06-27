import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import 'bootstrap';
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;
import 'popper.js';
import './assets/app.scss';
import {fb} from './firebase.js';
import VueFirestore from 'vue-firestore';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueCarousel from 'vue-carousel';
import Vue2Filters from 'vue2-filters'
import store from "./store";

Vue.use(Vue2Filters)
Vue.use(VueCarousel);
Vue.use(VueSweetalert2);
Vue.use(VueFirestore);


require('firebase/firestore')

Vue.use(VueFirestore, {
  key: 'id',         // the name of the property. Default is '.key'.
  enumerable: true  //  whether it is enumerable or not. Default is true.
})
Vue.component('NavBar',require('./components/NavBar.vue').default);
Vue.component('add-to-cart',require('./components/AddToCart.vue').default);
Vue.component('mini-cart',require('./components/MiniCart.vue').default);
Vue.component('productslist',require('./sections/productList.vue').default);
Vue.config.productionTip = false;

let app ='';

fb.auth().onAuthStateChanged((user) => {
  console.log(user)
if (!app){
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");

}
});







jQuery(function ($) {

  // Dropdown menu
  $(".sidebar-dropdown > a").click(function () {
    $(".sidebar-submenu").slideUp(200);
    if ($(this).parent().hasClass("active")) {
      $(".sidebar-dropdown").removeClass("active");
      $(this).parent().removeClass("active");
    } else {
      $(".sidebar-dropdown").removeClass("active");
      $(this).next(".sidebar-submenu").slideDown(200);
      $(this).parent().addClass("active");
    }

  });
  //Pin sidebar
  $("#pin-sidebar").click(function () {
    if ($(".page-wrapper").hasClass("pinned")) {
      // unpin sidebar when hovered
      $(".page-wrapper").removeClass("pinned");
    } else {
      $(".page-wrapper").addClass("pinned");
    }
  });
});