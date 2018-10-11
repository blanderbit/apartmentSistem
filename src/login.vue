<template>
    <div class="Login">
        <div class="containerform">
            <div class="form">
                <form class="login-form">
                    <h3>Autorization</h3>
                    <input type="text" v-model="name" placeholder="Логин"
                           :style="{border:nameRequire==0?'1px solid white':'1px solid red'}"/><br>
                    <input type="email" v-model="email" placeholder="Email"
                           :style="{border:emailRequire==0?'1px solid white':'1px solid red'}"/><br>
                    <input type="password" v-model="password"
                         :style="{border:passwordRequire==0?'1px solid white':'1px solid red'}" placeholder="Password"/>
                    <button @click.prevent="signIn">Login</button>
                    <p class="message">
                        Not registred?
                        <a href="#">
                          Create account
                        </a>
                    </p>
                </form>
            </div>
        </div>
        <div class="allErrors" :style="{opacity:allEroors==0?'0':'1'}">
            <ul>
                <li v-for="one in error">
                  {{one}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
  import axios from 'axios'
  export default {
      data() {
          return {
              count:0,
              name: '',
              password:'',
              error:[],
              allEroors:0,
              nameRequire:0,
              passwordRequire:0,
              invalidButton:0,
              emailRequire:0
          }
      },
      methods:{
          toRegistration:function(){
             this.$router.push({name:'registration'});
          },
          valids:function(valid,name,textEror){
              if (valid) {
                  this.count++;
                  this.error.push(textEror)
                  name == 'login'?this.nameRequire = 1:this.passwordRequire = 1;
              } else {
                  name == 'login'?this.error1 = '':this.error2 = '';
                  this.count = 0;
              }
          },
          valids: function (valid, name, textEror) {
              if (valid) {
                  this.error.push(textEror)
                  name == 'login' ? this.nameRequire = 1 : name == 'password'?this.passwordRequire = 1 : this.emailRequire = 1
              }
          },
          signIn: function () {
          this.error = []
          this.valids(!this.name, 'login', "Login required");
          this.valids(!this.password, 'password', "Password required");
          this.valids(!this.email, 'email', "Email required");
              if (this.error.length> 0){
                 this.allEroors = 1;
              } else {
                  const instance = axios.create({
                    baseURL: 'http://ec2-54-88-87-181.compute-1.amazonaws.com:8889',
                  });

                  instance.post('login',
                      {
                          email: this.email,
                          password: this.password
                      })
                      .then(response => {
                          console.log(response.data.token)
                          sessionStorage.setItem('token',response.data.token)
                        this.$router.push({name:'catalogs'})
                      })
                      .catch(response => {
console.log(response.response.data.error)
                        this.error.push(response.response.data.error)
                          this.errored = true;
                      })
              }
              let it = this;
              setTimeout(function () {
                  it.allEroors = 0;
                  it.nameRequire = 0;
                  it.passwordRequire = 0;
                  it.invalidButton = 0;
                  it.emailRequire = 0;
              },2000)
          },
      }
  }
</script>
<style>
  .Login{
    position: absolute;
    background:lightpink;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }


  .containerform {
    width: 360px;
    margin: auto;
  }
  .form {
    position: relative;
    z-index: 1;
    background: #FFFFFF;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  }
  .form input {
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
    transition: all 1s;
    border: 1px solid white;
  }
  .form button {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    outline: 0;
    background: royalblue;
    width: 100%;
    border: 0;
    margin-top: 20px;
    padding: 15px;
    color: #FFFFFF;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 1s;
    cursor: pointer;
  }
  .form button:hover,.form button:active,.form button:focus {
    background: rgb(0, 177, 217)!important;
  }
  .form .message {
    margin: 15px 0 0;
    color: #b3b3b3;
    font-size: 12px;
  }
  .form .message a {
    color: rebeccapurple;
    text-decoration: none;
  }

  .allErrors{
    position: absolute;
    opacity: 0;
    background: red;
    border: 1px solid red;

    padding: 5px;
    color: white;
    right: 5px;
    top: 5px;
    z-index: 10;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    word-wrap: break-word;
    transition: all 1s;
  }
  .allErrors ul {
    padding: 0;
    margin: 0;
  }
  .allErrors ul li{
    padding: 5px;
    list-style: none;
  }
</style>

