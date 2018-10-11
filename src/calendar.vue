<template>
    <div id="calendar">
        <h2>Booking appartments</h2>
        <div >
            <table class="containerCalendar ">
                <tr class="appartment caption">
                    <ion-icon name="arrow-round-back" @click="week(9,7,'-')"></ion-icon>
                        <td colspan="5" class="center">{{month}}</td>
                    <ion-icon name="arrow-round-forward" @click="week(9,7,'+')"></ion-icon>
                </tr>
                <tr class="downCalendar" >
                    <td  class="center day centerDay">Комнаты</td>
                    <td v-for="(dayOne,index) in day" class="center centerDay"
                        :class="{activeDay:indexDay == index && dayOne.number == thisDay?true:false,
                        activecenterDay:index == its2?true:false}">
                        <ion-icon name="arrow-round-back" class="noneArrow" @click="dayChange('-')"></ion-icon>
                        {{dayOne.number}} {{dayOne.day}}
                        <ion-icon name="arrow-round-forward" class="noneArrow" @click="dayChange('+')"></ion-icon>
                    </td>
                </tr>
                <tr class="downCalendar" v-for="(one,index) in apartment">
                    <td colspan="2" class="appartment center nameApartment" @click="change(index)"
                        :style="{color:one.color}">
                        <div>{{one.name}}</div>
                        <span style="color: darkgrey">{{'('+one.inf+')'}}</span>
                    </td>
                    <td class="appartment flex" v-for="(two,index2) in day"
                        :class="{activeflex:index2 == its2?true:false}">
                        <table class="order" :class="{orderActive:its == index?true:false}">
                            <tr v-for="three in timeBefore13">
                                <td @click="time(three,one.name,two.day,two.number)"
                                    :style="{background:one.color}"
                                    :class="{active:infOrder(three,one.name,two.day,two.number)}">
                                    {{three}}
                                    <ion-icon style="font-size: 12px" name="add"></ion-icon>
                                </td>
                            </tr>
                        </table>
                        <table class="order" :class="{orderActive:its == index?true:false}">
                            <tr v-for="three in timeAftere13">
                                <td class="activeOrder" @click="time(three,one.name,two.day,two.number)"
                                    :style="{background:one.color}"
                                    :class="{active:infOrder(three,one.name,two.day,two.number)}">
                                    {{three}}
                                    <ion-icon style="font-size: 12px" name="add"></ion-icon>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
          name: 'app',
          props:['reverse'] ,
          data() {
                return {
                      month: 'June',
                      allMonth:[],
                      nameMonth: data.nameMonth,
                      day: [
                            {day: 'Monday', number: null}, {day: 'Tuesday', number: null}, {day: 'Webnesday', number: null},
                            {day: 'Thursday', number: null}, {day: 'Fridey', number: null}
                        ],
                      indexDay: null,
                      apartment: [
                            {
                                  name: 'Green',
                                  color:'green',
                                  inf: 'Before 5 person'
                            },
                            {
                                  name: 'Red',
                                  color:'red',
                                   inf: 'Before 10 person'
                            },
                            {
                                  name: 'Blue',
                                  color:'blue',
                                  inf: 'Before 15 person'
                            },
                            {
                                  name: 'Orange',
                                  color:'orange',
                                  inf: 'Before 20 person'
                            },{
                                  name: 'Purple',
                                  color:'rebeccapurple',
                                  inf: 'Before 25 person'
                            },
                      ],
                      timeBefore13: data.timeBefore13,
                      timeAftere13:data.timeAftere13,
                      count: 1,
                      mainArr: JSON.parse(localStorage.getItem('arrOrders')),
                      year: 2018,
                      idOrder: null,
                      thisDay: null,
                      start:7,
                      steps:12,
                      step:7,
                      monthes:null,
                      its:0,
                      its2:0,
                    }
              },
              methods: {
                  dayChange(simvol){
                      if(simvol == '+'){
                          this.its2++;
                          if(this.its2 > 4){
                              this.its2 = 4;
                          }
                      }else{
                          this.its2--;
                          if(this.its2 == -1){
                             this.its2 = 0;
                          }
                      }
                  },
                  change(number){
                     this.its = number;
                  },


                //test
                  week(months,step,simvol){
                      this.its2 = 0
                      if(step != undefined){
                          if(simvol == '+'){
                              this.start = Number(this.start + step);
                              this.steps = Number(this.steps +  step);
                          }else{
                              this.start = Number(this.start - step);
                              this.steps = Number(this.steps - step);
                          }
                      }
                      let arr = [];
                      for(let i = this.start;i<this.steps;i++ ){
                        // this.allMonth[monthes];
                        // if(this.allMonth[monthes].days[i] == undefined){
                        if(31== undefined){
                          return;
                        }
                        arr.push(this.allMonth[months].days[i].day);
                      }
                      for(let j = 0;j < 5;j++){
                        let number = arr[j]
                        this.day[j].number = number;
                      }
                  },


                //work
                  calendarBig: function (year, month, day) {
                      this.monthes = month;
                      this.indexDay = day - 1;
                      this.month = this.nameMonth[month].month;
                      let arr = [];
                      for (let m = 0; m <= 11; m++) {
                          let Day = new Date(year, [m]);
                          let DlastForMonth = new Date(Day.getFullYear(), Day.getMonth() + 1, 0).getDate(),
                              DNlast = new Date(Day.getFullYear(), Day.getMonth(), DlastForMonth).getDay(),
                              DNfirst = new Date(Day.getFullYear(), Day.getMonth(), 1).getDay();
                          let obj = {
                              month: String(Day).split(' ')[1],
                              nDay: DlastForMonth,
                              lastDay: DNlast,
                              firstDay: DNfirst,
                              days: []
                          }
                          arr.push(obj);
                          let number = DNfirst;
                          for (let i = 1; i <= DlastForMonth; i++) {
                              if (number == 7) {
                                  number = 'v';
                              }
                              let daysObj = {
                                  day: i,
                                  numder: number,
                              }
                              obj.days.push(daysObj);
                              if (number == 'v') {
                                  number = 0;
                              }
                              number++;
                          }

                      }
                      this.allMonth = arr;
                      console.log(this.allMonth)
                      this.week(month);
                  },
                  time(time, name, day, number) {
                      let hour = Number(time.substr(0,2))
                      let data = this.datas(hour,number)
                      let obj = {
                          data:String(data),
                          name: name,
                          order: this.idOrder,
                          user: sessionStorage.getItem('idUser')
                      }
                      let sent =  JSON.stringify(obj)

                      let active = event.currentTarget.classList.contains('active')
                      if(active == true){
                          let position = this.remove(sent,number)
                          this.$emit('object',[sent,true,'Remove',position])
                          this.open()
                      } else {
                          this.$emit('object',[sent,true,'Add'])
                          this.open()
                      }
                  },
                  remove(value,number){
                      let information = JSON.parse(value)
                      let hour = Number(information.data.split(' ')[4].substr(0,2))
                      let data = this.datas(hour,number)
                      for (let i = 0; i < this.mainArr.length; i++) {
                          if (this.mainArr[i].data == data
                              && this.mainArr[i].name == information.name
                              && this.mainArr[i].user == sessionStorage.getItem('idUser')
                              && this.mainArr[i].order == this.idOrder) {
                              return i;
                          }
                      }
                  },
                  datas(hour,number){
                      for(let i = 0; i < this.nameMonth.length;i++){
                          if(this.allMonth[i].month == this.month){
                              return new Date(this.year, this.nameMonth[i - 1].number, number,hour)
                          }
                      }
                  },
                  infOrder(time, name, day, number) {
                      if (this.mainArr != null) {
                          let hour = Number(time.substr(0,2))
                          let data = this.datas(hour,number)
                          for (let i = 0; i < this.mainArr.length; i++) {
                              if (this.mainArr[i].data == data
                                  && this.mainArr[i].name == name
                                  && this.mainArr[i].user == sessionStorage.getItem('idUser')
                                  && this.mainArr[i].order == this.idOrder) {
                                  return true;
                              }
                          }
                      }

                  },
                  open:function(){
                    let overlow =  document.querySelector('html')
                    overlow.style.overflowY = 'hidden';
                  }
              },
              created() {
                    this.year == new Date().getFullYear();
                    this.idOrder = this.$router.history.current.params.id;
                    this.thisDay = Number(String(new Date()).split(' ')[2]);
                    console.log(this.thisDay)
                    this.calendarBig(this.year, new Date().getMonth(), new Date().getDay());
              },
              watch:{
                  reverse:function(value){
                       this.mainArr = JSON.parse(value)
                  }
            },
        }
</script>

<style lang="scss">
    .calendar{
        width: 100%;
        padding: 20px;
        background: lightgray;
    }
    .caption{
        background: pink;
        padding: 10px;
    }
    .nameApartment{
        color:black;
    }
    .containerCalendar{
        display: flex;flex-direction: column;
        border-collapse: collapse;
        width: 100%;
    }
    .downCalendar {
        display: flex;
        height: auto;
        transition: all 2s;
        font-size: 15px;
    }
    tr.appartment{
       display: flex;
       justify-content: flex-end;
    }
    tr.appartment td{
       width: 80%;
    }
    tr .appartment{
        width: 20%;
        border-bottom: 1px solid lightgray;
        border-right:1px solid lightgray;
        border-left: none;
    }
    tr .appartment:first-child{
        border-right:none;
    }
    tr .appartment:nth-child(2){
       border-left:none;
    }
    .centerDay{
        border-bottom: 1px solid lightgray
    }
    .center{
        width: 20%;
        text-align: center;
        vertical-align: middle;
    }
    .flex {
       display: flex;
       justify-content: center;
    }
    .order td{
        background: #1ab876;
        border-collapse: collapse;
        border-radius: 10px;
        padding: 5px 20px;
    }
    td{
        cursor: pointer;
    }
    .order td ion-icon{
        color:lightgray
    }
    .order td:hover{
         background:#077849!important;
    }
    .order td:hover ion-icon{
         color:white
    }
    .order .active{
         background: black!important;
      color: white;
    }
    .activeDay{
         color: darkmagenta;
    }
    #calendar h2{
      text-align: center;
    }
    .noneArrow{
        display: none;
    }
    @media screen and (max-width: 900px){
        .order td{
            padding: 5px 20%;
        }
    }
    @media screen and (max-width: 800px){
          .noneArrow{
               display: block;
           }
          #calendar, td{
             font-size: 15px;
          }
          .order td{
              font-size: 15px;
              padding: 5px 10px
          }
          .containerCalendar,.order td ion-icon,downCalendar{
              font-size: 15px;

          }
          .flex{
              display: none;
          }
          .order, .order td{
              display: none;
          }
          .orderActive{
              display: flex;
          }
          .orderActive td{
              display: table-cell;
          }
             .centerDay{
                 border-bottom: none
             }
          .activeTable{
              display: flex;

          }.active{
              display: flex;

          }
          tr .appartment{
              border: none;
          }
          .activeflex{
              display: flex;
              flex-wrap: wrap;
              width: 100%!important;
              text-align: center;
           }
          .activeflex order{
              display: flex;
          }
          .centerDay{
              display: none;
          }
          .activecenterDay{
              display: flex;
              align-items: center;
              justify-content: center;
          }
          .activecenterDay ion-icon{
              padding: 5px;
              background: deeppink;
              cursor: pointer;
              margin: 0 10px;
          }
          .downCalendar{
              display: block;
              border-bottom: 1px solid lightgray;
          }
          tr{
              border: none;
          }
          tr.appartment{
              justify-content: center;
          }
          .center {
              width: 100%;
          }
          tr .center {
              width: 100vw;
          }
    }
  @media screen and (max-width: 400px){
      .order td{
          padding: 5px;
     }
  }
</style>
