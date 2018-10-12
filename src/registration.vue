<template>
    <div class="Login">
        <div class="containerform">
            <div class="form">
                <form class="login-form">
                    <h3>Registration</h3>
                    <input type="text" v-model="name" placeholder="Логин"
                           :style="{border:nameRequire==0?'1px solid white':'1px solid red'}"/><br>
                    <input type="email" v-model="email" placeholder="Email"
                           :style="{border:emailRequire==0?'1px solid white':'1px solid red'}"/><br>
                    <input type="password" v-model="password"
                           :style="{border:passwordRequire==0?'1px solid white':'1px solid red'}" placeholder="Password"/>
                    <button @click.prevent="create" :style="{background:button == 0?'royalblue':'red'}">create</button>
                    <p class="message">
                        You have account?
                        <a href="#" @click.prevent="login">
                          Log in
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
        <div class="modallogin" :style="{width:created==0?'0':'100vw',
            fontSize:created==0?'0':'50px',
            height:created==0?'0':'100vh'}">
            <div>
                Created
            </div>
        </div>
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
      data() {
          return {
              count: 0,
              name: '',
              password: '',
              email: '',
              error: [],
              allEroors: 0,
              nameRequire: 0,
              passwordRequire: 0,
              invalidButton: 0,
              emailRequire: 0,
              created:0,
              button:0
          }
      },
      created(){
          if(sessionStorage.getItem('token') != null){
              this.$router.push({name:'catalogs'});
          }
      },
      methods: {
          login: function () {
              this.$router.push({name: 'login'});
          },
          valids: function (valid, name, textEror) {
              if (valid) {
                  this.error.push(textEror)
                  name == 'login' ? this.nameRequire = 1 : name == 'password'?this.passwordRequire = 1 : this.emailRequire = 1
              }
          },
          create: function () {
              this.error = []
              this.valids(!this.name, 'login', "Login required");
              this.valids(!this.password, 'password', "Password required");
              this.valids(!this.email, 'email', "Email required");

              if (this.error.length > 0) {
                  this.allEroors = 1;
              } else {
                  const instance = axios.create({
                      baseURL: 'http://ec2-54-88-87-181.compute-1.amazonaws.com:8889',
                  });

                  instance.post('register',
                      {
                          username: this.name,
                          email: this.email,
                          password: this.password
                      })
                      .then(response => {
                          if(response.status == 200){
                              let email = response.data.email
                              if(email != null && Array.isArray(email)){
                                  for(let i = 0; i < email.length;i++){
                                      this.error.push(email[i])
                                      this.allEroors = 1;
                                      this.emailRequire = 1;
                                      this.button = 1;
                                  }
                              }
                              else{
                                  this.created = 1
                                  let it = this;
                                  setTimeout(function () {
                                      it.created = 0
                                      it.$router.push({name:'login'})
                                  }, 2000)
                              }
                          }else{
                            console.log(response.status)
                          }
                      })
                      .catch(response => {
                          console.log(response.response.data)
                      })
              }
              let it = this;
              setTimeout(function () {
                  it.allEroors = 0;
                  it.nameRequire = 0;
                  it.passwordRequire = 0;
                  it.invalidButton = 0;
                  it.emailRequire = 0;
                  it.button = 0;
              }, 2000)
          },
      }
  }
</script>
