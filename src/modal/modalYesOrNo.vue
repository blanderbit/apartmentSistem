<template>
    <div class="modal" :class="{active_modal:container}">
        <div style="position:relative" v-if="token == true?true:false">
            <ion-icon name="close" class="close" @click="close"></ion-icon>
            <h1>
                <slot name="h1"></slot>
            </h1><br>
            <p>
                <slot name="information"></slot>
            </p>
            <a href="#" @click.prevent="trues(value)">
                <slot name="a">True</slot>
              ?
            </a>
        </div>
        <div style="position:relative" v-if="token != true?true:false">
            <ion-icon name="close" class="close" @click="close"></ion-icon>
            <h3>This is important!</h3>
            <p>Only registered users can book a room!</p>
            <div style="display: flex">
                <a href="#" style="margin-bottom: 10px" @click.prevent="to('login')">Sign in</a>
                <a href="#" @click.prevent="to('registration')">Registration</a>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
      name: 'app',
      props: ['value', 'activeContainer', 'remove', 'newTok'],
      data() {
          return {
              container: false,
              objActive: null,
              mainArr: [],
              position: null,
              token: null,
          }
      },
      methods: {
          close: function () {
              let overlow = document.querySelector('html')
              overlow.style.overflowY = 'scroll'
              this.$emit('reverseContainer', false)
              this.container = false;
          },
          trues(value) {
              let arr = Array.isArray(this.position)

              if (arr == true && this.position.length > 1) {
                  let number = this.position[1]
                  this.mainArr.splice(number, 1)
                  localStorage.setItem('arrOrders', JSON.stringify(this.mainArr));
                  this.$emit('reversData', localStorage.getItem('arrOrders'))
                  this.close()
                  return
              }
              let obj = JSON.parse(value)
              this.mainArr.push(obj);
              localStorage.setItem('arrOrders', JSON.stringify(this.mainArr));
              this.$emit('reversData', localStorage.getItem('arrOrders'))
              this.$emit('reverseContainer', false)
              this.close()

          }
      },
      created() {
          this.token = sessionStorage.getItem('token') != null ? true : false
          this.mainArr = JSON.parse(localStorage.getItem('arrOrders'));
          if (this.mainArr == null) {
               this.mainArr = [];
          }
      },
      watch: {
          newTok: function (value) {
              this.token = value;
          },
          activeContainer: function (value) {
              this.container = value
          },
          remove: function (value) {
              this.position = value
          }
      }
  }
</script>


<style lang="scss">
    .modal {
        z-index: 1500;
        position: fixed;
        padding: 0;
        width: 0;
        height: 0;
        font-size: 0;
        top: 50%;
        left: 50%;
        transition: all 1s;
        display: flex;
        color:#448aff;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }

  .modal {
      div {
          transition: all 1s;
          background: white;
          padding: 0;
          width: 0;
          font-size: 0;
          display: flex;
          align-items: center;
          flex-direction: column;
          box-shadow:1px 1px 1px 2px rgba(0, 0, 0, 0.3) inset;
      }
      h3 {
          margin-bottom: 0;
      }
      a {
          width: 0;
          padding: 0;
          background: #448aff;
          color: white;
          border-radius: 10px;
          text-decoration: none;
          text-align: center;
          transition: all 1s;
          font-size: 0;
      }

      a:hover {
         background: darkblue;
      }
      p {
          width: 0;
          font-size: 0;
          text-align: center;
          word-wrap: break-word;
          transition: all 1s;
      }
  }

  .active_modal {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.56);
    top: 0;
    left: 0;
    margin: 0 0 0 0;
  }

  .active_modal {
      div {
          padding: 20px;
          width: 40vw;
          font-size: 14px;
      }
      p {
          width: 40vw;
          font-size: 15px;
      }
      a {
          width: 200px;
          padding: 10px;
          font-size: 15px;
      }
  }
  @media screen and (max-width: 420px) {
      .active_modal {
          div {
              font-size: 10px;
              width: 70vw;
          }
          p {
            width: 70vw;
          }
      }
  }

  @media screen and (max-width: 720px) {
      .active_modal {
          div {
              font-size: 10px;
              width: 90vw;
          }
          p {
              width: 100vw;
          }
      }
  }
</style>
