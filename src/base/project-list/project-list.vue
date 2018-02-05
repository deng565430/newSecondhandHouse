<template>
  <div>
    <div class="project-list">
        <ul>
          <li class="item" v-for="(i, index) in myprojects" v-if="i.roomid || i.sourceid">
            <router-link :to="{path:'/detail',query:{id: `${i.roomid||i.sourceid}`, match: `${i.match}`,  ismy: `${i.ismy}`, mark: `${mark}`, count: `${i.count || 0}`}}" tag="div" >
              <div class="item-top">
                <!-- <p>发布编号：{{i.roomid || i.sourceid}}</p> -->
                <p>{{timeFormat('yyyy-MM-dd hh:mm', new Date(i.create_time))}}</p>
                <p style="text-align: right">{{i.type}}</p>
              </div>
              <div class="item-center">
                <p>{{i.city}}</p>
                <p>{{i.district}}</p>
                <p>{{i.hux}}</p>
                <p>总价 {{i.total_price}}万</p>
              </div>
              <div class="item-center" v-if="i.phone">
                <p>{{i.username}}</p>
                <p @click.stop="telPhone(i.phone)">{{i.phone}}</p>
              </div>
            </router-link>
              <div class="item-bottom" v-if="!i.phone">
                <p class="counts" >有<span style="color:red">{{i.count}}</span>人响应</p>
                <div class="btn" @click.stop="backList(i)" v-if="i.stop_status === 1">恢复</div>
                <div class="btns"  @click.stop="stoplist(i)" v-if="i.stop_status === 0">停止</div>
                <!-- <div class="btn" @click.stop="stoplist(i)" >{{i.stop_status==='1' ? '恢复' : '停止'}}</div> -->
              </div>
          </li>
        </ul>
        <p class="zanwu" v-show="zanwu">暂无数据</p>
      </div>
  </div>
</template>

<script>
  import { timeFormat } from 'common/js/util.js'
  export default {
    props: {
      myprojects: {
        type: Array,
        default: []
      },
      mark: {
        type: Number,
        default: 1
      },
      zanwu: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        timeFormat: timeFormat
      }
    },
    methods: {
      sendMsg () {
        this.$emit('alertMsg')
      },
      backList (i) {
        this.$emit('blackMsg', i)
      },
      stoplist (i) {
        this.$emit('stoplist', i)
      },
      telPhone (num) {
        if (num.indexOf('*') < 0) {
          window.location.href = `tel:${num}`
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .project-list
    background: #f4f1f4
    padding-bottom: 20px
    .item
      background: #fff
      margin: 0 5px 10px 5px
      border-radius: 5px
      .item-top
        display: flex
        justify-content: space-between
        height: 30px
        background: #f7732e
        color: #fff
        border-radius: 5px 5px 0 0
        padding: 0 10px
        position: relative
        p
          width: 50%
          line-height: 30px
          font-size: 14px
          no-wrap()
      .item-center
        height: 40px
        line-height: 40px
        display: flex
        justify-content: space-between
        font-size: 14px
        padding: 0 10px
        border-bottom: 1px solid #ebebeb
      .item-bottom
        display: flex
        flex-direction: row-reverse
        padding: 5px 10px
        position: relative
        height: 30px
        .btn, .btns
          font-size: 14px
          height: 20px
          line-height: 20px
          border-radius: 4px
          background: #f7732e
          color: #fff
          text-align: right
          padding: 3px 12px
          margin-left: 10px
        .counts
          font-size: 13px
          border-radius: 5px
          color: #666
          padding: 2px 8px
          height: 16px
          line-height: 16px
          position: absolute
          left: 10px
          top: 8px
    .zanwu
      font-size: 12px
      text-align:center
</style>
