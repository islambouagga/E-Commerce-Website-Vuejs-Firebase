<template>
  <div class="Login">
    <!-- Modal -->
    <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="loginLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item" role="presentation">
                <a class="nav-link active" id="pills-Login-tab" data-toggle="pill" href="#pills-Login" role="tab" aria-controls="pills-Login" aria-selected="true">LogIn</a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">SingUp</a>
              </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
              <div class="tab-pane fade show active" id="pills-Login" role="tabpanel" aria-labelledby="pills-Login-tab">
                <form>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" v-model="password" class="form-control" id="exampleInputPassword1">
                  </div>
                  <button type="button" class="btn btn-primary" @click="login">Log in </button>
                </form>
              </div>
              <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                <form>
                  <div class="form-group">
                    <label for="name">Your name</label>
                    <input type="text" v-model="name" class="form-control" id="name" aria-describedby="emailHelp">
                  </div>
                  <div class="form-group">
                    <label for="Email1">Email address</label>
                    <input type="email" v-model="email" class="form-control" id="Email1" aria-describedby="emailHelp">
                  </div>
                  <div class="form-group">
                    <label for="Password1">Password</label>
                    <input type="password" v-model="password" class="form-control" id="Password1">
                  </div>
                  <button type="button"  class="btn btn-primary" @click="register">Sing up</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {fb,db} from '../firebase';
  import jQuery from "jquery";
export default {
  name: "Login",
  props: {
    msg: String
  },
  data(){
    return{
        name :null,
        email:null,
        password:null,
    }
  },
  methods:{
    register(){
      // console.log('jdhdh');
      fb.auth().createUserWithEmailAndPassword(this.email, this.password)
              .then( (user) => {
                jQuery('#login').modal('hide')
                // Add a new document in collection "cities"
                db.collection("profiles").doc(user.user.uid).set({
                  name : this.name,
                  phone:null,
                  address:null,
                  postcode:null
                })
                        .then(function() {
                          console.log("Document successfully written!");
                        })
                        .catch(function(error) {
                          console.error("Error writing document: ", error);
                        });

                this.$router.replace('admin')
              })
              .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                  alert('The password is too weak.');
                } else {
                  alert(errorMessage);
                }
                console.log(error);
              });
    },
    login(){
      fb.auth().signInWithEmailAndPassword(this.email, this.password)
              .then((user) =>{
                jQuery('#login').modal('hide')
                this.$router.replace('admin')
                console.log(user)
               })
              .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                  alert('Wrong password.');
                } else {
                  alert(errorMessage);
                }
                console.log(error);
              });

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
