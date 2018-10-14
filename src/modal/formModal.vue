<template>
    <div class="form-modal">
        <div class="modallogin" :style="{width:ok==0?'0':'100vw',
                  fontSize:ok==0?'0':'50px',
                  height:ok==0?'0':'100vh'}">
          <div>
            Created ad
          </div>
        </div>
        <div class="container-form-modal" >
            <ion-icon name="close" class="close" @click="close"></ion-icon>
            <div style="width: 100%" v-if="token == true?true:false">
                <h3>
                    Create an ad
                </h3>
                <div class="field">
                    <label for="Street">Street</label>
                    <input v-model="street" :style="{background: streetRequire == 1? 'red':''}" id="Street" type="text"/>
                </div>
                <div class="field">
                    <div>
                        <label for="range">Star</label>
                        {{star}}
                    </div>
                    <input id="range" v-model="star" min="1" max="5" type="range" value="1">
                </div>
                <div class="field">
                    <label for="link">Url</label>
                    <input v-model="link" :style="{background: linkRequire == 1? 'red':''}" id="link" type="text"/>
                </div>
                <form id="uploadForm" class="field uploadPhoto" >
                    <label>
                        <input type="file" name="UploadForm[imageFile]"  id="file">
                        <span>Upload photo by ad</span>
                    </label>
                </form>
                <button @click.prevent="create" :style="{background:button == 0?'royalblue':'red'}">create</button>
            </div>
            <div class="modalIn" v-if="token != true?true:false">
                <h3>This is important!</h3>
                <p>Only registered users can create an ad!</p>
                <div>
                    <a href="#" style="margin-bottom: 10px" @click.prevent="to('login')">Sign in</a>
                    <a href="#" @click.prevent="to('regisration')">Registration</a>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .close {
        position: absolute;
        right: 1em;
        top: 1em;
        cursor: pointer;
    }

    .close:hover {
        color: darkred;
    }
    .modalIn{
        position:relative;
        width:100%;
        text-align:center;

    }
    .modalIn div{
        display: flex;flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .modalIn a {
        width: 100%;
        padding: 10px;
        font-size: 15px;
        background: darkmagenta;
        color: white;
        border-radius: 10px;
        text-decoration: none;
        text-align: center;
        transition: all 1s;
    }

    .modalIn a:hover {
        background: slateblue;
    }
</style>
<script>
  import axios from 'axios'
  export default {
      name: 'app',
      data () {
          return {
              street: '',
              star:1,
              link:'',
              streetRequire:0,
              linkRequire:0,
              button: 0,
              ok:0,
              objNumber:data.objNumber,
              token: null,
          }
      },
      created(){
          this.token = sessionStorage.getItem('token') != null ? true : false
      },
      methods:{
          valids: function (valid, name, textEror) {
              if (valid) {
                  name == 'street'?this.streetRequire = 1 : this.linkRequire = 1
              }
          },
          create(){
              this.valids(!this.street, 'street', "Street required");
              this.valids(!this.link, 'link', "Link required");
              if(this.streetRequire > 0 || this.linkRequire > 0){

              } else {
                  let star = this.replaceStreetInNumber(this.star)
                  const instance = axios.create({
                      baseURL: 'http://ec2-54-88-87-181.compute-1.amazonaws.com:8889',
                      headers:{
                        Authorization:sessionStorage.getItem('token'),
                        "X-Token-Auth":sessionStorage.getItem('token')
                      }
                  });
                  instance.post('posts',
                  {
                      street: this.street,
                      star:star,
                      photo:this.link,
                      token:sessionStorage.getItem('token')
                  })
                  .then(response => {
                      let it = this
                      it.ok = 1
                      setTimeout(function () {
                          it.ok = 0
                          it.close()
                          it.$emit('reloadPosts',true)
                      },2000)
                  })
                  .catch(response => {
                      console.log(response.response)
                      this.button = 1
                  })
              }
              let it = this
              setTimeout(function () {
                  it.streetRequire = 0;
                  it.linkRequire = 0;
                  it.button = 0;
              },2000)

          },
          replaceStreetInNumber(value){
              for(let i = 0;i < this.objNumber.length;i++){
                  if(this.objNumber[i].number == value){
                      return this.objNumber[i].name
                  }
              }
          },
          close(){
              let overlow =  document.querySelector('html')
              overlow.style.overflowY = 'scroll';
              this.$emit('reverseModalClose', false)
          }
      },
  }
</script>

