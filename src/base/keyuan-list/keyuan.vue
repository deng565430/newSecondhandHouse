<template>
  <div>
    <div class="project-list" v-if="projectList.length">
        <ul>
          <li class="item" v-for="item in projectList">
            <router-link :to="{path:'/detail',query:{id: `${item.roomId}`, match: `${item.match}`, contact: `${item.contact}`, ismy: `${item.ismy}`, mark: `${mark}`, count: `${item.count == null ? 0 : item.count}`}}" tag="div" >
              <div class="item-top">
                <p>{{item.city}}</p>
                <p>{{item.district}}</p>
                <p>{{item.huxing}}</p>
                <p>{{item.totalPrice ? item.totalPrice + '万' : ''}}</p>
              </div>
              <div class="item-center">
                <p>{{item.username}}</p>
                <p>{{item.phone}}</p>
                <p>{{item.type}}</p>
                <p class="is-contact" v-if="item.ismy === 0"><img v-if="item.contact !== 0" :src="secondhousegou" alt=""> <span v-if="item.contact !== 0">已联系</span></p>
              </div>
              <div class="item-bottom">
                <p v-if="item.refuse === 1" style="color: #dc4900">被拒绝</p>
                <p v-else-if="item.count">总响应 <span> {{item.countAll}}</span> 人 已匹配 <span> {{item.count}} </span>人</p>
                <p v-else style="color: #dc4900">等待响应...</p>
                <p v-if="item.ismy === 0">
                  <span v-if="item.contact === 0" class="btn bgc" @click.stop="sendMsg(item.roomId)">{{'联系TA'}} <i class="icon-phone"></i></span>
                  <span v-else-if="item.match === 0" style="color:red">等待回复</span>
                  <span v-else-if="item.match === 1" style="color:green">查看回复</span>
                </p>
                <p v-else>
                  <span style="color: yellowgreen">我的项目</span>
                </p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
 /* 匹配-0未匹配-1已匹配
    private Integer match;
    /**联系-0未联系-1已联系
    private Integer contcat;
    /**0-别人的需求-1我的需求
    private Integer ismy; */
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
        secondhousegou: require('common/image/secondhousegou.png')
      }
    },
    methods: {
      sendMsg (id) {
        this.$emit('alertMsg', id)
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
      margin: 0 5px 10px 5px
      padding: 10px
      .item-top, .item-center
        display: flex
        p
          width: 25%
          line-height: 3
          text-align: center
          no-wrap()
        .is-contact
          color: #e5672c
          img
            color: #e5672c
            width: 15%
            vertical-align: text-top

      .item-top
        p
          font-size: $font-size-medium
      .item-center
        p
          font-size: $font-size-small
      .item-bottom
        display: flex
        >p
          width: 50%
        p:first-child
          line-height: 3
          font-size: $font-size-small
          text-align: left
          padding-left: 18px
          no-wrap()
          span
            color: #e5672c
        p:last-child
          box-sizing: border-box
          padding-top: 10px
          span
            float: right
            margin: 0 5px
          .btn
            display: inline-block
            padding: 5px 10px
            border-radius: 4px
            border: 1px solid black
            i
              color: #000
          .bgc
            background: #e5672c
            border: 1px solid #e5672c
            color: #fff
            i
              color: #fff
</style>
