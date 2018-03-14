<template>
  <div>
    <div class="project-list" v-if="projectList.length">
        <ul>
          <li :key="item.sourceid" class="item" v-for="item in projectList">
            <div @click="goDetail({id: item.sourceid, operate: 2})" >
              <div class="item-top">
                <p class="left">需求名称： <span>{{item.sourceid}}</span></p>
                <p class="right">{{item.date}}</p>
                <div class="ismy" v-if="item.ismy === 1">
                  <img :src="isMy" alt="">
                </div>
              </div>
              <div class="item-center">
                <div class="left">
                  <p class="describe">目标区域：<span>{{item.addr}}</span></p>
                  <p class="describe">需求面积：<span v-if="item.area">{{item.area + '㎡'}}</span></p>
                  <p class="describe">{{item.remark}}</p>
                </div>
                <div class="right">
                  <p class="total-price">{{item.totalPrice + '万'}}</p>
                  <p class="type">{{item.type}}</p>
                  <p class="send" v-if="item.phone" @click.stop.prevent="telPhone(item.phone)"><span class="btn bgc" >联系TA <img :src="contactphone" alt=""></span></p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
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
      },
      mark: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        secondhousegou: require('common/image/secondhousegou.png'),
        contactphone: require('common/image/contactphone.png'),
        isMy: require('common/image/ismy.png'),
        remark: 1
      }
    },
    methods: {
      sendMsg (id) {
        this.$emit('alertMsg', id)
      },
      telPhone(phone) {
        addLog(TYPE.KEYUANPAGE, '', TYPE.LISTPAGENBTN, '', window.USERMSG)
        if (!phone) return
        window.location.href = `tel:${phone}`
      },
      goDetail(data) {
        addLog(TYPE.KEYUANPAGE, '', TYPE.KEYUANLIST, TYPE.KEYUANDETAIL, window.USERMSG)
        this.$router.push({
          path: '/secondkeyuandetail',
          query: data
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .project-list
    .item
      background: #fff
      margin: 0 10px 10px 10px
      border: 1px solid #d6d6d7
      border-radius: 3px
      .item-top
        background: #d6d6d7
        display: flex
        padding: 0 10px
        position: relative
        .left, .right
          line-height: 3
          font-size: $font-size-medium
          no-wrap()
          width: 65%
          span
            color: #f26b3d
        .right
          width: 35%
          text-align: right
        .ismy
          position: absolute
          left: -3px
          top: -3px
          img
            width: 40px
    .item-center
      display: flex
      .left
        width: 65%
        min-width: 65%
        max-width: 65%
        padding: 10px 0 10px 10px
        .describe
          line-height: 25px
          color: #8a8a8a
          no-wrap()
          span
            color: #000
      .right
        width: 35%
        min-width: 35%
        max-width: 35%
        text-align: center
        position: relative
        .total-price
          color: #fe5d00
          font-size: $font-size-large
          line-height: 30px
        .type
          color: #8a8a8a
        .is-my
          position: absolute
          top: -13px
          right: 5px
          img
            width: 35px
        .send
          .btn
            margin: 10px 0
            display: inline-block
            padding: 3px 12px
            line-height: 25px
            border-radius: 3px
          .bgc
            background: #fe5d00
            color: #fff
            img
              width: 12px
</style>
