<template>
    <div id="calendar">
        <h2>Бронирование переговорок</h2>
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
                        :class="{activeDay:indexDay == index?true:false,activecenterDay:index == its2?true:false}">
                        <ion-icon name="arrow-round-back" class="noneArrow" @click="dayChange('-')"></ion-icon>
                        {{dayOne.number}} {{dayOne.day}}
                        <ion-icon name="arrow-round-forward" class="noneArrow" @click="dayChange('+')"></ion-icon>
                    </td>
                </tr>
                <tr class="downCalendar" v-for="(one,index) in apartment">
                    <td colspan="2" class="appartment center nameApartment" @click="change(index)"
                        :style="{color:one.background}">
                        <div>{{one.name}}</div>
                        <span style="color: darkgrey">{{'('+one.inf+')'}}</span>
                    </td>
                    <td class="appartment flex" v-for="(two,index2) in day"
                        :class="{activeflex:index2 == its2?true:false}">
                        <table class="order" :class="{orderActive:its == index?true:false}">
                            <tr v-for="three in timeBefore13">
                                <td @click="time(three,one.name,two.day,two.number)"
                                    :class="{active:infOrder(three,one.name,two.day,two.number)}">
                                    {{three}}
                                    <ion-icon style="font-size: 12px" name="add"></ion-icon>
                                </td>
                            </tr>
                        </table>
                        <table class="order" :class="{orderActive:its == index?true:false}">
                            <tr v-for="three in timeAftere13">
                                <td class="activeOrder" @click="time(three,one.name,two.day,two.number)"
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
    import  footer from './work/footer.vue'
    import  header from './work/header.vue'
    import  navbar from './work/navbar.vue'
    export default {
          name: 'app',
              data() {
                    return {
                          month: 'Июнь',
                          allMonth: [
                            {month: "Jan",}, {month: "Feb"}, {month: "Mar"}, {month: "Apr"}, {month: "May"}, {month: "Jun"},
                            {month: "Jul"}, {month: "Aug"}, {month: "Sep"}, {month: "Oct"}, {month: "Nov"}, {month: "Dec"}
                          ],
                          day: [
                                {day: 'понедельник', number: null}, {day: 'вторник', number: null}, {day: 'среда', number: null},
                                {day: 'четверг', number: null}, {day: 'пятница', number: null}
                            ],
                          indexDay: null,
                          apartment: [
                                {
                                      name: 'Зеленая',
                                      background:'green',
                                      inf: 'до 5 персон'
                                },
                                {
                                      name: 'Красная',
                                      background:'red',
                                      inf: 'до 15 персон'
                                },
                                {
                                      name: 'Синяя',
                                      background:'blue',
                                      inf: 'до 25 персон'
                                },
                                {
                                      name: 'Оранжевая',
                                      background:'orange',
                                      inf: 'до 50 персон'
                                },{
                                      name: 'Фиолетовая',
                                      background:'#purple',
                                      inf: 'от 50 персон'
                                },
                          ],
                          timeBefore13: ['09:00', '10:00', '11:00', '12:00', '13:00',],
                          timeAftere13: ['14:00', '15:00', '16:00', '17:00', '18:00',],
                          count: 1,
                          mainArr: [],
                          year: 2018,
                          idOrder: null,
                          thisDay: null,
                          start:7,
                          steps:12,
                          step:7,
                          monthes:null,
                          its:1,
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
                        week(monthes,step,simvol){
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
                                    arr.push(this.allMonth[monthes].days[i].day);
                              }
                              for(let j = 0;j < 5;j++){
                                    let number = arr[j]
                                    this.day[j].number = number;
                              }
                        },
                        calendarBig: function (year, month, day) {
                              this.monthes = month;
                              this.indexDay = day - 1;
                              this.month = this.allMonth[month].month;
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
                              this.week(month);

                        },
                        time(time, name, day, number) {
                              this.mainArr = JSON.parse(localStorage.getItem('arrOrders'));
                              let itMonth = this.month;
                              let id_order = this.idOrder;
                              if (this.mainArr == null) {
                                    this.mainArr = [];
                              }
                              let arr = {
                                    year: 2018,
                                    month: itMonth,
                                    day: day,
                                    numberDay: number,
                                    time: time,
                                    name: name,
                                    idOrder: id_order
                              }
                              let sent = confirm('Bы подтверждаете данные?' + JSON.stringify(arr));
                              if (sent == true) {
                                    this.mainArr.push(arr);
                                    localStorage.setItem('arrOrders', JSON.stringify(this.mainArr));
                              }
                              else {
                                    return;
                              }
                        },
                        infOrder(time, name, day, number) {
                              if (this.mainArr != null) {
                                    for (let i = 0; i < this.mainArr.length; i++) {
                                          if (this.mainArr[i].month == this.month
                                            && this.mainArr[i].year == this.year
                                            && this.mainArr[i].day == day
                                            && this.mainArr[i].numberDay == number
                                            && this.mainArr[i].time == time
                                            && this.mainArr[i].name == name
                                            && this.mainArr[i].idOrder == this.idOrder) {
                                            return true;
                                  }
                        }
                  }
              }
          },
          created() {
                this.year == new Date().getFullYear();
                this.idOrder = this.$router.history.current.params.id;
                this.thisDay = Number(String(new Date()).split(' ')[2]);
                this.calendarBig(this.year, new Date().getMonth(), new Date().getDay());
                this.mainArr = JSON.parse(localStorage.getItem('arrOrders'));
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
         background:#077849;
    }
    .order td:hover ion-icon{
         color:white
    }
    .order .active{
         background: crimson;
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
