<template>
  <div class="recommend-list-right">
    <router-link tag="ul" :to="{path: '/detail', query: {phone: childItem.phone, name: childItem.name, operate: 1 }}" :key="childItem.name" v-for="childItem in projectList" class="list">
      <li class="left">
        <p class="describe">{{childItem.remark}}</p>
        <p class="name"><span>{{childItem.region}}</span><span>{{childItem.huxing}}</span><span>{{childItem.area}}</span></p>
        <p class="addr"><span>{{childItem.name}}</span><span>{{childItem.type}}</span></p>
        <p class="type"><span :key="features" v-if="features" v-for="features in childItem.features">{{features}}</span></p>
      </li>
      <li class="right">
        <p class="total-price" v-if="childItem.totalPrice">{{childItem.totalPrice + '万'}}</p>
        <p class="price">{{childItem.price + '/m'}}</p>
        <p class="send" @click.stop.prevent="telPhone(childItem.call)"><span class="btn bgc" >联系TA <img :src="contactphone" alt=""></span></p>
      </li>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
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
      if (!phone) return
      window.location.href = `tel:${phone}`
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .recommend-list-right
    border-top: 1px solid #ccc
    .list
      border-bottom: 1px solid #dcdcdc
      padding: 10px
      display: flex
      .left
        flex: 3
        max-width: 75%
        p
          line-height: 25px
          color: #8a8a8a
        .describe
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
        .name, .addr
          display: flex
        .name
          span
            color: black
            margin-right: 10px
        .addr
          span
            margin-right: 15px
        .type
          span
            display: inline-block
            padding: 5px
            margin: 2px
            line-height: 1
            color: #0096ff
            border: 1px solid #0096ff
      .right
        min-width: 25%
        padding-top: 25px
        text-align: right
        position: relative
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
        .send
          .btn
            margin: 10px 0
            display: inline-block
            padding: 5px 10px
            line-height: 25px
            border-radius: 3px
          .bgc
            background: #fe5d00
            color: #fff
            img
              width: 12px
</style>
