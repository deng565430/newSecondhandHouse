<template>
<div id="recommendList">
  <div class="title" ref="title">
    <my-title :title="'房源市场'"></my-title>
    <router-link tag="div" :to="{ path: '/secondprojectlist' }" class="my-list">
      <p>我的 <i class="icon-people2"></i></p>
    </router-link>
    <div class="item-bottom">
      <ul>
        <li :key="item" v-for="(item, index) in itemSelectType" :class="itemSelectTypeActive === index ? 'active' : '' " @click="selectTypeList(item, index)"><span>{{item.type}}</span> <i :class="[itemSelectTypeActive === index ? 'icon-back-down': 'icon-back-up']"></i></li>
      </ul>
    </div>
    <div class="tab">
      <span :key="item.value" v-for="(item, index) in tabList" :class="item.active ? 'active' : '' " @click="selectTabActive(index)" >{{item.value}}</span>
    </div>
  <div class="pop-box">
    <div>
      <select-box v-if="showCitysList" @hideSelectBox="hidePopBox" @showCitysListEvent="showCitysListEvent"></select-box>
    </div>
    <pop-box v-if="showTypeList" @hidePopBox="hidePopBox" :typeList="typeList" @showPopBox="showPopBox">
      <div>
        <div class="pop-list">
          <ul class="pop-list-child" v-if="typeList.length">
            <li :key="item" v-for="(item, index) in typeList" :class="[index === selectTypeIndexRoom ? 'select-type-index' : '']" @click.stop.prevent="selectTypeRoom(item, index)">
              {{item.value}}
            </li>
          </ul>
        </div>
        <div class="pop-city-btn">
          <a @touchstart.prevent="selectTypeConfirm">确定选择</a>
        </div>
      </div>
    </pop-box>
  </div>
  </div>
  <scroll
      class="list"
      :data="scrollData"
      ref="scroll"
      :listenScroll="true"
      :pullup="true"
      @scroll="scroll"
      @touchEnd="touchEnd"
      @scrollToEnd="searchMore"
      >
    <div>
      <recommend-list v-if="!recommendListRight" @childEndScroll="childEndScroll" @getAllData="getAllData" @childStartScroll="childStartScroll" :projectList="projectList" ></recommend-list>
      <recommend-list-right v-else @childEndScroll="childEndScroll" @childStartScroll="childStartScroll" :projectList="fangyuanProjectList"></recommend-list-right>
      <loading v-show="hasMore" title="正在加载..."></loading>
        <div v-show="!hasMore" class="no-result-wrapper">
          <p>{{noResultWrapper}}</p>
        </div>
      <div v-if="showNoProjectImg" class="no-project">
        <img :src="sorryNoProject" alt="">
      </div>
    </div>
  </scroll>
  <div>
   <confirm ref="confirm" :text="confirmText" :refresh="refresh" @confirm="confirm" @cancel="cancel"></confirm>
  </div>
  <router-link to="/secondaddkeyuan" ref="addImg" class="add-img" @click="addKeyuan">
    <img :src="fabukeyuanImg" alt="">
  </router-link>
</div>
</template>

<script>
const itemSelectType = [{
  type: '区域'
}, {
  type: '面积'
}, {
  type: '总价'
}]
import MyTitle from 'base/title/title'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import RecommendList from 'base/recommend-list/recommend-jingjiren'
import RecommendListRight from 'base/recommend-list/recommend-list'
import Confirm from 'base/confirm/confirm'
import SelectBox from 'base/select-box/select-box'
import PopBox from 'base/pop-box/pop-box'
import { getfilter, getbroker, getroomListbyphone } from 'api/recommendList'
export default {
  data () {
    return {
      fabukeyuanImg: require('common/image/sendkeyuanyuanbtn.jpg'),
      sorryNoProject: require('common/image/sorrynoproject.png'),
      tabList: [
        {
          value: '经纪人(优选)',
          active: true
        },
        {
          value: '房源(优选)',
          active: false
        }
      ],
      recommendListRight: false,
      houseListActive: 0,
      projectId: '',
      itemSelectType: [{
        type: '区域'
      }, {
        type: '面积'
      }, {
        type: '总价'
      }],
      hasMore: true,
      showNoProjectImg: false,
      noResultWrapper: '',
      projectList: [],
      fangyuanProjectList: [],
      scrollData: [],
      itemSelectTypeActive: -1,
      selectTabActiveIndex: 0,
      confirmText: '',
      refresh: false,
      showCitysList: false,
      showTypeList: false,
      selectTypeIndexRoom: -1,
      typeList: [],
      totalPrice: [{
        key: null,
        value: '全部'
      }],
      areaList: [{
        key: null,
        value: '全部'
      }],
      room: null,
      posY: 0,
      isShowBtn: true,
      sendDataStart: 0,
      sendFangyuanStart: 0,
      sendData: {
        /* 省 */
        prov: null,
        /* 市 */
        city: null,
        /* 区 */
        district: null,
        /* 价格 */
        price: null,
        /* 面积 */
        area: null,
        /* 长度 */
        length: 20
      },
      projectStart: 0,
      saveDataType: null
    }
  },
  created () {
    // 获取过滤条件
    getfilter().then(res => {
      if (res.data.code === 0) {
        this.totalPrice = this.totalPrice.concat(res.data.data.price)
        this.areaList = this.areaList.concat(res.data.data.area)
      }
    })
    this._getbroker({start: 0}, true)
  },
  methods: {
    // 获取单个经纪人的数据
    getAllData(data) {
      console.log(data)
      if (data.showMore) {
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 20)
        return
      }
      if (this.projectList[data.index].child.length > 0) {
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 20)
        return
      }
      this._getroomListbyphone({phone: data.phone}, data.index)
    },
    // tab切换
    selectTabActive(index) {
      if (this.selectTabActiveIndex === index) {
        return
      }
      this.selectTabActiveIndex = index
      this.showNoProjectImg = false
      this.hasMore = false
      this.noResultWrapper = ''
      if (!this.isShowBtn) {
        this.$refs.title.style.top = '0'
        this.$refs.addImg.$el.style.bottom = '-2px'
      }
      this.isShowBtn = true
      this.selectData(true)
      this.tabList.forEach(item => (item.active = false))
      this.tabList[index].active = true
    },
    // 监听滚动事件
    scroll(pos) {
      if (pos.y === 0) {
        if (!this.isShowBtn) {
          this.$refs.title.style.top = '0'
          this.$refs.addImg.$el.style.bottom = '-2px'
        }
        this.isShowBtn = true
      }
      if ((this.posY - pos.y) >= 40) {
        if (this.isShowBtn) {
          this.$refs.title.style.top = '-91px'
          this.$refs.addImg.$el.style.bottom = '-72px'
        }
        this.isShowBtn = false
      }
      if ((this.posY - pos.y) <= -40) {
        if (!this.isShowBtn) {
          this.$refs.title.style.top = '0'
          this.$refs.addImg.$el.style.bottom = '-2px'
        }
        this.isShowBtn = true
      }
      this.posY = pos.y
    },
    scrollToEnd() {},
    // 子元素触发滚动
    childStartScroll(data) {
      this.$refs.scroll.disable()
      setTimeout(() => {
        this.$refs.scroll.enable()
      })
    },
    // 子元素滚动结束
    childEndScroll(datas) {
      const { index, ...data } = datas
      this._getroomListbyphone(data, index)
    },
    // 区域条件筛选
    selectTypeList (item, index) {
      this.selectTypeIndexRoom = -1
      this.itemSelectTypeActive = index
      if (index === 0) {
        this.showCitysList = true
        this.showTypeList = false
      } else if (index === 1) {
        this.typeList = this.areaList
        this.showTypeList = true
        this.showCitysList = false
      } else {
        this.typeList = this.totalPrice
        this.showTypeList = true
        this.showCitysList = false
      }
    },
    hidePopBox () {
      this.showTypeList = false
      this.showCitysList = false
    },
    // 选择几室几厅
    selectTypeRoom (item, index) {
      this.selectTypeIndexRoom = index
      this.room = item.type
      this.saveDataType = item
    },
    // 确定选择
    selectTypeConfirm () {
      if (!this.saveDataType) {
        if (this.itemSelectTypeActive === 1) {
          this.sendData.area = null
        } else {
          this.sendData.price = null
        }
        this.itemSelectType[this.itemSelectTypeActive].type = itemSelectType[this.itemSelectTypeActive].type
      } else {
        if (this.itemSelectTypeActive === 1) {
          this.sendData.area = this.saveDataType.key
        } else {
          this.sendData.price = this.saveDataType.key
        }
        this.itemSelectType[this.itemSelectTypeActive].type = this.saveDataType.value
      }
      this.selectTypeIndexRoom = -1
      this.saveDataType = null
      this.showTypeList = false
      this.selectData()
    },
    // 选择的省市区
    showCitysListEvent (data) {
      // 保存省市区
      this.sendData.prov = data.provinceActive !== '全部' ? (data.provinceActive !== '' ? data.provinceActive : null) : null
      this.sendData.city = data.cityActive !== '全部' ? (data.cityActive !== '' ? data.cityActive : null) : null
      this.sendData.district = data.districtlistActive !== '全部' ? (data.districtlistActive !== '' ? data.districtlistActive : null) : null
      if (data.districtlistActive !== '' && data.districtlistActive !== '全部' && data.districtlistActive !== null) {
        this.itemSelectType[this.itemSelectTypeActive].type = data.districtlistActive
      } else if (data.cityActive !== '' && data.cityActive !== '全部' && data.cityActive !== null) {
        this.itemSelectType[this.itemSelectTypeActive].type = data.cityActive
      } else if (data.provinceActive !== '' && data.provinceActive !== '全部' && data.provinceActive !== null) {
        this.itemSelectType[this.itemSelectTypeActive].type = data.provinceActive
      } else {
        this.itemSelectType[this.itemSelectTypeActive].type = '区域'
      }
      this.showCitysList = false
      this.selectData()
    },
    selectData(flag) {
      this.projectList = []
      this.fangyuanProjectList = []
      this.sendDataStart = 0
      this.sendFangyuanStart = 0
      if (this.selectTabActiveIndex === 1) {
        if (flag) {
          this.recommendListRight = true
        }
        this._getFangyuan({start: this.sendDataStart, logo: 1, ...this.sendData}, true)
      } else {
        if (flag) {
          this.recommendListRight = false
        }
        this._getbroker(this.sendData, true)
      }
    },
    confirm () {
      if (this.confirmText === '请先注册！' || this.confirmText === '请先登录！') {
        window.location.href = '/registration'
      }
    },
    cancel () {
      if (this.confirmText === '请先注册！' || this.confirmText === '请先登录！') {
        window.location.href = '/registration'
      }
    },
    // 下拉加载
    searchMore () {
      if (this.showNoProjectImg) {
        return
      }
      if (this.noResultWrapper === '没有更多了') {
        return
      }
      if (this.selectTabActiveIndex === 1) {
        this.sendFangyuanStart++
        this._getFangyuan({start: this.sendFangyuanStart, logo: 1, ...this.sendData})
      } else {
        this.sendDataStart++
        this._getbroker({start: this.sendDataStart, logo: 0, ...this.sendData})
      }
    },
    // 首次获取更多数据 flag 是不是首次获取数据
    _getbroker(data, flag) {
      this.showNoProjectImg = false
      this.hasMore = true
      getbroker(data).then(res => {
        if (res.data.draw === 0) {
          this.hasMore = false
          if (res.data.data.length > 0) {
            res.data.data.map(item => {
              item.showMore = false
              item.hasMore = true
              item.noResultWrapper = ''
              item.child = []
              item.childStart = 0
            })
            if (flag) {
              res.data.data[0].showMore = true
              this._getroomListbyphone({phone: res.data.data[0].phone}, 0)
            }
          } else {
            if (flag) {
              this.noResultWrapper = ''
              this.showNoProjectImg = true
            } else {
              this.noResultWrapper = '没有更多了'
            }
          }
          this.projectList = this.projectList.concat(res.data.data)
          this.scrollData = this.projectList
        }
      })
    },
    // 获取单个经纪人信息
    _getroomListbyphone(data, index) {
      if (this.projectList[index] && !this.projectList[index].hasMore) {
        this.projectList[index].noResultWrapper = '没有更多了'
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 20)
        return
      }
      getroomListbyphone(data).then(res => {
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 20)
        if (res.data.draw === 0) {
          if (res.data.data.length === 0) {
            console.log(res.data.data)
            this.projectList[index].hasMore = false
            this.projectList[index].noResultWrapper = '没有更多了'
            return
          }
          if (res.data.data.length < 10) {
            this.projectList[index].hasMore = false
          }
          console.log(this.projectList)
          this.projectList[index].child = this.projectList[index].child.concat(res.data.data)
        }
      })
    },
    // 获取房源优选列表
    _getFangyuan(data, isFirst) {
      this.showNoProjectImg = false
      this.hasMore = true
      getbroker(data).then(res => {
        console.log(res)
        if (res.data.draw === 0) {
          this.hasMore = false
          if (res.data.data.length === 0) {
            if (isFirst) {
              this.noResultWrapper = ''
              this.showNoProjectImg = true
            } else {
              this.noResultWrapper = '没有更多了'
            }
          }
          this.fangyuanProjectList = this.fangyuanProjectList.concat(res.data.data)
          this.scrollData = this.fangyuanProjectList
        }
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    let index = null
    if (from.name === 'detail') {
      index = from.query.index
    }
    next(vm => {
      if (index != null) {
        vm.projectList[index].showMore = true
      }
    })
  },
  components: {
    MyTitle,
    Scroll,
    RecommendList,
    RecommendListRight,
    Confirm,
    SelectBox,
    PopBox,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  #recommendList
    font-size: $font-size-large
    position: fixed
    width: 100%
    bottom: 0
    height: 100%
    z-index: 99
    background: #fefefe
    font-size: $font-size-medium
    .title
      position: fixed
      width: 100%
      font-size: $font-size-large
      color: white
      z-index: 66
      top: 0
      transition: all .3s
      background: linear-gradient(left, #ee6354, #f87529)
      .my-list
        position: absolute
        right: 10px
        top: 10px
        font-size: $font-size-medium-x
        padding: 10px
        p
          i
            vertical-align: top
            font-size: $font-size-medium
    .pop-box
      .pop-list
        background: #fff
        .pop-list-child
          li
            line-height: 35px
            text-align: center
            color: #7b7b7b
            font-size: $font-size-medium
          .select-type-index
            background: #f9742a
            color: white
      .pop-city-btn
        margin: 0 auto
        text-align: center
        padding-top: 5px
        height: 50px
        background: $color-highlight-background
        a
          display: inline-block
          background #13CE66
          color: white
          padding: 10px 20px
          border-radius: 6px
    .list
      position: fixed
      top: 0
      bottom: 210px
      width: 100%
      padding-top: 139px
    .item-bottom
      ul
        display: flex
        background: #fff
        color: #898989
        justify-content: space-around
        border-bottom: 1px solid #eee
        li
          flex: 1
          font-size: $font-size-medium
          transition: all .3s
          line-height: 40px
          text-align: center
          i
            font-size: $font-size-medium
        .active
          color: #e5672c
          border-bottom: 1px solid #e5672c
    .tab
      display: flex
      height: 45px
      line-height: 45px
      background: #fff
      color: #898989
      text-align: center
      font-size: $font-size-medium-x
      border-bottom: 1px solid #dcdcdc
      span
        flex: 1
      .active
        border-bottom: 1px solid #f77428
        color: #f77428
    .no-result-wrapper
      text-align: center
      z-index: 800
      p
        line-height: 30px
    .no-project
      padding: 4rem
      img
        width: 100%
    .add-img
      position: fixed
      bottom: -2px
      transition: all .3s
      img
        width: 100%
</style>
