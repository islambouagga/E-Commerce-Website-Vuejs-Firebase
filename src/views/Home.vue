<template>
  <div class="home">
    <NavBar></NavBar>
    <Hero></Hero>
    <login></login>
  </div>
</template>

<script>
  import NavBar from "../components/NavBar";
  import Login from "../components/Login";
  import Hero from "../components/Hero";
// @ is an alias to /src

export default {
  name: "Home",
  components: {
    NavBar,Hero,Login
  }
};
</script>
