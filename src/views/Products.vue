<template>
    <div class="products">
        <div class="container h-100">
            <div class="intro h-100">
                <div class="row h-100 justify-content-center align-items-center">
                    <div class="col-md-6">
                        <h1>Products page</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqu a.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui o fficia deserunt* mollit
                            anim id est laborum.
                        </p>
                    </div>
                    <div class="col-md-6">
                        <img src="../../public/img/svg/product.svg" width="800" height="600">
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="product-test">

            <h3 class="d-inline-block">Product list </h3>
            <button @click="addNew" class="btn btn-info float-right">Add product</button>
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
                        <td>{{product.name}}</td>
                        <td>{{product.price}}</td>
                        <td>
                            <button class="btn btn-primary" style="border-color: green;background-color: green"
                                    @click="editProduct(product)"> edit
                            </button>
                            <button class="btn btn-danger" @click="deleteProduct(product)">delete</button>
                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>
        </div>        <!-- Modal -->
        <div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="productLabel"
             aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="productLabel" v-if="modal == 'new'">Add Product</h5>
                        <h5 class="modal-title" id="productLabel" v-if="modal == 'edit'">Edit Product</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="form-group">
                                    <label>Product Name</label>
                                    <input type="text" v-model="product.name" class="form-control"
                                           aria-describedby="emailHelp">
                                </div>
                                <div class="form-group">
                                    <label>Product Description</label>
                                    <vue-editor id="editor" v-model="product.description"></vue-editor>

                                </div>
                            </div>
                            <div class="col-md-4">

                                <h4 class="display-6">Product Details</h4>
                                <hr>
                                <div class="form-group">
                                    <label>Product price</label>
                                    <input type="number" v-model="product.price" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label> <strong>Product Tag </strong> </label>
                                    <p style="font-size:70%;"> wirte "<strong>,</strong>" after tag </p>

                                    <input type="test" @keyup.188="addTag" v-model="tag" class="form-control">
                                    <div class="d-flex">
                                        <p v-for="tag in product.tags" v-bind:key="tag.id">
                                            <span class="p-1">{{tag}}</span>
                                        </p>

                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Product Image</label>
                                    <input type="file" @change="uploadImage" class="form-control">
                                </div>
                                <div class="form-group d-flex">
                                    <div class="p-1" v-for="(image, index) in product.images" v-bind:key="image.id">
                                        <div class="img-wrapp">
                                            <img :src="image"  alt="" width="80px">
                                            <span class="delete-img" @click="deleteImage(image,index)"><i class="fas fa-backspace"></i></span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button @click="addProduct()" type="button" class="btn btn-primary" v-if="modal == 'new'">Add
                            Product
                        </button>
                        <button @click="updateProduct(product)" type="button" class="btn btn-primary"
                                v-if="modal == 'edit'">Apply changes
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {VueEditor} from "vue2-editor";
    import {fb, db} from '../firebase';
    import jQuery from "jquery";

    export default {
        name: "Products",
        props: {
            msg: String
        },
        components: {
            VueEditor
        },
        data() {
            return {
                products: [],
                product: {
                    name: null,
                    description: null,
                    price: null,
                    tags: [],
                    images: []
                },
                activeItem: null,
                key: null,
                modal: null,
                tag: null

            }
        },
        firestore() {
            return {
                products: db.collection('products'),
            }
        },
        methods: {

            addNew() {
                this.modal = 'new'
                this.reset();
                jQuery('#product').modal('show')

            },

            readData() {

            },
            editProduct(product) {
                this.modal = 'edit';
                this.product = product;
                jQuery('#product').modal('show')

            },
            addProduct() {
                this.$firestore.products.add(this.product);
                jQuery('#product').modal('hide')

            },
            uploadImage(e) {

                if (e.target.files[0]){
                    let file = e.target.files[0]

                    var storageRef = fb.storage().ref('products/'+ Math.random() + '_'  + file.name);
                    let uploadTask = storageRef.put(file);

                    uploadTask.on('state_changed', function () {

                    },  ()=> {
                        // Handle unsuccessful uploads
                    },  () =>{
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        uploadTask.snapshot.ref.getDownloadURL().then( (downloadURL) =>{
                            this.product.images.push(downloadURL)
                            console.log('File available at', downloadURL);
                        });
                    });

                }
                 },
            deleteImage(img,index){

                let image = fb.storage().refFromURL(img);

                this.product.images.splice(index,1);

                image.delete().then(function() {
                    console.log('image deleted');
                }).catch(function(error) {
                    // Uh-oh, an error occurred!
                    console.log(error)
                    console.log('an error occurred');
                });

            },

            updateProduct(product) {
                this.key = this.product['.key'];

                // this.$firestore.products.doc(this.product['.key']).update(this.product);

                this.$firestore.products.doc(product['.key']).update({
                    name: product['name'],
                    description: product['description'],
                    price: product['price'],
                    tags: product['tags'],


                })


                // this.$firestore.products.doc(this.product.id).update(this.product);
                this.$swal.fire(
                    'Updated!',
                    'Your product has been updated.',
                    'success'
                )
                jQuery('#product').modal('hide')

            },
            deleteProduct(product) {
                // this.$swal('Hello Vue world!!!');
                this.$swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        this.$firestore.products.doc(product['.key']).delete()
                        this.$swal.fire(
                            'Deleted!',
                            'Your product has been deleted.',
                            'success'
                        )


                    }
                })
            },
            addTag() {
                this.product.tags.push(this.tag);
                this.tag = "";
            },
            reset(){
                this.product = {
                    name:null,
                    description:null,
                    price:null,
                    tags:[],
                    images:[]
                }
            },


        },
        created() {

        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this  component only -->
<style scoped lang="scss">

    .img-wrapp{
        position: relative;
    }
    .img-wrapp span.delete-img{
        position: absolute;
        top: -14px;
        left: -2px;
    }
    .img-wrapp span.delete-img:hover{
        cursor: pointer;
    }

</style>