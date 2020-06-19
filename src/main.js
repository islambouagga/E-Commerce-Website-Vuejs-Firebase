import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import 'bootstrap';
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;
import 'popper.js';
import './assets/app.scss';
import {fb} from './firebase.js';


Vue.config.productionTip = false;

let app ='';

fb.auth().onAuthStateChanged((user) => {
  console.log(user)
if (!app){
  new Vue({
    router,
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