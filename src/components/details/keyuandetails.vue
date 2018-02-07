<template>
  <div class="look-project">
    <div class="title">
      <my-title :title="'客源详情'"></my-title>
    </div>
    <scroll ref="scroll" class="list" :beforeScroll="true" :data="msg">
      <div class="context">
        <div class="top">
          <p class="left">购买倾向:</p>
          <p class="center"><span>二手</span></p>
          <p class="right">{{id}}</p>
        </div>
        <div class="middle">
          <p class="needs-name" v-if="needName">
            {{needName}}
          </p>
          <div class="middle-t">
            <div>
              <p>区域</p>
              <p>{{this.region}}</p>
            </div>
            <div>
              <p>总价</p>
              <p>{{totalPrice}}万</p>
            </div>
            <div>
              <p>面积</p>
              <p v-if="area">{{area + '平'}}</p>
            </div>
          </div>
          <div class="middle-m">
            <p>户型：<span :class="huxing !== '(未填)' ? 'store' : ''">{{huxing !== '(未填)' ? huxing + '居' : huxing}}</span></p>
            <p>用途：<span :class="type !== '(未填)' ? 'store' : ''">{{type}}</span></p>
            <p>装修：<span :class="decoration !== '(未填)' ? 'store' : ''">{{decoration}}</span></p>
          </div>
          <div class="middle-m">
            <p>楼层：<span :class="floor !== '(未填)' ? 'store' : ''">{{floor}}</span></p>
            <p>首付：<span :class="price !== '(未填)' ? 'store' : ''">{{price !== '(未填)' ? price + '万' : price}}</span></p>
          </div>
          <div class="middle-m">
            <p>社保：<span :class="ensure !== '(未填)' ? 'store' : ''">{{ensure}}</span></p>
            <p>户籍：<span :class="census !== '(未填)' ? 'store' : ''">{{census}}</span></p>
          </div>
        </div>
        <div class="bottom">
          <div class="bottom-t">
            <p>备注</p>
            <p>{{msg}}</p>
          </div>
          <div class="bottom-b">
            <p class="flex2">发布于：<span>{{createtime}}</span></p>
            <p class="flex1">发布人：<span>{{brokerName}}</span></p>
            <p class="flex1" v-if="brokerPhone && isMy === 0" @click="telPhone(brokerPhone)"><span class="btn bgc" >联系TA <img :src="contactphone" alt=""></span></p>
            <p class="flex1" v-else-if="brokerPhone" @click="stop" ><span class="btn bgc" >停止需求</span></p>
            <p class="flex1" v-else>已停止</p>
          </div>
        </div>
      </div>
    </scroll>
    <confirm ref="confirm" :text="confirmText" @confirm="confirm"></confirm>
    <router-link :to="operate === '1' ? '/secondaddkeyuan' : '/secondaddfangyuan'" ref="addImg" class="add-img" @click="addKeyuan">
      <img v-if="operate === '1'" :src="fabukeyuanImg" alt="">
      <img v-else :src="fabufangyuanImg" alt="">
    </router-link>
  </div>
</template>
<script>
import MyTitle from 'base/title/title'
import Scroll from 'base/scroll/scroll'
import Confirm from 'base/confirm/confirm'
import { getsourcedetails, updateClientSourceStatus } from 'api/keyuandetails'
export default {
  data () {
    return {
      contactphone: require('common/image/contactphone.png'),
      fabukeyuanImg: require('common/image/sendkeyuanyuanbtn.jpg'),
      fabufangyuanImg: require('common/image/sendfangyuanbtn.jpg'),
      id: this.$route.query.id,
      operate: this.$route.query.operate,
      confirmText: '',
      region: '',
      totalPrice: '',
      area: '',
      price: '',
      huxing: '',
      isMy: '',
      brokerName: '',
      brokerPhone: '',
      type: '',
      scale: '',
      room: '',
      census: '',
      floor: '',
      ensure: '',
      decoration: '',
      msg: '',
      createtime: '',
      needName: null
    }
  },
  created () {
    this._getsourcedetails()
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
        updateClientSourceStatus({id: this.id, operate: this.operate, status: 0}).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.confirmText = '停止成功！'
            this.$refs.confirm.show()
            this.brokerPhone = null
          }
        })
      }
    },
    _getsourcedetails () {
      getsourcedetails({id: this.id}).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          console.log(res.data)
          if (res.data.data == null) {
            this.confirmText = '参数错误'
            this.$refs.confirm.show()
            return
          }
          this.region = res.data.data.region
          this.area = res.data.data.area
          this.totalPrice = res.data.data.totalPrice
          this.price = res.data.data.price || '(未填)'
          this.type = res.data.data.type
          this.huxing = res.data.data.huxing || '(未填)'
          this.isMy = res.data.data.isMy
          this.scale = res.data.data.scale ? res.data.data.scale + '万' : '(未填)'
          this.room = res.data.data.room || '(未填)'
          this.census = res.data.data.census || '(未填)'
          this.floor = res.data.data.floor || '(未填)'
          this.ensure = res.data.data.ensure || '(未填)'
          this.decoration = res.data.data.decoration || '(未填)'
          this.msg = res.data.data.remark
          this.createtime = res.data.data.createTime
          this.brokerName = res.data.data.brokerName
          this.brokerPhone = res.data.data.brokerPhone
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
.look-project
  position: fixed
  width: 100%
  bottom: 0
  height: 100%
  z-index: 10000
  background: #eee
  font-size: $font-size-medium
  .title
    position: fixed
    z-index: 10002
    width: 100%
    text-align: center
    line-height: 40px
    font-size: $font-size-large-x
    color: white
    top: 0
  .list
    position: fixed
    top: 0
    bottom: 55px
    width: 100%
    padding-top: 50px
    .context
      .top
        padding: 15px 10px 5px 10px
        display: flex
        margin-bottom: 10px
        color: #a7a7a7
        .left
          width: 20%
        .center
          width: 20%
          span
            background: #f77428
            color: #ffffff
            padding: 3px 15px
        .right
          width: 60%
          text-align: right
      .middle
        background: #fff
        p
          color: #a7a7a7
      .needs-name
        text-align: center
        line-height: 40px
      .middle-t
        display:flex
        padding: 10px 0
        border-top: 1px solid #ccc
        border-bottom: 1px solid #ccc
        >div
          width: 33%
          border-right: 1px solid #ccc
          text-align: center
          line-height: 25px
          &:last-child
            border-right: none
          p
            color: #6c6c6c
            &:last-child
              color: #f77428
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
        .flex2
          flex: 9
        .flex1
          flex: 7
        p
          color: #a7a7a7
          line-height: 35px
          &:last-child
            line-height: 35px
            text-align: right
          span
            color: #6c6c6c
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
