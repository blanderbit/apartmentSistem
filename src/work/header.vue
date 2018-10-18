<template>
    <header>
        <div class="page-container md-layout-column" :class="{activePage:showNavigation == true || showSidepanel == true?true:false}">
            <md-toolbar style="position: relative" class="md-primary" :class="{myToolbar:true}">
                <md-button class="md-icon-button" :class="{myMenuActive:showNavigation == true?true:false,
                tooActiveMenu:showSidepanel == true?true:false}"
                           @click="showNavigation = true">
                    <div class="myMenu" style="background-image: url(../src/assets/menu.svg)"/>
                </md-button>
                <span class="md-title" style="color:white">BOOKING</span>
                <div class="md-toolbar-section-end">
                    <md-avatar class="myPanel" :class="{myPanelActive:showSidepanel == true?true:false,
                    tooActivePanel:showNavigation == true?true:false}">
                        <img :src="avatar" @click="showSidepanel = true">
                    </md-avatar>
                </div>
            </md-toolbar>

            <md-drawer :md-active.sync="showNavigation">
                <md-toolbar class="md-transparent" md-elevation="0">
                   <span class="md-title">Panel navigation</span>
                </md-toolbar>
                <md-list>
                    <md-list-item v-for="(list,index) in lists" :key="index">
                        <span class="md-list-item-text">{{list}}</span>
                    </md-list-item>
                </md-list>
            </md-drawer>

            <md-drawer class="md-right" :md-active.sync="showSidepanel">
                <md-toolbar class="md-transparent" md-elevation="0">
                    <span class="md-title">Panel</span>
                </md-toolbar>
                <md-list>
                    <md-button v-if="token != true?true:false" @click="to('login')" >Sign in</md-button>
                    <md-button v-if="token != true?true:false" @click="to('registration')">Registration</md-button>
                    <md-avatar v-if="token == true?true:false">
                       <img :src="avatar">
                    </md-avatar>
                    <md-list-item v-if="token == true?true:false">ID:<span>{{idUser}}</span></md-list-item>
                    <v-btn color="blue" v-if="token == true && page == true?true:false"
                           @click="openModalCreateFormPost">
                      To advertise
                    </v-btn>
                    <v-btn  v-if="token == true?true:false" @click="logOut()">
                      Log out
                    </v-btn>
                </md-list>
            </md-drawer>
        </div>
        <div class="modallogin" :style="{width:ok==0?'0':'100vw',
              fontSize:ok==0?'0':'50px',
              height:ok==0?'0':'100vh'}">
            <div>
              You are logged out
            </div>
        </div>
    </header>
</template>

<script>
  import Vue from 'vue'


  import {MdToolbar} from 'vue-material/dist/components'
  import {MdIcon} from 'vue-material/dist/components'
  import {MdAvatar} from 'vue-material/dist/components'
  import {MdList} from 'vue-material/dist/components'
  import {MdDrawer} from 'vue-material/dist/components'
  import {MdButton} from 'vue-material/dist/components'
  import 'vue-material/dist/vue-material.min.css'
  Vue.use(MdToolbar)
  Vue.use(MdIcon)
  Vue.use(MdAvatar)
  Vue.use(MdList)
  Vue.use(MdDrawer)




  import axios from 'axios'
  export default {
      data(){
          return{
              idUser:sessionStorage.getItem('idUser'),
              token: null,
              page:false,
              ok:0,
              avatar:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAk1BMVEU0SV7////t7e3u7u4tPlDr6+syRVovRVsVNE7y8fErQlnz8/ImP1YzSV00SF41SFx/i5hNX3IgOVOgqbJjcoIhPFQWM0/KztKHk6A+UmZWZ3iUnaeosLfX3ODs7/IyRl5ndoXi4+W2vMEkN0rDxs1RZHSyt706UGXQ1Nh3hZJdbX1AUF9MWmhoc36aoq0QLkUHJj2sHv+wAAAJsUlEQVR4nO2da1viPBCGC11o0ymFFkMppUgrymF39f3/v+7tQQQR1GQmSWF9PuXyg85tmsyTs9Wp1LVtu6u2lBfPo7swWQ+SMNyNxk/xovyhrf7vdizlhABsk864yz2nP7AGlhXcDxzP55P1NGYAV0/IoNjyyHcC66O8yN8WDK6bMJ963BueodtDcm+00EJYqkdfWoWud5luD+kuM2URVIRVsYHtEZfimet8yVdq6LmzWEkEdclS1Z2x7ff4ajnuskceQVOyVRHOo6+/z3ff6iS9HsIyQRRJJMRXyXdiYCoID02yR1RiC5EP9KDAHQEjjqVqh8S/sCxla7EP9Kgak5w4lg59PrQ744lMBTa16ExWbc/4rLcUb4HHcp9ZqwlZN/QHKEKLJ13WXk9j26FsEzzICxd2ez3N8jMP+l35y/Z6mhHH85Xio5ZmfEijc2MkCUUptJEQnl0avlJuhdg2TwNzl6gGa8Q5tM7TbOhqsEbctM3TLPg9KaEVLVqV8e1OIm3VLshJiGbiaAhh6xMDWoG/pelQSTwNzHFm9Lyisrdpi6dZ0PYyrwrcBSoqSk8TUjfCRk6I/EDJMv48InCj58Tn7SAEFY2wVhBBKzzNFj9iukTobdvgaWIl3cyr3BgdHz4fKupmGtWdjeGMv1LWCmu5K+OE5HbtvUrzRkMo7RkUV2HpbFao+NCeBhLFgFY/AZOehhWqq7BM+wUzmPFBaUfayAnBHKEdq6/CKifaKEKMp4GlMjtzJGcJkvGhPU0XJhoAy0pktiFPA3Pykf1Z+XPMag2KUHG2f1OCmc9AELKYE86QfiYeI5a/EZ4GRjr6mUreCDFjg/E0xDOknyFKxYf2NBsdybBRtJFtSqiMP9X1kZZ1mBohXOv7Sq01glDa0+QqZy9O5eb6PQ0b60n3jfwx0+5pYKkp3dfyltIDDGlCphPQChyQHWDIEtqZvlxRKcqQhMJOgWly3Xv5T7ZkpNKeJtWXDWvCVLun2Wlth5az05rxGeQdT9O4Yi+vk4PMhjcpQhaHrt5+ppLrhrFEypDxNGwlv4MUo6EzWTGhSCU9Tbeja+D7QQHviFeIeD6EZ7154pjQfxafzxAmXIDGIcUHORoImZZZ4EuSmLER9jR6xxSnKscY6j2NxqH9R3lTgUhlPY26jQnfIdwKNiqZjH9nJBm+yrnTQDgzSdifiRMKp1CtY/tTOUuBSCU9DTPcDkG5p9E3l3+WcCS8xV084xvOhxoIVzTHRuTEV+o9jZ2bdG1RbmuYp3H65ggDoUhl52m25tJFY2mUz2I8mWuI/EkLYa5nB8YZBdUCjTCh+LQAGPNt/Zn4zhqptaeCI0/CyioqdK09mWqIkXCksoSpGVvjS10sIUUIOpd/D3IBQfh9T1OXUt/AlKmfSkQqufZk93SvWlTyera+tSd40v+duoXU2WDZ3SYKDhx+IdnjiLKECg6NfqrgXvZIqfx+moXWSrz3F/r302S+tlFUcO9v9O+nsSHTBWgFQSZ/Nx9iBy1om9/3pogrFjB7hLXN2PDCzB7hbk/XYnDUE56dQXqafUnTEoazk4wPt5+m0lzPZ+rP5ZsS8lSQponFKDdGCFo2Rjk7zBWnuHNPtpZpN/66aU+3p2lKVPcmfaYIEV8HfQ5YQ9Kvlu6l48MTqt/OPqzmSA0Sql/zdh5R8eHPcseqW2IUo+LD308DiWLCNaDiw99PA2p9zZDPkffS4m9vYUrrMLCwl0XhCaFQ2RJ5gSfEeJqmpHBOykkktszSeppStrp7FYKoEN/2TOxpqpK69URnhrpOgSbjlyWWqTI2boa6EoOM0IapmozhTylevyC5c8+2VHynwQAxO0PnaZqSku/UzZBR0Xia19KUfI5/wEfoqGgyflNi5BfVOCFrFaGdUc+dRjnmVhpaT1OXoCC+ZbeQXooh9zT7UhoR7rKJUqKoSO/VX9L1Nv6SLCrSlwNCqv0L3iNhVJSEPaJRhpP06AlxnmY/ysits29ziQKuc9lz2+o8zb4E0g+wHOStgSSWfYn6raAE2xa9BKhiIc34h9Ijrkf1KTsZNYRsixjyD6ItjVdT4GkOTRxS+V3SbgpdwliIPc2htAkk22KwIY9F0fuHkitSzQFR4lh+CG+HkMQ9vJVwhLSxKHnDUvaIYn15IHEsat6wRBCSx6LmDcsfQs2E1J4G2w6JY1HjaWRPKDanC6/B04xlZxb5mDwWJYRj+XlFd3wNhAhAy5qMW+9pYIw7YeqOoeWeZox9QW8yJotFiadB1mBTi0SxKMn4qDZ4XIttJSSowUouZXdD6GkYTQ1WKmuRUaV9Qk+T3dHtq+F31Qo3zT+f6oXH7E7qPfVLctySkaYBURAyiO/IL4ssGWOp6zzpCW2Id6T1d2DcxdL3I1N6mngXKdv1VTKi48N5GmX1d8y43xhlwtOAwvp7x4j4VFEZPyvrT9HrlSeMmRHCjL7/vMxY5UetnoYBcf77knFyl4GUz5H0NBrr743RlfQ54vmQ1e1PM1/DONt0xF9+EiVkqvPDF4wrYZ8jRljyzSKKHSWyGkRhAWIL4WKeZjUzVn97OVFSCMX8fU/DYPWoJf99yciTJ2D0ngZWM266/t7E10/f9TnfzvibMGpD/e3V5+uClHDzaLz9fVAUPBF5mrL/DFvR/k4VcOfJLgceaE+zCc089vANBdybv+s3xT0N61T1ZxrkE91zf/yFz/mMkEHR3vp7E+dpDz45H3WZsOKLHEN3QArJ52l+OXlc9jRFonz8TqaS8SLHWU9T9p8V3zXU36sGvj/uwinHZU8D11R/e/nec+/Mp3o2468So+MHWQ19/vxxB/UZwtUV1t9evjtdnCwGnHgagGvmKxV4k1H+zueceJor56vludMLnsburNZX2f5OFfi8OPpU3wghC01emE+raJfDKSHMJ9eU/76SU1038Y4QpmYuP1anamPOsadJb+cLfVXgprV1azyNiWuB1ctNYZ/x2cbYWwAqde/OYU+4vvokeF5uxmpPA0buH9chZwe1pwHsZrv2yt3U2cLQOwA65MxqwptLFEea5CVhYezhVA3yn0tCo6/9qZaTdKzeLX+k1jDKrdjkI2PqxWNL8yvwuuWPrdEtN8PqTKM1M/iKmgY5S0v17ZymNbNuHNBKTAegXGvTAfzoRz+y/oWWeOv58F+owx/96Ec/Uq/+rcv6/eu29cf6+2A6BqV6GFnj2yZ8KazsP9NBKNUDszrbW67El3nH6sCL6TDU6eFPvfaUv9xqLT70odltsli+3CLkw39/D/tp8vk2KZPjr19e/1d/+HtoOjgK/Zk258D/B2a/Jp3EfLOpAAAAAElFTkSuQmCC',
              showNavigation: false,
              showSidepanel: false,
              lists:['Air tickts', 'Railway tickets', 'Bus', 'Office', 'Hotel','Transport', 'Tour'],
          }
      },
      created(){
          this.token = sessionStorage.getItem('token')!= null?true:false
          this.page = this.$router.history.current.name == 'catalogs'?true:false
      },
      methods:{
          to(name){
              this.$router.push({name:name})
          },
          logOut(){
              const instance = axios.create({
                  baseURL: 'http://ec2-54-88-87-181.compute-1.amazonaws.com:8889',
                  headers:{
                    Authorization:sessionStorage.getItem('token'),
                    "X-Token-Auth":sessionStorage.getItem('token')
                  }
              });
              instance.post('logout',
                {
                    token:sessionStorage.getItem('token')
                })
                .then(response => {
                    console.log(response)
                })
                .catch(response => {
                    console.log(response.response)
                })
              sessionStorage.removeItem('token')
              this.token= sessionStorage.getItem('token') != null?true:false
              this.$emit('tokenHeader', this.token)
              this.ok = 1;
              let it = this;
              setTimeout(function () {
                it.ok = 0
              },2000)
          },
          openModalCreateFormPost(){
              let overlow =  document.querySelector('html')
              overlow.style.overflowY = 'hidden';
              this.showSidepanel = false;
              window.scrollTo(0,0)
              this.$emit('activeFormModal', true)
          },
      },
  }

</script>

<style lang="scss">
  .page-container {
    height: auto;
    overflow: hidden;
    position: fixed;
    width: 100vw;
    transition: all 0.1s;
    z-index: 2000;
    box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
  }

  // Demo purposes only
  .md-drawer {
    width: 230px;
    background: #f2f2f2;
    max-width: calc(100vw - 125px);
  }
  .md-overlay{
    height: 100vh;
  }
  .md-button-content{
    width: 100%;
    height: 100%;
  }
  .myToolbar{
    transition: all 0.5s;
    background: #448aff;
  }
  .myMenu{
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 30px;
    background-position: center;
    transition: all 1s;
  }
  .myPanel{
    margin: 0;
    transition: all 0.4s;
    cursor:pointer
  }
  .myMenuActive{
    margin-left: 230px!important;
    transform:rotate(90deg);
  }
  .myMenuActive +.md-title {
    font-size: 10px;
  }
  .tooActiveMenu{
    margin-left: -230px!important;
  }
  .myPanelActive{
    margin-right: 230px!important;
  }
  .tooActivePanel{
    margin-right: -230px!important;
  }
  .md-content {
    padding: 16px;
  }
  .activePage{
    height: 100vh;
  }
  .md-toolbar{
    padding: 20px;
  }
  .md-button-content{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
