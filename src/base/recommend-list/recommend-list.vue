<template>
  <div class="recommend-list-right">
    <ul  @click="goDetail({phone: childItem.phone, name: childItem.name, operate: 1})"  :key="childItem.name" v-for="childItem in projectList" class="list">
      <li class="left">
        <div v-if="childItem.suitability" class="matching">
          <p>{{childItem.suitability}}分</p>
        </div>
        <p class="describe">{{childItem.remark}}</p>
        <p class="name"><span>{{childItem.region}}</span><span>{{childItem.huxing}}</span><span v-if="childItem.area">{{childItem.area + '㎡'}}</span></p>
        <p class="addr"><span>{{childItem.name}}</span><span>{{childItem.type}}</span></p>
        <p class="type"><span :key="features" v-if="features" v-for="features in childItem.features">{{features}}</span></p>
      </li>
      <li class="right">
        <p class="total-price" v-if="childItem.totalPrice">{{childItem.totalPrice + '万'}}</p>
        <p class="price">{{childItem.price + '元/㎡'}}</p>
        <p class="send" @click.stop.prevent="telPhone(childItem.call)"><span class="btn bgc" >联系TA <img :src="contactphone" alt=""></span></p>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import TYPE from 'common/js/buryingpointType'
import { addLog } from 'api/buryingpoint'
export default {
  props: {
    projectList: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      contactphone: require('common/image/contactphone.png'),
      isMy: require('common/image/myfangyuan.png')
    }
  },
  methods: {
    telPhone(phone) {
      addLog(TYPE.FANGYUANPAGE, TYPE.FANGYUANLISTPAGE, TYPE.LISTPAGENBTN, '', window.USERMSG)
      if (!phone) return
      window.location.href = `tel:${phone}`
    },
    goDetail(data) {
      addLog(TYPE.FANGYUANPAGE, TYPE.FANGYUANLISTPAGE, TYPE.LISTITEM, TYPE.FANGYUANDETAILPAGE, window.USERMSG)
      this.$router.push({
        path: '/seconddetail',
        query: data
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .recommend-list-right
    border-top: 1px solid #ccc
    .list
      border-bottom: 1px solid #dcdcdc
      padding: 10px
      display: flex
      .left
        flex: 3
        max-width: 72%
        min-width: 72%
        overflow: hidden
        position: relative
        .matching
          position: absolute
          right: 0
          top: 20px
          border-radius: 50%
          overflow: hidden
          border: 1px solid #f7722a
          width: 55px
          height: 55px
          box-sizing: border-box
          text-align: center
          font-size: $font-size-medium
          p
            line-height: 55px
            color: #f7722a
        >p
          line-height: 25px
          color: #8a8a8a
        .describe
          color: black
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
        .name, .addr
          display: flex
        .name
          span
            font-weight: 900
            color: black
            margin-right: 10px
        .addr
          span
            margin-right: 15px
            &:last-child
              min-width: 2rem
        .type
          span
            display: inline-block
            font-size: $font-size-small-s
            padding: 5px
            margin: 2px
            line-height: 1
            color: #0096ff
            border: 1px solid #0096ff
      .right
        min-width: 28%
        max-width: 28%
        padding-top: 25px
        text-align: right
        position: relative
        no-wrap()
        .total-price
          color: #fe5d00
          font-size: $font-size-large-x
          line-height: 30px
        .is-my
          position: absolute
          top: -13px
          right: 5px
          img
            width: 35px
        .price
          color: #8a8a8a
        .send
          .btn
            margin: 10px 0
            display: inline-block
            padding: 3px 7px
            line-height: 25px
            border-radius: 3px
          .bgc
            background: #fe5d00
            color: #fff
            img
              width: 12px
</style>
