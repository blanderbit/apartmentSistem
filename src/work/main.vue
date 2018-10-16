<template>
    <section>
          <div class="containerAll">
                 <myAside v-on:radioNumber="changesNumber($event)" @activeMiddleFormModal="changeActiveModal($event)"
                          @streetName="changesStreet($event)" :ids="star"></myAside>
                 <div class="container">
                     <img src="../assets/45.gif">
                     <div>
                         <div class="products" v-for="one in filterBy(filterBy(apartments,street),star)" :id="one.id">
                             <div class="photoProducts" :style="{backgroundImage:'url('+one.photo_url+')'}"
                                  @click="to(one.id,
                                 one.photo_url,
                                 one.street,
                                 one.star,
                                 one.reviews)">
                             </div>
                             {{activeReloadPosts}}
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
                             <div class="buttonProducts">
                                 <a href="#" @click.prevent="to(one.id,
                             one.photo_url,
                             one.street,
                             one.star,
                             one.reviews)">Choose a number</a>
                             </div>
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
  import axios from 'axios'
  Vue.use(filter)
        export default {
              props:['activeReloadPosts'],
              data(){
                    return{
                          apartments:null,
                          objNumber:data.objNumber,
                          star:null,
                          street:null
                    }
              },
              created(){
                    this.posts()
              },
              methods:{
                    posts:function(){
                        const instance = axios.create({
                            baseURL: 'http://ec2-54-88-87-181.compute-1.amazonaws.com:8889',
                        });

                        instance.get('posts',)
                            .then(response => {
                                console.log(response.data)
                                this.apartments = response.data
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
              },
              components:{
                myAside:aside
              },
              watch:{
                  activeReloadPosts:function(val){
                      this.posts()
                  }
              }
        }
</script>

<style lang="scss">
  section{
        width: 100vw;
        display: flex;
        justify-content: center;
        background: #ededed;
  }
  section{
        .containerAll{
          width: 1200px;
          display: flex;
        }
  }
  .container{
        width: 75%;
        padding: 20px;
  }
  .container{
        .products{
              display: flex;
              align-items: stretch;
              height: 200px;
              margin-bottom: 20px;
              background: white;
        }
  }
  .products{
        .photoProducts{
              width: 30%;
              cursor: pointer;
              background-position: center;
              background-size: cover;
        }
        .infa-products{
              width: 35%;
              padding: 20px;
        }
        .infa-products{
              div{
                padding: 10px;
              }
        }
        .buttonProducts{
              width: 30%;
              display: flex;
              align-items: flex-end;
              justify-content: center;
        }
        .buttonProducts{
              a{
                    width: 100%;
                    text-align: center;
                    padding: 20px;text-decoration: none;
                    background: deeppink;
                    color: white;
                    font-weight: bold;
            }
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
              .buttonProducts a{
                     width: 100%;
                     text-align: center;
                     font-size: 10px;
                     padding: 10px;text-decoration: none;
                     background: deeppink;
                     color: white;
                     font-weight: bold;
               }
        }
  }
</style>

