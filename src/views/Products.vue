<template>
    <div class="products">
        <div class="container h-100">
            <div class="intro h-100">
                <div class="row h-100 justify-content-center align-items-center">
                    <div class="col-md-6">
                        <h1>Products page</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqu
                            a. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                            occaecat cupidatat non proident, sunt in culpa qui o
                            fficia deserunt* mollit anim id est laborum.
                        </p>
                    </div>
                    <div class="col-md-6">
                        <img src="../../public/img/svg/product.svg" width="800" height="600">
                    </div>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label for="name">prod name</label>
            <input type="text" v-model="product.name" class="form-control" id="name" aria-describedby="emailHelp">
        </div>
        <div class="form-group">
            <label for="Password1">prod price</label>
            <input type="test" v-model="product.price" class="form-control" id="Password1">
        </div>
        <button class="btn btn-primary" @click="saveData">Sing up</button>

        <h3>product list </h3>
        <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th>name</th>
                    <th>price</th>
                    <th>edit</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="product in products" v-bind:key="product.id">
                    <td>{{product.data().name}}</td>
                    <td>{{product.data().price}}</td>
                    <td>
                        <button class="btn btn-primary" style="background-color: green;border-color: green"
                                @click="editProduct(product)"> edit
                        </button>
                        <button class="btn btn-danger" @click="deleteProduct(product.id)"> delete</button>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>
        <!-- Modal -->
        <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editLabel">edit Product</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="name">prod name</label>
                            <input type="text" v-model="product.name" class="form-control" aria-describedby="emailHelp">
                        </div>
                        <div class="form-group">
                            <label for="Password1">prod price</label>
                            <input type="test" v-model="product.price" class="form-control">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button @click="updateProduct()" type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {db} from '../firebase';
    import jQuery from "jquery";

    export default {
        name: "Products",
        props: {
            msg: String
        },
        data() {
            return {
                products: [],
                product: {
                    name: null,
                    price: null,
                },
              activeItem : null,
            }
        },
        methods: {

            readData() {
                db.collection("products").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // console.log('test');
                        // doc.data() is never undefined for query doc snapshots
                        // console.log(doc.id, " => ", doc.data());
                        this.products.push(doc);
                    });
                });
            },
            editProduct(product) {
                jQuery('#edit').modal('show')
                this.product = product.data();
                this.activeItem = product.id;
                this.listener();
                // console.log(this.activeItem);
            },
            saveData() {
                db.collection("products").add(this.product)
                    .then((docRef) => {
                        console.log("Document written with ID: ", docRef.id);
                        this.readData();
                        this.listener()
                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    });
            },
            updateProduct() {
              // var washingtonRef =
                      db.collection("products").doc(this.activeItem).update(this.product)
                      .then(() => {
                        console.log("Document successfully updated!");
                        this.listener();
                        jQuery('#edit').modal('hide')

                      })
                      .catch(function(error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                      });
            },
            deleteProduct(doc) {
                if (confirm('are yoy sure ?')) {
                    db.collection("products").doc(doc).delete().then(function () {
                        console.log("Document successfully deleted!");
                        this.listener();
                    }).catch(function (error) {
                        console.error("Error removing document: ", error);
                    });
                }
            },
            listener(){
              db.collection("products")
                      .onSnapshot((querySnapshot) => {
                         this.products = [];
                        querySnapshot.forEach((doc) => {
                          this.products.push(doc);
                        });
                      });
            },
             reset() {
            // Object.assign(this.$data, this.$options.data.apply(this))
          },
        },
        created() {
            this.readData();
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>
