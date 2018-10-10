<template>
  <div id="app">
      <modal :value="toValue" :activeContainer="container" :remove="position" @reversData="changeReverse($event)">
        <h3 slot="h1">{{h1}}</h3>
        <p slot="information">{{toValue}}</p>
      </modal>
      <myHead></myHead>
      <navbar></navbar>
      <!--<div class="back">-->
        <!--<a href=""></a>-->
        <!--<a href=""></a>-->
      <!--</div>-->
      <section>
          <div class="containerAll">
              <div class="containerCatalogId">
                  <div class="zacaz">
                      <div>
                          <div v-if="street == ''||street == null?false:true"><span style="font-weight: bold">Street</span> {{ street}}</div>
                          <div>
                              <ion-icon v-for="star in starFull" name="star"></ion-icon>
                              <ion-icon v-for="star in starNoFull" name="star-outline"></ion-icon>
                          </div>
                          <div>
                             <ion-icon name="contacts"></ion-icon>{{reviews}}
                          </div>
                      </div>
                      <a class="buttonTo" @click.prevent="toNumber" href="#">Выбрать номер</a>
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
              position:[]
          }
      },
      created(){
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
            if(value[2] == 'add'){
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
      },
      components:{
          myFoot:footer,
          myHead:header,
          navbar:navbar,
          calendar:calendar,
          modal:modal
      },
      computed:{
          starFull(){
              return Number(this.star);
          },
          starNoFull(){
              return 5 - Number(this.star);
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
  .containerAll{
      width: 1200px;
      display: flex;
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
