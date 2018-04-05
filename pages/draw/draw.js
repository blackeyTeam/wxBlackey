//index.js
//获取应用实例
var app = getApp()
console.log(app)
Page({
    data: {
      timer: '',
      index: 0,
      round: 0,
      turn: 100,
      result: -1,
      delay: 150,
      running: false
    },
    onLoad: function () {
        
    },
    //开始抽奖
    run() {
      if(!this.data.running){
        this.data.running = true
        this.data.round = 0
        this.data.turn = 100
        this.data.delay = 150
        setTimeout(()=>{
          this.data.result = 3
        },2000)
        this.startDraw()
      }
    },
    startDraw: function () {
      clearInterval(this.data.timer)
      this.data.timer = setInterval(()=>{
        this.setData({
          index: this.data.index+1
        })
        if(this.data.index>7) {
          this.setData({
            index: 0
          })
          this.data.round++
        }
        if(this.data.round === 1 && this.data.delay === 150) {
          this.data.delay = 50
          this.startDraw()
        }
        if(this.data.round > 2 && this.data.result >= 0){
          if(this.data.delay === 50 &&this.data.index === this.data.result) {
            this.data.turn = this.data.round
          }
          if((this.data.round * 8 + this.data.index) > (this.data.turn * 8 + this.data.result)) {
            this.data.delay += 100
            this.startDraw()
            if (this.data.index === this.data.result) {
              this.data.running = false
              clearInterval(this.data.timer)
              let gift = parseInt(this.data.result) + 1
              wx.showModal({
                title: '恭喜你',
                content: '获得了奖品' + gift,
              })
              return
            }
          }
        }
      },this.data.delay)
    }
})