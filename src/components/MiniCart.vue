<template>
  <div class="minicart">
    <!-- Modal -->
    <div class="modal fade" id="miniCart" tabindex="-1" role="dialog" aria-labelledby="miniCartLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="miniCartLabel">My Bag</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ul>
              <li v-for="item in this.$store.state.cart" :key="item.id" class="media">
                <img :src="item.productImage" width="80px" class="align-self-center mr-3" alt="">
                <div class="media-body">
                  <h5 class="mt-0">{{item.productName}}
                    <span class='float-right' @click="$store.commit('removeFromCart',item)"><i class="fas fa-trash"></i></span>
                  </h5>
                  <p class="mt-0">{{item.productPrice | currency}}</p>
                  <div>
                  <p class="mt-0 col-md-6 d-inline-block">Quantity : {{item.productQuantity }}</p>
                    <a class="col-md-3 btn " @click="addOne(item)"><i class="fas fa-plus"></i></a>
                    <a class="col-md-3 btn" @click="minusOne(item)" ><i class="fas fa-minus"></i></a>
                  </div>

                </div>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <label  data-dismiss="modal">Continue Shopping </label>
            <button type="button" class="btn btn-info" @click="checkout">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jQuery from "jquery";

export default {
  name: "MiniCart",
  props: {
    msg: String
  },
  data() {
    return {
      item: {
        productName: null,
        productImage: null,
        productPrice: null,
        productId: null,
        productQuantity: null,
      }

    }
  },
  methods:{
    addOne(item){
      this.item = item
      this.$store.commit("addOne",this.item)
    },
    minusOne(item){
      this.item = item
      this.$store.commit("minusOne",this.item)
    },
    checkout(){
      jQuery('#miniCart').modal('hide')
      this.$router.push('/checkout')

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
