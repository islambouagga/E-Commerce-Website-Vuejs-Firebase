<template>
  <div class="admin">
    <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
      <nav id="sidebar" class="sidebar-wrapper">
        <div class="sidebar-content">
          <!-- sidebar-brand  -->
          <div class="sidebar-item sidebar-brand">
            <a href="#">pro sidebar</a>
            <a id="pin-sidebar" class="btn  rounded-0"  >
              <i class="fas fa-bars"></i>
            </a>

          </div>
          <!-- sidebar-header  -->
          <div class="sidebar-item sidebar-header d-flex flex-nowrap">
            <div class="user-pic">
              <img class="img-responsive img-rounded" src="img/user.jpg" alt="User picture">
            </div>
            <div class="user-info">
                        <span class="user-name">Jhon
                            <strong>Smith</strong>
                        </span>
              <span class="user-role">Administrator</span>
              <span class="user-status">
                            <i class="fa fa-circle"></i>
                            <span>Online</span>
                        </span>
            </div>
          </div>
          <!-- sidebar-search  -->
          <div class="sidebar-item sidebar-search">
            <div>
              <div class="input-group">
                <input type="text" class="form-control search-menu" placeholder="Search...">
                <div class="input-group-append">
                                <span class="input-group-text">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                </span>
                </div>
              </div>
            </div>
          </div>
          <!-- sidebar-menu  -->
          <div class=" sidebar-item sidebar-menu">
            <ul>
              <li class="header-menu">
                <span>Menu</span>
              </li>
              <li>
                <router-link to="/admin/overview">
                  <i class="fas fa-chart-line"></i>
                  <span class="menu-text">OverView</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/products">
                  <i class="fab fa-amazon"></i>
                  <span class="menu-text">Products</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/orders">
                  <i class="fa fa-shopping-cart"></i>
                  <span class="menu-text">Orders</span>
                </router-link>
              </li>
              <li>
                <a href="#" @click="logout()">
                  <i class="fa fa-power-off"></i>
                  <span class="menu-text">Logout</span>
                </a>
              </li>
            </ul>
          </div>
          <!-- sidebar-menu  -->
        </div>
        <!-- sidebar-footer  -->
      </nav>
      <!-- page-content  -->
      <main class="page-content pt-2">
        <div id="overlay" class="overlay"></div>
        <div class="container-fluid p-5">
          <div class="row">
            <div class="form-group col-md-12">
              <router-view />

            </div>

          </div>
        </div>
      </main>
      <!-- page-content" -->
    </div>
    <!-- page-wrapper -->

  </div>
</template>

<script>
import {fb} from '../firebase';
  // @ is an alias to /src

  export default {
    name: "Admin",
    components: {
    },
    methods:{
      logout(){
        fb.auth().signOut()
        .then( (user)=>{
           this.$router.replace('/');
          console.log(user);
        })
        .catch((err)=>{
          console.log(err);
        })
      }
    }
  };
</script>
