<template>
  <div class="look-project">
    <div class="title">
      <my-title :title="'房源详情'"></my-title>
    </div>
    <scroll ref="scroll" class="list" :beforeScroll="true" :data="msg">
      <div class="context">
        <div class="top">
          <p>{{projectName}} <span>{{roomid}}</span></p>
        </div>
        <div class="middle">
          <p class="needs-name" v-if="needName">
            {{needName}}
          </p>
          <div class="middle-t">
            <div>
              <p class="top">区域</p>
              <p class="btm">{{region}}</p>
            </div>
            <div>
              <p class="top">总价</p>
              <p class="btm" v-if="totalPrice">{{totalPrice + '万'}}</p>
            </div>
            <div>
              <p class="top">面积</p>
              <p class="btm" v-if="area">{{area + '㎡'}}</p>
            </div>
          </div>
          <div class="middle-tedian" v-if="features && features.length > 0">
            <p>
              <span :key="item" v-for="item in features">{{item}}</span>
            </p>
          </div>
          <div class="middle-m">
            <p>单价：<span :class="price !== '(未填)' ? 'store' : ''">{{price + '元'}}</span></p>
            <p>用途：<span :class="type !== '(未填)' ? 'store' : ''">{{type}}</span></p>
            <p>户型：<span :class="huxing !== '(未填)' ? 'store' : ''">{{huxing}}</span></p>
          </div>
          <div class="middle-m">
            <p>楼层：<span :class="floor !== '(未填)' ? 'store' : ''">{{floor}}</span></p>
            <p>装修：<span :class="decoration !== '(未填)' ? 'store' : ''">{{decoration}}</span></p>
            <p>朝向：<span :class="face !== '(未填)' ? 'store' : ''">{{face}}</span></p>
          </div>
          <div class="middle-m">
            <p>房龄：<span :class="roomAge !== '(未填)' ? 'store' : ''">{{roomAge}}</span></p>
            <p>电梯：<span :class="elevator !== '(未填)' ? 'store' : ''">{{elevator}}</span></p>
          </div>
        </div>
        <div class="bottom">
          <div class="bottom-t">
            <p>备注</p>
            <p>{{remark}}</p>
          </div>
          <div class="bottom-b">
            <p class="flex-1">发布于：<span>{{createTime}}</span></p>
            <p class="flex-1">发布人：<span>{{brokerName}}</span></p>
            <p class="send-btn" v-if="brokerPhone && isMy === 0" @click="telPhone(brokerPhone)"><span class="btn bgc" >联系TA <img :src="contactphone" alt=""></span></p>
            <p class="send-btn" v-else-if="brokerPhone" @click="stop" ><span class="btn bgc" >停止需求</span></p>
            <p class="send-btn" v-else></p>
          </div>
        </div>
      </div>
    </scroll>
    <confirm ref="confirm" :text="confirmText" ></confirm>
    <router-link :to="operate !== '1' ? '/secondaddkeyuan' : '/secondaddfangyuan'" ref="addImg" class="add-img" @click="addKeyuan">
      <img v-if="operate !== '1'" :src="fabukeyuanImg" alt="">
      <img v-else :src="fabufangyuanImg" alt="">
    </router-link>
  </div>
</template>
<script>
import MyTitle from 'base/title/title'
import Scroll from 'base/scroll/scroll'
import Confirm from 'base/confirm/confirm'
import { getRoomDetails, updateClientSourceStatus } from 'api/details'
export default {
  data () {
    return {
      contactphone: require('common/image/contactphone.png'),
      fabukeyuanImg: require('common/image/sendkeyuanyuanbtn.jpg'),
      fabufangyuanImg: require('common/image/sendfangyuanbtn.jpg'),
      phone: this.$route.query.phone,
      name: this.$route.query.name,
      operate: this.$route.query.operate,
      confirmText: '',
      region: '',
      totalPrice: '',
      area: '',
      features: [],
      price: '',
      type: '',
      huxing: '',
      floor: '',
      decoration: '',
      face: '',
      roomAge: '',
      remark: '',
      createTime: '',
      brokerName: '',
      projectName: '',
      brokerPhone: '',
      elevator: '',
      roomid: '',
      isMy: '',
      id: ''
    }
  },
  created () {
    this._getRoomDetails()
  },
  methods: {
    telPhone (phone) {
      if (!phone) return
      window.location.href = `tel:${phone}`
    },
    stop() {
      this.confirmText = '确定停止此项目？'
      this.$refs.confirm.show()
    },
    confirm() {
      if (this.confirmText === '确定停止此项目？') {
        updateClientSourceStatus({id: this.roomid, operate: this.operate, status: 0}).then(res => {
          if (res.data.code === 0) {
            this.confirmText = '停止成功！'
            this.$refs.confirm.show()
            this.brokerPhone = null
          }
        })
      }
    },
    _getRoomDetails () {
      getRoomDetails({phone: this.phone, name: this.name}).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          if (res.data.data == null) {
            this.confirmText = '参数错误'
            this.$refs.confirm.show()
            return
          }
          const data = res.data.data
          this.region = data.region
          this.totalPrice = data.totalPrice
          this.area = data.area
          this.features = data.features
          this.price = data.price || '(未填)'
          this.type = data.type || '(未填)'
          this.huxing = data.huxing || '(未填)'
          this.floor = data.floor || '(未填)'
          this.decoration = data.decoration || '(未填)'
          this.face = data.face || '(未填)'
          this.roomAge = data.roomAge || '(未填)'
          this.remark = data.remark || '(未填)'
          this.createTime = data.createTime || '(未填)'
          this.brokerName = data.brokerName || '(未填)'
          this.projectName = data.name || '(未填)'
          this.brokerPhone = data.brokerPhone || '(未填)'
          this.elevator = data.elevator || '(未填)'
          this.roomid = data.roomid
          this.isMy = data.isMy
        }
      })
    }
  },
  components: {
    MyTitle,
    Scroll,
    Confirm
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.look-project
  position: fixed
  width: 100%
  bottom: 0
  height: 100%
  background: #eee
  font-size: $font-size-medium
  .title
    position: fixed
    z-index: 88
    width: 100%
    text-align: center
    line-height: 40px
    font-size: $font-size-large-x
    color: white
    top: 0
  .list
    position: fixed
    top: 0
    bottom: 125px
    width: 100%
    padding-top: 50px
    .context
      .top
        padding: 0 10px
        background: #fff
        line-height: 60px
        font-size: $font-size-large
        p
          text-align: center
          color: #a7a7a7
          span
            width: 5.5rem
            overflow: hidden
            color: #a7a7a7
            position: absolute
            font-size: $font-size-small
            top: 0
            right: 10px
      .middle
        background: #fff
        p
          color: #a7a7a7
      .needs-name
        text-align: center
        line-height: 40px
      .middle-t
        display:flex
        border-top: 1px solid #ccc
        border-bottom: 1px solid #ccc
        padding: 10px 0
        div
          width: 33%
          border-right: 1px solid #ccc
          text-align: center
          line-height: 25px
          &:last-child
            border-right: none
          .top
            font-size: $font-size-medium-x
            color: #6c6c6c
            line-height: 30px
          .btm
            font-size: $font-size-medium-x
            line-height: 30px
            color: #f77428
      .middle-tedian
        padding: 20px 10px
        border-bottom: 1px solid #ccc
        p
          font-size: $font-size-large-x
          color: #000
          span
            display: inline-block
            border: 1px solid #0096ff
            color: #0096ff
            font-size: $font-size-small
            padding: 5px
            margin-right: .12rem
            margin-bottom: 5px
            line-height: 18px
      .middle-m
        display:flex
        padding: 0 10px
        p
          width: 33%
          line-height: 50px
          span
            color: #6c6c6c
          .store
            color: #000
            font-weight: 800
      .bottom-t
        margin: 10px 0
        padding: 10px 10px
        background: #fff
        p:first-child
          line-height: 35px
        p:last-child
          text-indent: 1em
          line-height: 17px
          color: #a7a7a7
      .bottom-b
        display: flex
        margin: 10px 0
        padding: 10px 10px
        background: #fff
        .flex-1
          flex: 2
          color: #a7a7a7
          line-height: 35px
          no-wrap()
          &:last-child
            line-height: 35px
            text-align: right
          span
            color: #6c6c6c
          .send-btn
            flex: 1
        .btn
          display: inline-block
          padding: 5px 10px
          line-height: 25px
          border-radius: 3px
        .bgc
          background: #fe5d00
          color: #fff
          img
            width: 12px
  .add-img
    position: fixed
    bottom: -2px
    transition: all .3s
    img
      width: 100%
</style>
