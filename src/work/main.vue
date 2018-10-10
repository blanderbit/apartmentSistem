<template>
    <section>
          <div class="containerAll">
                 <myAside></myAside>
                 <div class="container">
                       <div class="products" v-for="one in apartments" :id="one.id">
                             <div class="photoProducts" :style="{backgroundImage:'url('+one.photo+')'}"
                                 @click="to(one.id,
                                 one.photo,
                                 one.street,
                                 one.star,
                                 one.reviews,
                                 one.allPhoto,
                                 one.inf)">
                             </div>
                             <div class="infa-products">
                                   <div>
                                         <ion-icon v-for="star in Number(one.star)" name="star"></ion-icon>
                                         <ion-icon v-for="star in 5 - Number(one.star)" name="star-outline"></ion-icon>
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
                             one.photo,
                             one.street,
                             one.star,
                             one.reviews,
                             one.allPhoto,
                             one.inf)">vibrat nomer</a>
                             </div>
                       </div>
                 </div>
          </div>
    </section>
</template>

<script>
  import aside from './aside.vue'
        export default {
              data(){
                  return{
                      apartments:[
                            {
                                  photo:'https://pulkovoairport.ru/r/_content/341d7a364367b658f7ed2ee3fb150944/vip1.jpg',
                                  street:'Avenu 12 old east',
                                  id:342,
                                  star:3,
                                  reviews:7,
                                  inf:'',
                                  allPhoto:[],
                            },
                            {
                                  photo:'http://www.dekon.ru/files/pictures_fn_86.jpg',
                                  star:5,
                                  id:421,
                                  street:'Avenu 12 old east',
                                  reviews:5,
                                  inf:'',
                                  allPhoto:[],
                            },
                            {
                                  photo:'https://pulkovoairport.ru/r/_content/341d7a364367b658f7ed2ee3fb150944/vip1.jpg',
                                  star:2,
                                  id:231,
                                  street:'Avenu 12 old east',
                                  reviews:1,
                                  inf:'',
                                  allPhoto:[],
                            },
                            {
                                  photo:'http://www.dekon.ru/files/pictures_fn_86.jpg',
                                  star:1,
                                  id:42,
                                  street:'Avenu 12 old east',
                                  reviews:0,
                                  inf:'',
                                  allPhoto:[],
                            },
                            {
                                  photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSka6O511Zzze1LLxOfjnAdZOuW4ZlZG81Yu1CMN40XOiyeVtka7g',
                                  star:3,
                                  id:543,
                                  street:'Avenu 12 old east',
                                  reviews:12,
                                  inf:'',
                                  allPhoto:[],
                            }
                      ]
                  }
              },
              methods:{
                    to(id,photo,street,star,reviews,allPhoto,inf){
                          sessionStorage.setItem('photo',photo);
                          sessionStorage.setItem('street',street);
                          sessionStorage.setItem('star',star);
                          sessionStorage.setItem('reviews',reviews);
                          sessionStorage.setItem('allPhoto',allPhoto);
                          sessionStorage.setItem('inf',inf);
                          this.$router.push({name:'oneCatalog', params:{id:id}});
                    }
              },
              components:{
                myAside:aside
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
