import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let cart = window.localStorage.getItem('cart');
export default new Vuex.Store({
    state: {
        cart: cart ? JSON.parse(cart) : [],

    },
    getters: {
        totalPrice: state => {
            let total = 0;
            state.cart.filter((item) => {
                total += (item.productPrice * item.productQuantity);
            });

            return total;
        }
    },
    mutations:{
        addToCart(state,item){

            var a =  state.cart.indexOf(item)
            console.log(a);
            if (a == -1){
                state.cart.push(item);
            }else {
                item.productQuantity++;
            }
            this.commit('saveData');

        },
        addOne(state,item){
            var a =  state.cart.indexOf(item)
            console.log(a);
            if (a == -1){
                state.cart.push(item);
            }else {
                item.productQuantity++;
            }
            this.commit('saveData');
        },
        minusOne(state,item){
            var a =  state.cart.indexOf(item)
            console.log(a);
            if (a == -1){
                state.cart.push(item);
            }else {
                item.productQuantity--;
            }
            this.commit('saveData');
        },
        saveData(state){
            window.localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeFromCart(state,item){
            let index = state.cart.indexOf(item);
            item.productQuantity = 1;
            state.cart.splice(index,1);

            this.commit('saveData');

        }

    }
})