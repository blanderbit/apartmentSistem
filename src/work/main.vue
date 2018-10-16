<template>
    <section style="z-index: 0">
          <div class="containerAll">
                 <myAside v-on:radioNumber="changesNumber($event)" @activeMiddleFormModal="changeActiveModal($event)"
                          @streetName="changesStreet($event)" :ids="star"></myAside>
                 <div class="container">
                     <div class="spinner" v-if="loading == true?true:false"></div>
                         <div>
                             <div class="products" v-for="one in filterBy(filterBy(apartments,street),star)" :id="one.id">
                                 <div class="photoProducts" :style="{backgroundImage:'url('+showUrlPhoto(one.photo_url)+')'}"
                                      @click="to(one.id,
                                     one.photo_url,
                                     one.street,
                                     one.star,
                                     one.reviews)">
                                 </div>
                                 <div class="infa-products">
                                     <div>
                                         <ion-icon v-for="(star,index) in replaceStreetInNumber(one.star)" :key="index + 'a'" name="star"></ion-icon>
                                         <ion-icon v-for="(star,index) in replaceStreetInNumber(one.star, 5 , '-')" :key="index  + 'b'" name="star-outline"></ion-icon>
                                     </div>
                                     <div v-if="one.street == ''||one.street == null?false:true">
                                           <span style="font-weight: bold">
                                                Street
                                           </span>
                                         {{ one.street}}
                                     </div>
                                     <div>
                                         <ion-icon name="contacts"></ion-icon>{{one.reviews}}
                                     </div>
                                 </div>
                               <md-button class="md-raised md-primary buttonProducts"
                                          @click.prevent="to(one.id,
                                 one.photo_url,
                                 one.street,
                                 one.star,
                                 one.reviews)">Choose a number</md-button>
                             </div>
                        </div>
                 </div>
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
        margin-top: 80px;
        display: flex;
        justify-content: center;
        background: #ededed;
  }
  section{
        .containerAll{
          margin: 0;
          width: 1200px;
          display: flex;
        }
  }
  .container{
        width: 75%;
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
  .container{
        .products{
              display: flex;
              align-items: stretch;
              height: 200px;
              border-bottom: 1px solid lightgray;
              background: white;
        }
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

  @media screen and (max-width: 900px){
        .container{
              width: 100%;
              padding: 0px;
            position: relative;
        }
        .container{
               .products{
                     height: 100px;
               }
         }
        .products{
              .infa-products,.infa-products div{
                    padding:5px;
                    font-size: 10px;
              }
        }
        .spinner {
              width: 75px;
              height: 75px;
        }
  }
</style>

