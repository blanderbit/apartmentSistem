<template>
    <section style="z-index: 0" class="main">
          <div class="SearchContainer">
             <div class="nameStreet">
                 <v-text-field
                   style="padding: 0"
                   v-model="street"
                   placeholder="street"
                   required
                 ></v-text-field>
             </div>
             <div class="star">
                 <v-rating style="align-self: center;" v-model="rating"></v-rating>
                 <md-button style="display: flex;align-items: center;justify-content: center" @click="Clean">Clean</md-button>
             </div>
          </div>
          <div class="containerAll">
               <myAside v-on:radioNumber="changesNumber($event)" @activeMiddleFormModal="changeActiveModal($event)"
                        @streetName="changesStreet($event)" :ids="star"
                        :showPAnel="showPAnel" @reverseShowNavigation="reverseShowNavigation($event)"></myAside>
               <div class="loading" v-if="loading == true?true:false">
                   <div class="spinner"></div>
               </div>
               <v-layout class="products" v-for="one in filterBy(filterBy(apartments,street),star)" :key="one">
                    <v-flex>
                        <v-card>
                            <v-img
                                    :src="showUrlPhoto(one.photo_url)"
                                    aspect-ratio="2.75"
                            ></v-img>

                            <v-card-title primary-title>
                                <div>
                                    <h3 class="headline mb-0">{{one.street}}</h3>
                                    <div>
                                        <ion-icon style="color:#448aff"
                                                v-for="(star,index) in replaceStreetInNumber(one.star)"
                                                :key="index + 'a'" name="star">
                                        </ion-icon>
                                        <ion-icon
                                                v-for="(star,index) in replaceStreetInNumber(one.star, 5 , '-')"
                                                :key="index  + 'b'" name="star-outline">
                                        </ion-icon>
                                    </div>
                                </div>
                            </v-card-title>

                            <v-card-actions>
                                <v-btn flat color="#448aff" @click.prevent="to(one.id,
                               one.photo_url,
                               one.street,
                               one.star,
                               one.reviews)">Choose a number</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
               </v-layout>
          </div>
    </section>
</template>

<script>
  import Vue from 'vue'
  import filter from 'vue2-filters'
  import {MdButton} from 'vue-material/dist/components'
  import 'vue-material/dist/vue-material.min.css'
  import axios from 'axios'
  Vue.use(filter)
  Vue.use(MdButton)
        export default {
              props:['activeReloadPosts'],
              data(){
                    return{
                          apartments:null,
                          objNumber:data.objNumber,
                          star:null,
                          street:null,
                          loading:null,
                          showPAnel:false,
                          rating: 0
                    }
              },
              created(){
                    this.posts()
              },
              methods:{
                    posts:function(){
                        this.loading = true
                        const instance = axios.create({
                            baseURL: 'http://ec2-54-88-87-181.compute-1.amazonaws.com:8889',
                        });

                        instance.get('posts',)
                            .then(response => {
                                this.apartments = response.data.reverse()
                                this.loading = false
                            })
                            .catch(response => {
                                console.log(response)
                            })
                    },
                    to(id,photo,street,star,reviews,allPhoto,inf){
                          sessionStorage.setItem('photo',photo);
                          sessionStorage.setItem('street',street);
                          sessionStorage.setItem('star',star);
                          sessionStorage.setItem('reviews',reviews);
                          this.$router.push({name:'oneCatalog', params:{id:id}});
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
                             if(this.objNumber[i].name != value && i == this.objNumber.length - 1 && simvol == '-'){
                               return number - 0
                             }
                         }
                    },
                    changeActiveModal(value){
                        this.$emit('activeDoneFormModal', value)
                    },
                    showUrlPhoto(value){
                        let arr = value.split('.')
                        if(arr.length == 5){
                          return value
                        } else {
                          return 'http://japanalytic.com/wp-content/uploads/2017/10/No-Underlined.jpg'
                        }

                    },
                    reverseShowNavigation(val){
                        this.showPAnel = val
                    },
                    Clean(){
                        this.rating = 0
                        this.star = null
                        this.street = null
                    },

              },

              watch:{
                  activeReloadPosts:function(val){
                      this.posts()
                      return false
                  },
                  rating(value){console.log(value)
                      for(let i = 0;i < this.objNumber.length;i++){
                          if(this.objNumber[i].number == value){
                            this.star = this.objNumber[i].name
                            console.log(this.star)
                          }

                      }
                  }
              }
        }
</script>

<style lang="scss">


  /*asside*/
  .v-input__slot{
     margin-bottom: 0;
  }
  .v-input .v-label{
      font-size: 10px;
  }
  .nameStreet{
    width: 300px
  }
  .star{
    align-self: center;display: flex
  }
  .main{
        width: 100vw;
        padding-top: 80px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        min-height: calc(100vh - 181px);
  }
  .SearchContainer{
    background:rgb(207, 225, 255);
    display: flex;
    padding-left: 10px;
    flex-wrap: wrap;
    padding-right: 10px
  }
  .main{
        .containerAll{
            /*margin: 0;*/
            /*width: 1200px;*/
            /*padding: 5px;*/
            display: flex;
            /*justify-content: space-around;*/
            flex-wrap: wrap;
            flex-grow: 3;
        }
  }
  .loading{
      height: 100vh;
    width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }
  .spinner{
    background-image: url('../assets/Spinner-1s-200px.svg');
    background-size: contain;
    width: 100px;
    height: 100px;
    color: red;
    margin-left: auto;
    margin-right: auto;
  }

  .products{
      width: 33%;
      transition: all 0.3s;
      font-size: 1em;
      border: 3px solid transparent;
  }
   .layout{
    flex: none;
     align-self: baseline;
  }
  .headline{
    font-size:150%!important;
  }
  .products:hover >  .theme--light.v-card{
      background-color: red;
  }

  .products:hover{
      transform: scale(1.02,1.02);
  }
  .containerAll{
        position: relative;
  }

  @media screen and (min-width: 2500px){
      .products *{
        font-size: 120%;
      }
  }
  @media screen and (max-width: 900px) {

      .products {
          .star{
              align-self: center;display: flex
          }
          .infa-products, .infa-products div {
              padding: 5px;
              font-size: 10px;
          }
      }
      .spinner {
          width: 75px;
          height: 75px;
      }
    .headline{
      font-size:130%!important;
    }
  }
  @media screen and (max-width: 820px) {
      .products {
        width:50%
      }
  }

  @media screen and (max-width: 580px) {
    section {
      .containerAll {
        padding: 0;
      }
    }
    .products {
      width:100%
    }
  }
</style>

