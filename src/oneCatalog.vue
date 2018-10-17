<template>
  <div id="containerAllByOne">
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
      <section class="containerAllByOne">
          <div class="containerBy">
              <template>
                  <div>
                      <v-breadcrumbs>
                          <v-icon slot="divider">forward</v-icon>
                          <v-breadcrumbs-item v-for="item in path" style="cursor: pointer"
                                              :disabled="item.disabled" :key="item.text">
                          {{ item.text }}
                          </v-breadcrumbs-item>
                      </v-breadcrumbs>
                  </div>
              </template>
              <!--<div class="back">-->
                <!--<a href="#" @click.prevent="back">{{path[0]}}</a>-->
                <!--<span>/ {{path[1]}}</span>-->
              <!--</div>-->
              <!--<div class="containerCatalogId">-->
                  <!--<div class="zacaz">-->
                      <!--<div>-->
                          <!--<div v-if="street == ''||street == null?false:true"><span style="font-weight: bold">Street</span> {{ street}}</div>-->
                        <!--<div>-->
                          <!--<ion-icon v-for="(star,index) in replaceStreetInNumber(star)" :key="index" name="star"></ion-icon>-->
                          <!--<ion-icon v-for="(star,index) in replaceStreetInNumber(star, 5 , '-')" :key="index" name="star-outline"></ion-icon>-->
                        <!--</div>-->
                          <!--&lt;!&ndash;<div>&ndash;&gt;-->
                             <!--&lt;!&ndash;<ion-icon name="contacts"></ion-icon>{{reviews}}&ndash;&gt;-->
                          <!--&lt;!&ndash;</div>&ndash;&gt;-->
                      <!--</div>-->
                      <!--<a class="buttonTo" @click.prevent="toNumber" href="#">Choose a number</a>-->
                  <!--</div>-->
                  <!--<div class="contsainerPhotoId">-->
                      <!--<img class="idphoto" :src="ShowPhoto(photo)">-->
                      <!--<div class="rules">-->
                          <!--<p>Types of lease agreements There are three main types of-->
                              <!--lease agreements, and they are divided according to which services are-->
                              <!--included in the rental price:-->
                          <!--</p>-->
                          <!--<p>Types of lease agreements There are three main types of-->
                              <!--lease agreements, and they are divided according to which services are-->
                              <!--included in the rental price:-->
                          <!--</p><p>Types of lease agreements There are three main types of-->
                              <!--lease agreements, and they are divided according to which services are-->
                              <!--included in the rental price:-->
                          <!--</p>-->
                      <!--</div>-->
                  <!--</div>-->
                  <!--&lt;!&ndash;<calendar @object="change($event)" :reverse="reverseData"></calendar>&ndash;&gt;-->
              <!--</div>-->
              <v-layout style="width: 100%">
                  <v-flex>
                      <v-card>
                          <v-img
                              :src="ShowPhoto(photo)"
                              aspect-ratio="2.75"
                          ></v-img>

                          <v-card-title primary-title>
                              <div>
                                  <h3 class="headline mb-0">{{street}}</h3>
                                  <div>
                                      <ion-icon style="color:#448aff"
                                                v-for="(star,index) in replaceStreetInNumber(star)"
                                                :key="index + 'a'" name="star">
                                      </ion-icon>
                                      <ion-icon
                                        v-for="(star,index) in replaceStreetInNumber(star, 5 , '-')"
                                        :key="index  + 'b'" name="star-outline">
                                      </ion-icon>
                                  </div>
                              </div>
                          </v-card-title>

                          <v-card-actions>
                              <calendar @object="change($event)" :reverse="reverseData"></calendar>
                          </v-card-actions>
                      </v-card>
                  </v-flex>
              </v-layout>
          </div>
      </section>
      <myFoot></myFoot>
  </div>
</template>

<script>
  import  footer from './work/footer.vue'
  import  header from './work/header.vue'
  import  calendar from './calendar.vue'
  import modal from './modal/modalYesOrNo.vue'
  export default {
      name: 'app',
      data () {
          return {
              photo: null,
              street: null,
              star: 'five',
              reviews: null,
              container:false,
              toValue:false,
              text:null,
              reverseData:null,
              h1:null,
              position:[],
              path:[],
              objNumber:data.objNumber,
              newToken:null
          }
      },
      created(){
          let link = this.$router.history.current.fullPath.split('/')
          for(let i = 0;i<link.length;i++){
              if(i == link.length){
                  let obj = {
                      text:link[i],
                      disabled:true
                  }
                  this.path.push(obj)
              }else{
                  if(link[i]==""){
                      let obj = {
                          text:'Home',
                          disabled:false
                      }
                      this.path.push(obj)
                  } else {
                      let obj = {
                          text:link[i],
                          disabled:false
                      }
                      this.path.push(obj)
                  }
              }
          }
          console.log(this.path)
          this.photo = sessionStorage.getItem('photo');
          this.street = sessionStorage.getItem('street');
          this.star = sessionStorage.getItem('star');
          this.reviews = sessionStorage.getItem('reviews');
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
            console.log(value)
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
          replaceStreetInNumber(value,number,simvol){
              if(value == null){
                return 0
              }
              for(let i = 0;i < this.objNumber.length;i++){
                  if(this.objNumber[i].name == value){
                      if(simvol == '-'){
                        return number - this.objNumber[i].number
                      }
                      return this.objNumber[i].number
                  }
              }
          },
          ShowPhoto(value){
              let arr = value.split('.')
              if(arr.length == 5){
                return value
              } else {
                return 'http://japanalytic.com/wp-content/uploads/2017/10/No-Underlined.jpg'
              }
          }
      },
      components:{
          myFoot:footer,
          myHead:header,
          calendar:calendar,
          modal:modal,
      },
  }
</script>

<style lang="scss">
  .containerAllByOne{
      width: 100vw;
      display: flex;
      justify-content: center;
      background: white;
      padding-top: 80px;
      min-height: calc(100vh - 209px);
  }
  .containerBy{
       margin: 20px 0;
      width: 1200px;
      display: flex; flex-direction: column;
      box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
  }
  .back{
      width: 200px;
      padding: 10px;
      background: slateblue;
      border-radius: 10px;
      color:white
  }
  .back{
      a{
          text-transform: capitalize;
          color: white;
          font-weight: bold;
      }
      a:hover{
          color: lightgray;
      }
  }
  .containerCatalogId{
      width: 100%;
      padding: 20px;
      background: white;
      margin: 20px 0;
  }
  .rules{
      width: 50%;
      margin-right: 10px;
  }
  .rules p{
      padding: 10px;
  }
  .contsainerPhotoId{
      display: flex;justify-content: space-between;padding: 0 20px;width: 100%
  }
  .idphoto{
      width:50%;
      height: 300px;
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
      /*.buttonTo{*/
          /*width: 60px;*/
          /*padding: 10px;*/
      /*}*/
  }
  @media screen and (max-width: 720px){
      .contsainerPhotoId{
          flex-direction: column;
          padding:0;
      }
      .rules{
          width: 100%
      }
      .idphoto{
          width:100%;
      }
      .containerAll{
          margin: 0;
      }
  }
  @media screen and (max-width: 420px){
      .idphoto{
          height:200px;
      }
      .back {
          width: 100%;
          border-radius: 0;
          box-shadow: none;
      }
    .containerBy{
      margin-top: 0px;
    }
    .containerCatalogId{
      margin: 0;
    }
  }@media screen and (max-width:320px){
      .idphoto{
          height:150px;
      }
  }
</style>
