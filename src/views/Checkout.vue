<template>
    <div class="checkout">
        <NavBar></NavBar>
        <div class="container mt-5 pt-5">
            <div class="row">
                <div class="col-md-8">
                    <h4 class="py-4">Checkout page</h4>
                    <ul>
                        <li v-for="item in this.$store.state.cart" :key="item.id" class="media">
                            <img :src="item.productImage" width="80px" class="align-self-center mr-3" alt="">
                            <div class="media-body">
                                <h5 class="mt-0">{{item.productName}}

                                </h5>
                                <p class="mt-0">{{item.productPrice | currency}}</p>
                                <div >
                                    <p class="mt-0 col-md-6 d-inline-block">Quantity : {{item.productQuantity }}</p>
                                  <span class='btn float-right' @click="$store.commit('removeFromCart',item)"><i class="fas fa-trash"></i></span>

                                  <span class="btn" @click="addOne(item)"><i class="fas fa-plus"></i></span>
                                    <span class="btn" @click="minusOne(item)"><i class="fas fa-minus"></i></span>
                                </div>

                            </div>
                        </li>
                    </ul>

                </div>
                <div class="col-md-4">
                  <p>
                    Total Price : {{ this.$store.getters.totalPrice | currency }}
                  </p>
                  <form action="/charge" method="post" id="payment-form">
                    <div class="form-row">
                      <label for="card-element">
                        Credit or debit card
                      </label>
                      <div id="card-element">
                        <!-- A Stripe Element will be inserted here. -->
                      </div>

                      <!-- Used to display form errors. -->
                      <div id="card-errors" role="alert"></div>
                    </div>

                    <button>Submit Payment</button>
                  </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>


  export default {
    name: "Checkout",
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

    }
  };
</script>
<style>
  /**
   * The CSS shown here will not be introduced in the Quickstart guide, but shows
   * how you can use CSS to style your Element's container.
   */
  .StripeElement {
    box-sizing: border-box;

    height: 40px;

    padding: 10px 12px;

    border: 1px solid transparent;
    border-radius: 4px;
    background-color: white;

    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
  }

  .StripeElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
  }

  .StripeElement--invalid {
    border-color: #fa755a;
  }

  .StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
  }
</style>
