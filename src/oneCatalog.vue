<template>
  <div id="app">
      <modal :value="toValue"
             :activeContainer="container"
             :remove="position"
             @reversData="changeReverse($event)"
             @reverseContainer="reverseContainer($event)"
              :newTok="newToken">
          <h3 slot="h1">{{h1}}</h3>
          <p slot="information">{{toValue}}</p>
          <span slot="a">{{position[0]}}</span>
      </modal>
      <myHead @tokenHeader="changeToken($event)"></myHead>
      <navbar></navbar>
      <section>
          <div class="containerAll containerAllByOne">
              <div class="back">
                <a href="#" @click.prevent="back">{{path[0]}}</a>
                <span>/ {{path[1]}}</span>
              </div>
              <div class="containerCatalogId">
                  <div class="zacaz">
                      <div>
                          <div v-if="street == ''||street == null?false:true"><span style="font-weight: bold">Street</span> {{ street}}</div>
                          <div>
                              <ion-icon v-for="star in replaceStreetInNumber(star)" name="star"></ion-icon>
                              <ion-icon v-for="star in 5 - replaceStreetInNumber(star)" name="star-outline"></ion-icon>
                          </div>
                          <div>
                             <ion-icon name="contacts"></ion-icon>{{reviews}}
                          </div>
                      </div>
                      <a class="buttonTo" @click.prevent="toNumber" href="#">Choose a number</a>
                  </div>
                  <img class="idphoto" :src="photo">
                  <calendar @object="change($event)" :reverse="reverseData"></calendar>
              </div>
          </div>
      </section>
      <myFoot></myFoot>
  </div>
</template>

<script>
  import  footer from './work/footer.vue'
  import  header from './work/header.vue'
  import  navbar from './work/navbar.vue'
  import  calendar from './calendar.vue'
  import modal from './modalYesOrNo.vue'
  export default {
      name: 'app',
      data () {
          return {
              photo: null,
              street: null,
              star: null,
              reviews: null,
              allPhoto: null,
              inf: null,
              container:false,
              toValue:false,
              text:null,
              reverseData:null,
              h1:null,
              position:[],
              path:null,
              objNumber:data.objNumber,
              newToken:null

          }
      },
      created(){
          this.path = this.$router.history.current.fullPath.split('/').splice(1)
          this.photo = sessionStorage.getItem('photo');
          this.street = sessionStorage.getItem('street');
          this.star = sessionStorage.getItem('star');
          this.reviews = sessionStorage.getItem('reviews');
          this.allPhoto = sessionStorage.getItem('allPhoto');
          this.inf = sessionStorage.getItem('inf');
      },
      methods:{
          toNumber:function (simvol) {
              let simvols = simvol;
              let scroll = document.getElementById('calendar').getBoundingClientRect().top;
              let pix = window.pageYOffset;
              requestAnimationFrame(to);
              function to(){
                  pix = pix + 10;
                  window.scrollTo(0,pix);
                  if(pix < scroll){
                    requestAnimationFrame(to);
                  }
              }
          },
          changeReverse(value){
            this.reverseData = value
          },
          change(value){
              this.position = []
              if(value[2] == 'Add'){
                  this.position.push(value[2])
                  this.toValue = value[0]
                  this.container= value[1]
                  this.h1 = 'You confirm data?'
              } else {
                  this.toValue = value[0]
                  this.container= value[1]
                  this.h1 = 'Do you want remove order?'
                  this.position.push(value[2])
                  this.position.push(value[3])
              }
          },
          changeToken(value){
              this.newToken = value
          },
          reverseContainer(value){
            this.container= value
          },
          back(){
              this.$router.push({name:'catalogs'})
          },
          replaceStreetInNumber(value){
              for(let i = 0;i < this.objNumber.length;i++){
                  if(this.objNumber[i].name == value){
                    return this.objNumber[i].number
                  }
              }
          }
      },
      components:{
          myFoot:footer,
          myHead:header,
          navbar:navbar,
          calendar:calendar,
          modal:modal
      },
  }
</script>

<style lang="scss">
  section{
      width: 100vw;
      display: flex;
      justify-content: center;
      background: #ededed;
  }
  .containerAll{
       margin-top: 20px;
      width: 1200px;
      display: flex;

  }
  .containerAllByOne{
     flex-direction: column;
  }
  .back{
      width: 200px;
      padding: 20px;
      background: lightcoral;
      border-radius: 10px;
      box-shadow: 1px 1px 1px 1px gainsboro;
  }
  .back{
      a{
          text-transform: capitalize;
          color: rebeccapurple;
          font-weight: bold;
      }
      a:hover{
          color: slateblue;
      }
  }
  .containerCatalogId{
      width: 100%;
      padding: 20px;
      background: white;
      margin: 20px 0;
  }
  .idphoto{
      width: 100%;
      height: 500px;
      cursor: pointer;
  }
  .zacaz{
      display: flex;
      justify-content: space-between;
  }
  .buttonTo{
      width: 200px;
      padding: 10px;
      text-align: center;
      background: deeppink;
      border-radius: 10px;
      color: white;
      font-weight: bold;
      vertical-align: center;
      align-self: center;
      text-decoration: none;
  }
  .buttonTo:hover{
     background: darkmagenta;
  }
  @media screen and (max-width: 1350px){
      .containerAll{
          width: 100%;
      }
      .containerCatalogId{
          padding: 0;
      }
      .idphoto{
          height: 300px;
      }
      .zacaz{
          padding: 5px;
          font-size: 10px;
      }
      .buttonTo{
          width: 60px;
          padding: 10px;
      }
  }
</style>
