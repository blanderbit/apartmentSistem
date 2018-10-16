<template>
    <section style="z-index: 0">
          <div class="containerAll">
                 <!--<myAside v-on:radioNumber="changesNumber($event)" @activeMiddleFormModal="changeActiveModal($event)"-->
                          <!--@streetName="changesStreet($event)" :ids="star"></myAside>-->
                 <div class="loading" v-if="loading == true?true:false">
                     <div class="spinner"></div>
                 </div>
                  <v-layout class="products" v-for="one in filterBy(filterBy(apartments,street),star)">
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
                                          <ion-icon
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
                                  <v-btn flat color="orange">Share</v-btn>
                                  <v-btn flat color="orange" @click.prevent="to(one.id,
                                 one.photo_url,
                                 one.street,
                                 one.star,
                                 one.reviews)">Choose a number</v-btn>
                              </v-card-actions>
                          </v-card>
                      </v-flex>
                  </v-layout>
              <!--</div>-->
          </div>
    </section>
</template>

<script>
  import Vue from 'vue'
  import aside from './aside.vue'
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
                          loading:null
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
                    changesNumber(value){
                           this.star = value
                    },
                    changesStreet(value){
                           this.street = value
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

                    }
              },
              components:{
                myAside:aside,
                // 'md-button':MdButton
              },
              watch:{
                  activeReloadPosts:function(val){
                      this.posts()
                      return false
                  }
              }
        }
</script>

<style lang="scss">
  section{
        width: 100vw;
        padding-top: 100px;
        display: flex;
        justify-content: center;
        background: rgba(31, 192, 237,0.5);
  }
  section{
        .containerAll{
          margin: 0;
          width: 1200px;
          display: flex;
            justify-content: center;
          flex-wrap: wrap;
            flex-grow: 3;
        }
  }
  .loading{
      height: 90vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }
  .container{
        width: 100%;
        padding: 20px;
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
              width: 30%;
              margin: 10px;
            transition: all 0.3s;
            font-size: 1em;
        }
  .products:hover{
      transform: scale(1.02,1.02);
  }
  .containerAll{
        position: relative;
  }
  .products{
        .photoProducts{
              width: 100%;
              cursor: pointer;
              background-position: center;
              background-size: cover;
        }
        .infa-products{
              width: 100%;
              padding: 20px;
        }
        .infa-products{
              div{
                padding: 10px;
              }
        }
        .buttonProducts{
              width: 100%;
              align-self: flex-end;
          display: flex;
          justify-content: center;
          align-items: center;
        }
  }
  @media screen and (max-width: 900px) {
      .container {
          width: 100%;
          padding: 0px;
          position: relative;
      }

      .products {
          width: 35%;
      }

      .products {
          .infa-products, .infa-products div {
              padding: 5px;
              font-size: 10px;
          }
      }
      .spinner {
          width: 75px;
          height: 75px;
      }
  }
  @media screen and (max-width: 720px){
      .products{
          width: 40%;
      }
  }@media screen and (max-width: 520px){
      .products{
          width: 50%;
      }
  }@media screen and (max-width: 420px){
      .products{
          width: 60%;
      }
  }@media screen and (max-width: 320px){
      .products{
          width: 100%;
      }
  }
</style>

