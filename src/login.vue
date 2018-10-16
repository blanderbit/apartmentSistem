<template>
    <div class="Login">
        <div class="containerform">
            <div class="form">
                <form class="login-form">
                    <h3>Autorization</h3>
                    <!--<input type="text" v-model="name" placeholder="Логин"-->
                           <!--:style="{border:nameRequire==0?'1px solid white':'1px solid red'}"/><br>-->
                    <input type="email" v-model="email" placeholder="Email"
                           :style="{border:emailRequire==0?'1px solid white':'1px solid red'}"/><br>
                    <input type="password" v-model="password"
                         :style="{border:passwordRequire==0?'1px solid white':'1px solid red'}" placeholder="Password"/>
                    <button @click.prevent="signIn" :style="{background:button == 0?'royalblue':'red'}">
                          <span v-if="loading == true?false:true">Login</span>
                          <div class="spinnerLoginRagistration" v-else="loading == true?true:false"></div>
                    </button>
                    <p class="message" @click.prevent="Registration">
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
        <div class="modallogin" :style="{width:ok==0?'0':'100vw',
            fontSize:ok==0?'0':'50px',
            height:ok==0?'0':'100vh'}">
            <div>
                You are longed in
            </div>
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
              ok:0,
              emailRequire:0,
              button:0,
              loading:false
          }
      },
      created(){
          if(sessionStorage.getItem('token') != null){
              this.$router.push({name:'catalogs'});
          }
      },
      methods:{
          Registration:function(){
             this.$router.push({name:'registration'});
          },
          valids: function (valid, name, textEror) {
              if (valid) {
                  this.error.push(textEror)
                  name == 'password'?this.passwordRequire = 1 : this.emailRequire = 1
              }
          },
          signIn: function () {
          this.error = []
          this.valids(!this.password, 'password', "Password required");
          this.valids(!this.email, 'email', "Email required");
              if (this.error.length> 0){
                 this.allEroors = 1;
              } else {
                  this.loading = true
                  const instance = axios.create({
                    baseURL: 'http://ec2-54-88-87-181.compute-1.amazonaws.com:8889',
                  });

                  instance.post('login',
                      {
                          email: this.email,
                          password: this.password
                      })
                      .then(response => {
                          this.loading = false
                          sessionStorage.setItem('token',response.data.token)
                          this.ok = 1;
                          let it = this;
                          setTimeout(function () {
                             it.$router.push({name:'catalogs'})
                          },2000)
                      })
                      .catch(response => {
                        this.loading = false
                      let email = response.response.data.email
                      if(email != null && Array.isArray(email)){
                          for(let i = 0; i < email.length;i++){
                              this.error.push(email[i])
                              this.allEroors = 1;
                              this.emailRequire = 1;
                              this.button = 1;
                          }
                      }
                      if (response.response.data.error != undefined){
                          this.error.push(response.response.data.error)
                          this.allEroors = 1;
                          this.button = 1;
                      }
                      this.button = 1;
                  })
              }
              let it = this;
              setTimeout(function () {
                  it.allEroors = 0;
                  it.nameRequire = 0;
                  it.passwordRequire = 0;
                  it.emailRequire = 0;
                  it.button = 0;
              },2000)
          },
      }
  }
</script>


