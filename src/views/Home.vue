<template>
  <div class="home">
    <NavBar></NavBar>
    <Hero></Hero>
    <productslist></productslist>
    <div class="container h-100">
      <div class="row p-5 h-100 justify-content-center align-items-center">
        <div class="col-md-6">
          <img src="/img/svg/fotter.svg" alt="" width="400">
        </div>
        <div class="col-md-6">
          <h3>Learn More About us</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quaerat voluptate iusto? Nihil voluptas vitae veritatis magnam reprehenderit, reiciendis ex? Libero quasi natus veniam voluptatum, voluptas exercitationem ratione consectetur et!
          </p>
          <button class="btn custom-btn btn-outline-success mr-4">Browse Products</button>
        </div>
      </div>
    </div>

    <login></login>

    <mini-cart></mini-cart>
  </div>
</template>

<script>
  import NavBar from "../components/NavBar";
  import Login from "../components/Login";
  import Hero from "../components/Hero";
  import productslist from  "../sections/productList"
  // import Products from "../sections/products";
// @ is an alias to /src

export default {
  name: "Home",
  components: {
    NavBar,Hero,Login,productslist
  }
};
</script>
