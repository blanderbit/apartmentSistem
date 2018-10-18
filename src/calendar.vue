<template>
    <div id="calendar">
        <h2>Booking appartments</h2>
        <v-date-picker
                v-model="date"
                full-width
                landscape="false"
                class="onePiker mt-3"
                color="blue"
        ></v-date-picker>
        {{date}}
        <v-date-picker class="twoPiker" v-model="date" color="blue" :landscape="landscape" :reactive="reactive">

        </v-date-picker>
        <v-data-table
                :headers="headers"
                :items="apartment"
                hide-actions
                item-key="name"
        >
            <template slot="items" slot-scope="props">
                <tr>
                    <td style="width: 170px" :style="{color:props.item.color}">{{ props.item.name }}<span>{{ props.item.inf }}</span></td>
                    <div style="display: flex;flex-wrap: wrap;justify-content: flex-start">
                        <td class="text-xs-right table" style="flex: 1 1 auto;" v-for="tone in props.item.time">
                            <v-btn style="cursor: pointer"
                            @click="time(date,tone,props.item.color)"
                            :class="{active:infOrder(date,tone,props.item.color)}">{{ tone }}</v-btn></td>
                    </div>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    export default {
          name: 'app',
          props:['reverse'] ,
          data() {
                return {
                    date: '2018-10-17',
                      indexDay: null,
                      apartment: [
                            {
                                  name: 'Green',
                                  color:'green',
                                  inf: 'Before 5 person',
                                  time:data.timeBefore13.concat(data.timeAftere13)
                            },
                            {
                                  name: 'Red',
                                  color:'red',
                                  inf: 'Before 10 person',
                                  time:data.timeBefore13.concat(data.timeAftere13)

                            },
                            {
                                  name: 'Blue',
                                  color:'blue',
                                  inf: 'Before 15 person',
                                  time:data.timeBefore13.concat(data.timeAftere13)

                            },
                            {
                                  name: 'Orange',
                                  color:'orange',
                                  inf: 'Before 20 person',
                                  time:data.timeBefore13.concat(data.timeAftere13)

                            },{
                                  name: 'Purple',
                                  color:'rebeccapurple',
                                  inf: 'Before 25 person',
                                  time:data.timeBefore13.concat(data.timeAftere13)
                          },
                      ],
                      count: 1,
                      mainArr: JSON.parse(localStorage.getItem('arrOrders')),
                      year: 2018,
                      idOrder: null,
                      thisDay: null,
                    }
              },
              methods: {
                  time(data,time, name) {
                      let hour = Number(time.substr(0,2))
                      let dataClick = this.date.split('-')
                      let sentData = new Date(dataClick[0], Number(dataClick[1]) -1 , dataClick[2],hour)
                      let obj = {
                          data:String(sentData),
                          name: name,
                          order: this.idOrder,
                          user: sessionStorage.getItem('idUser')
                      }
                      let sent =  JSON.stringify(obj)

                      let active = event.currentTarget.classList.contains('active')
                      if(active == true){
                          let position = this.remove(sent,time)
                          this.$emit('object',[sent,true,'Remove',position])
                          this.open()
                      } else {
                          this.$emit('object',[sent,true,'Add'])
                          this.open()
                      }
                  },
                  remove(value,number){
                      let information = JSON.parse(value)
                      for (let i = 0; i < this.mainArr.length; i++) {
                          if (this.mainArr[i].data == information.data
                              && this.mainArr[i].name == information.name
                              && this.mainArr[i].user == sessionStorage.getItem('idUser')
                              && this.mainArr[i].order == this.idOrder) {
                              return i;
                          }
                      }
                  },
                  infOrder(data,time, name) {
                      let hour = Number(time.substr(0,2))
                      let dataClick = this.date.split('-')
                      let sentData = new Date(dataClick[0], Number(dataClick[1]) -1, dataClick[2],hour)
                      if (this.mainArr != null) {
                          for (let i = 0; i < this.mainArr.length; i++) {
                              if (this.mainArr[i].data == sentData
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
                let data = String(new Date()).split(' ')
                let dataD = data[2]
                let dataM = new Date().getMonth() + 1
                let finishDataM = dataM < 10? '0'+String(dataM):String(dataM)
                let dataY = data[3]
                this.date = dataY + '-' + finishDataM+  '-' +dataD
                this.idOrder = this.$router.history.current.params.id;
              },
              watch:{
                  reverse:function(value){
                       this.mainArr = JSON.parse(value)
                  }
            },
        }
</script>

<style lang="scss">
    .text-xs-right, .table{
        padding: 0!important;
    }
    .v-btn{
        flex: 1 1 auto;
    }
    .active{
        background: red!important;
    }
    .twoPiker{
      display: none;
    }
  @media screen and (max-width: 450px){
    .onePiker{
      display: none;
    }.twoPiker{
      display: block;
    }
  }
</style>
