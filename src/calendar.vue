<template>
    <div id="calendar">
        <h2>Бронирование переговорок</h2>
        <div >
            <table class="containerCalendar ">
                <tr>
                    <td rowspan="2" colspan="2" class="center">Комнаты</td>
                    <td colspan="5" class="center">{{month}}</td>
                </tr>
                <tr>
                    <td v-for="dayOne in day" class="center">{{dayOne.number}} {{dayOne.day}}</td>
                </tr>
                <tr v-for="one in apartment">
                    <td colspan="2" class="appartment center">
                        <div>{{one.name}}</div>
                        <span>{{'('+one.inf+')'}}</span>
                    </td>
                    <td class="appartment" v-for="two in day">
                        <table class="order"  style="float: left" data="two.number">
                            <tr v-for="three in timeBefore13">
                                <td @click="time(three,one.name,two.day,two.number)"
                                    :class="{active:infOrder(three,one.name,two.day,two.number)}">
                                    {{three}}
                                    <ion-icon style="font-size: 12px" name="add"></ion-icon></td>
                            </tr>
                        </table>
                        <table class="order" style="float: right">
                            <tr v-for="three in timeAftere13">
                                <td @click="time(three,one.name,two.day,two.number)"
                                    :class="{active:infOrder(three,one.name,two.day,two.number)}">
                                    {{three}}
                                    <ion-icon style="font-size: 12px" name="add"></ion-icon></td>
                            </tr>
                        </table>
                        <div style="clear: both"></div>
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
        data () {
            return {
                month:'Июнь',
                day:[{day:'понедельник',number:null},
                    {day:'вторник',number:null},
                    {day:'среда',number:null},
                    {day:'четверг',number:null},
                    {day:'пятница',number:null}],
                apartment:[
                    {
                        name:'Зеленая',
                        inf:'до 5 персон'
                    },
                    {
                        name:'Красная',
                        inf:'до 15 персон'
                    },
                    {
                        name:'Синяя',
                        inf:'до 25 персон'
                    },
                    {
                        name:'Фиолетовая',
                        inf:'от 25 персон'
                    },
                ],
                timeBefore13:['09:00','10:00','11:00','12:00','13:00',],
                timeAftere13:['14:00','15:00','16:00','17:00','18:00',],
                count:1,
                mainArr:[],
                year: 2018,
                idOrder:null
            }
        },
        methods:{
            calendarBig:function(year) {
                for (let m = 0; m <= 11; m++) {
                    let D = new Date(year, [m], 1),
                        Dlast = new Date(D.getFullYear(), D.getMonth() + 1, 0).getDate(),
                        DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay(),
                        DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay()
                }
            },
            time(time,name,day,number){
                this.mainArr = JSON.parse(localStorage.getItem('arrOrders'))
                let itMonth = this.month
                let id_order = this.idOrder
                if(this.mainArr == null){
                    this.mainArr = []
                }
                let arr = {
                    year:2018,
                    month:itMonth,
                    day:day,
                    numberDay:number,
                    time:time,
                    name:name,
                    idOrder:id_order
                }
                this.mainArr.push(arr)
                localStorage.setItem('arrOrders',JSON.stringify(this.mainArr))
            },
            infOrder(time,name,day,number){
                if(this.mainArr != null){
                    for(let i = 0; i < this.mainArr.length;i++){
                        if(this.mainArr[i].month == this.month
                            && this.mainArr[i].year == this.year
                            && this.mainArr[i].day == day
                            && this.mainArr[i].numberDay == number
                            && this.mainArr[i].time == time
                            && this.mainArr[i].name == name
                            && this.mainArr[i].idOrder == this.idOrder){
                            return true
                        }
                    }
                }
            }
        },
        created(){
            this.idOrder = this.$router.history.current.params.id
            this.calendarBig(new Date().getFullYear());
            for(let i = 0;i< this.day.length;i++){
                this.day[i].number = this.count
                this.count++
            }
            this.mainArr = JSON.parse(localStorage.getItem('arrOrders'))
        },
    }
</script>

<style lang="scss">
    .calendar{
        width: 100%;
        padding: 20px;
        background: lightgray;
    }
    /*.containerCalendar{*/
        /*display: flex;*/
    /*}*/
    /*.col-month,.col-day{*/
        /*display: flex;*/
        /*justify-content: space-between;*/
    /*}*/
    /*.col-day div{*/
        /*padding: 10px;*/
    /*}*/
    /*.row{*/
        /*border-top:1px solid ;*/
    /*}*/
    .containerCalendar{
        border-collapse: collapse;
    }
    td{

    }
    /*td{*/
        /*border: 1px solid black;*/
    /*}*/
    tr .appartment{
        border: 1px solid lightgray;
        border-right:none;
        border-left: none;
    }
    tr .appartment:first-child{
        border-right:none;

    }
    tr .appartment:nth-child(2){
       border-left:none;
        /*border-collapse: collapse;*/
    }
    .center{
        text-align: center;
    }
    .order{
        background: lightgray;
        border-collapse: collapse;
    }
    td{
        cursor: pointer;
    }
    .order td ion-icon{
        color:lightgray
    }.order td:hover{
             background:white
    }.order td:hover ion-icon{
             color:grey
    }
    .active{
        background: red;
    }
</style>
