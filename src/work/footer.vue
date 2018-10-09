<template>
   <footer>
        <div class="head_footer">
            <div class="contant_footer">
                <div class="list">
                    <div class="containarList">
                       <div v-for="list in lists"><a href="#">{{list}}</a></div>
                    </div>
                    <div class="containerSponsor">
                       <div class="sponsor" v-for="sponsor in sponsors" :style="{backgroundImage:'url('+sponsor+')'}"></div>
                    </div>
                </div>
                <div class="socialFooter">
                    <p>Мы в социальных сетях</p>
                    <div class="contantSotialFooter">
                         <a href="#" v-for="logo in sdolialLofo">
                             <ion-icon :name="logo"></ion-icon>
                         </a>
                    </div>
                </div>
              </div>
              <hr>
              <div class="contant_footer down">
                 <div>
                    <span style=""> &#169 </span> Все права защищены
                  </div>
                  <div>
                    Запорожье 2018
                  </div>
            </div>
        </div>
   </footer>
</template>


<script>
  export default {
    name: "footer",
    data(){
      return{
        lists:['Билеті','Сервис','О нас','Файлі','Вакансии','Гарячие туры', 'Информация'],
        sdolialLofo:['logo-vk','logo-facebook','logo-skype', 'logo-instagram'],
        sponsors:['https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MasterCard_logo.png/640px-MasterCard_logo.png',]
      }
    }
  }
</script>

<style lang="scss">
  footer{
      width: 100vw;
      background: white;
      color:grey;
      display: flex;
      justify-content: center;
  }
  .head_footer{
      padding: 20px;
      width:1200px;
      display: flex;
      flex-direction:column;
      align-items: center;
      font-style: italic;
  }
  .contant_footer > div{
      width: auto;
      padding: 10px;
  }
  .contant_footer{
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      width: 100%;
      font-size: 15px;
  }
  .head_footer hr{
      width: 100%;
      border: none;
      height: 1px;
      background: pink;
  }
  .head ul li{
      float:left;
      list-style: none;
  }
  .clear{
      clear: both;
  }
  .contant_footer a{
      text-decoration: none;
      color: deeppink;
  }
  .contant_footer a:hover{
      color: #670770;
      text-decoration: underline;
  }
  .list{
      flex-direction: column;
  }
  .list .containarList,.list .containerSponsor {
      display: flex;
      text-align: left;
  }
  .list .containarList div{
      margin-right: 10px;

  }.list .containerSponsor div{
       margin-right: 10px;
      width: 100px;
      height: 100px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
   }
  .contant_footer span{
      font-weight: bold;
      font-size: 20px;
  }
  .down{
      display: flex;
      justify-content: space-between;
      color: gray;
      align-items: center;
  }
  .socialFooter{
     display: flex;
      flex-direction: column;
  }
  .contantSotialFooter{
     display: flex;
  }
  .socialFooter p{
     margin-top: 0;
  }
  .contantSotialFooter a{
     display: flex;
     justify-content: center;
     align-items: center;
     padding: 10px;
     background: grey;
     color: white;
     border-radius: 50%;
     margin: 2px
   }
  @media screen and (max-width: 720px){
      .head_footer{
           padding: 10px;
      }
      .contant_footer{
          font-size: 10px;
      }
      .contantSotialFooter a{
           padding: 5px;
      }
      .list .containerSponsor div{
           width: 50px;
           height: 50px;
      }
      .list .containarList{
          flex-wrap: wrap;
      }
  }
</style>

