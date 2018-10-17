<template>
   <!--<footer>-->
        <!--<div class="head_footer">-->
            <!--<div class="contant_footer">-->
                <!--<div class="list">-->
                    <!--<div class="containarList">-->
                       <!--<div v-for="list in lists"><a href="#">{{list}}</a></div>-->
                    <!--</div>-->
                    <!--<div class="containerSponsor">-->
                       <!--<div class="sponsor" v-for="sponsor in sponsors" :style="{backgroundImage:'url('+sponsor+')'}"></div>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="socialFooter">-->
                    <!--<p>Мы в социальных сетях</p>-->
                    <!--<div class="contantSotialFooter">-->
                         <!--<a href="#" v-for="logo in sdolialLofo">-->
                             <!--<ion-icon :name="logo"></ion-icon>-->
                         <!--</a>-->
                    <!--</div>-->
                <!--</div>-->
              <!--</div>-->
              <!--<hr>-->
              <!--<div class="contant_footer down">-->
                 <!--<div>-->
                    <!--<span style=""> &#169 </span> All rights reserved-->
                  <!--</div>-->
                  <!--<div>-->
                    <!--Zaporozhye 2018-->
                  <!--</div>-->
            <!--</div>-->
        <!--</div>-->
   <!--</footer>-->
  <v-footer

    height="auto" class="indigo lighten-1"
  >
    <div class="containerFooter">
      <v-card flat tile class="text-xs-center indigo lighten-1">
        <v-card-text>

            <a href="#" v-for="logo in sdolialLofo">
              <v-btn><ion-icon :name="logo"></ion-icon> </v-btn>
            </a>

        </v-card-text>

        <v-card-text class=" pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          &copy;2018 — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>

    </div>

  </v-footer>
</template>


<script>
  export default {
    name: "footer",
    data(){
      return{
        lists:data.lists,
        sdolialLofo:data.sdolialLofo,
        sponsors:['https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MasterCard_logo.png/640px-MasterCard_logo.png',]
      }
    }
  }
</script>

<style lang="scss">
  .indigo.lighten-1{
    background-color: #448aff!important;
  }

  .containerFooter{
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
</style>

