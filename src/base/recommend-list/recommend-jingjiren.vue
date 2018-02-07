<template>
  <div class="recommend">
    <div class="item" @click.stop="isShow(item, index, item.showMore)" :key="item.phone" v-for="(item, index) in projectList">
      <p class="header">
        <span class="status"><img :src="fangsir" alt=""></span>
        <span class="name">{{item.name}}</span>
        <span class="type">房源: <span class="number" v-if="item.count"> &nbsp;{{item.count + '套'}}</span></span>
        <span class="icon"><i :class="item.showMore ? 'icon-back-up' : 'icon-back-down'"></i></span>
      </p>
      <div class="is-my" v-if="item.ismy === 1">
        <img :src="isMy" alt="">
      </div>
      <div class="warp" 
        @touchstart="touchstart" 
        @touchend="touchend" 
        v-if="item.showMore">
        <scroll
          class="scroll"
          :ref="'scroll' + index"
          :clildPhone="item.phone"
          :data="item.child"
          :beforeScroll="true"
          @beforeScroll="beforeScrollStart"
          @scroll="scroll"
          :listenScroll="true"
          :pullup="true"
          :touchEnd="true"
          @scrollToEnd="scrollToEnd"
          >
          <div>
            <router-link tag="ul" :to="{path: '/seconddetail', query: {phone: item.phone, name: childItem.name, operate: 1, index }}" v-if="item.child && item.child.length > 0" :key="childItem.name" v-for="childItem in item.child" class="list">
              <li class="left">
                <div v-if="childItem.suitability" class="matching">
                  <p>{{childItem.suitability}}分</p>
                </div>
                <p class="describe">{{childItem.remark}}</p>
                <p class="name"><span>{{childItem.region}}</span><span>{{childItem.huxing}}</span><span v-if="childItem.area">{{childItem.area + '㎡'}}</span></p>
                <p class="addr"><span>{{childItem.name}}</span><span>{{childItem.type}}</span></p>
                <p class="type"><span v-if="features.length > 0" :key="features" v-for="features in childItem.features">{{features}}</span></p>
              </li>
              <li class="right">
                <p class="total-price" v-if="childItem.totalPrice">{{childItem.totalPrice + '万'}}</p>
                <p class="price" v-if="childItem.price">{{childItem.price + '元/m²'}}</p>
                <p class="send" @click.stop.prevent="telPhone(childItem.phone)"><span class="btn bgc" >联系TA <img :src="contactphone" alt=""></span></p>
              </li>
            </router-link>
            <loading v-show="item.hasMore" title="正在加载..."></loading>
            <div v-show="!item.hasMore" class="no-result-wrapper">
              <p>{{item.noResultWrapper}}</p>
            </div>
          </div>
        </scroll>
      </div>
    </div>

  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
export default {
  props: {
    projectList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      contactphone: require('common/image/contactphone.png'),
      isMy: require('common/image/myfangyuan.png'),
      fangsir: require('common/image/fangsir.png'),
      showMore: true,
      index: 0,
      phone: '',
      hasMore: true,
      noResultWrapper: '',
      innerWidth: window.innerWidth,
      maxScrollY: 0,
      timer: null
    }
  },
  methods: {
    isShow(item, index, showMore) {
      this.index = index
      this.phone = item.phone
      this.projectList[index].showMore = !showMore
      this.$emit('getAllData', {phone: item.phone, index, length: item.child.length, showMore})
    },
    touchstart(e) {
      const { pageX } = e.touches[0]
      this.slide(pageX, 'left')
    },
    touchend (e) {
      this.slide(null, 'right')
    },
    scroll (pos) {
      this.maxScrollY = pos.maxScrollY
      if (this.projectList[this.index].noResultWrapper === '没有更多了' && this.maxScrollY - pos.y === 0) {
        if (pos.movingDirectionY === 1) {
          this.$refs['scroll' + this.index][0].disable()
        }
      }
    },
    // 判断左侧滑动还是右侧滑动
    slide(pageX, direction) {
      if (direction === 'left') {
        if (this.innerWidth / 2 > pageX) {
          this.$refs['scroll' + this.index][0].disable()
          this.$emit('childEndScroll', {flag: 1})
        }
      }
      if (direction === 'right') {
        this.timer = setTimeout(() => {
          if (this.$refs['scroll' + this.index][0].enable) {
            this.$refs['scroll' + this.index][0].enable()
          }
        }, 20)
      }
    },
    // 滚动开始
    beforeScrollStart() {
      this.$emit('childStartScroll')
    },
    // 滚动结束
    scrollToEnd() {
      this.projectList[this.index].childStart++
      const start = this.projectList[this.index].childStart
      const phone = this.$refs['scroll' + this.index][0].clildPhone
      this.$emit('childEndScroll', {
        index: this.index,
        phone,
        start
      })
    },
    telPhone(phone) {
      if (!phone) return
      window.location.href = `tel:${phone}`
    }
  },
  beforeRouteLeave(to, from, next) {
    this.timer = null
    next()
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.recommend
  border-top: 1px solid #ccc
  height: 100%
  .item
    height: 100%
    position: relative
    .is-my
      position: absolute
      z-index: 99
      right: 1.8rem
      top: -3px
      img
        width: 40px
    .header
      padding: 0 10px
      line-height: 50px
      display: flex
      border-bottom: 1px solid #dcdcdc
      background: -webkit-gradient(linear,0% 0%, 0% 100%, from(#FFFFFF), to(#F1F1F1), color-stop(0.5,#f3f3f3))
      span
        text-align: center
      .status
        flex: 3
        text-align: right
        img
          vertical-align: text-bottom
          width: 23px
      .name
        flex: 7
        line-height: 50px
        font-size: $font-size-large
        no-wrap()
      .type
        flex: 5
        font-size: $font-size-medium
      .number
        color: #fb8d52
      .icon
        flex: 5
        text-align: right
        i
          font-weight: bold
          font-size: $font-size-medium-x
          color: #c0c0c0
    .warp
      position: relative
      height: 400px
      overflow: hidden
    .scroll
      position: relative
      width: 100%
      height: 370px
      .no-result-wrapper
        text-align: center
        z-index: 800
        p
          line-height: 30px
    .list
      border-bottom: 1px solid #dcdcdc
      padding: 10px
      display: flex
      .left
        flex: 3
        max-width: 75%
        min-width: 75%
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
          color: #000
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
        min-width: 25%
        padding-top: 25px
        text-align: right
        no-wrap()
        .total-price
          color: #fe5d00
          font-size: $font-size-large-x
          line-height: 30px
        .price
          color: #8a8a8a  
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
