
function sent(axios,url,objLogin){
  const instance = axios.create({
    baseURL: 'http://ec2-54-88-87-181.compute-1.amazonaws.com:8889',
  });
  console.log(objLogin)
  instance.get(
    {
      username: objLogin.username,
      email: objLogin.email,
      password: objLogin.password
    })
    .then(response => {
      console.log(response)
    })
    .catch(response => {
      console.log(response.response)
      this.errored = true;
    })
}

let  data = {
  nameMonth: [
    {month: "Jan", number:1}, {month: "Feb",number:2}, {month: "Mar",number:3}, {month: "Apr",number:4},
    {month: "May",number:5}, {month: "Jun",number:6}, {month: "Jul",number:7}, {month: "Aug",number:8},
    {month: "Sep",number:9}, {month: "Oct",number:10}, {month: "Nov",number:11}, {month: "Dec",number:12}
  ],
  star:[{one:5, two:0}, {one:4, two:1}, {one:3, two:2}, {one:2, two:3}, {one:1,two:4},],
  objNumber:[{name:'one', number:1},{name:'two', number:2},{name:'three', number:3},{name:'four', number:4},{name:'five', number:5}],
  lists:['Tickets','Service','ОAbout us','File','Vacancy','Hot tour', 'Information'],
  sdolialLofo:['logo-vk','logo-facebook','logo-skype', 'logo-instagram'],
  timeBefore13: ['09:00', '10:00', '11:00', '12:00', '13:00',],
  timeAftere13: ['14:00', '15:00', '16:00', '17:00', '18:00',],

}
