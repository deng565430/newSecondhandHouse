<template>
<div id="recommendList">
  <div class="title">
    <my-title :title="'二手房客源'"></my-title>
      <!-- <router-link tag="div" :to="{ path: '/secondprojectlist' }" class="my-list">
        <p>我的 <i class="icon-people2"></i></p>
      </router-link> -->
      <div class="item-bottom">
        <ul>
          <li :key="item" v-for="(item, index) in itemSelectType" :class="itemSelectTypeActive === index ? 'active' : '' " @click="selectTypeList(item, index)"><span>{{item.type}}</span> <i :class="[itemSelectTypeActive === index ? 'icon-back-down': 'icon-back-up']"></i></li>
        </ul>
      </div>
    <div class="pop-box">
      <div>
        <select-box v-if="showCitysList" @hideSelectBox="hidePopBox" @showCitysListEvent="showCitysListEvent"></select-box>
      </div>
      <pop-box @selectTypeConfirm="selectTypeConfirm" v-if="showTypeList" @hidePopBox="hidePopBox" :typeList="typeList" @showPopBox="showPopBox">
        <div>
          <div class="pop-list">
            <ul class="pop-list-child" v-if="typeList.length">
              <li :key="item" v-for="(item, index) in typeList" :class="[index === selectTypeIndexRoom ? 'select-type-index' : '']" @click.stop.prevent="selectTypeRoom(item, index)">
                {{item.value}}
              </li>
            </ul>
          </div>
        </div>
      </pop-box>
    </div>
  </div>

  <scroll
      class="list"
      :data="projectList"
      ref="scroll"
      :listenScroll="true"
      :pullup="true"
      @scrollToEnd="searchMore">
    <div>
      <keyuan-list v-if="!recommendListRight" @childEndScroll="childEndScroll" @childStartScroll="childStartScroll" :projectList="projectList" @mark="sendData.mark" :mark="sendData.mark"></keyuan-list>
      <loading v-show="hasMore" title=""></loading>
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
  <router-link to="/secondaddfangyuan" class="add-img" @click="addKeyuan">
    <img :src="fabufangyuanImg" alt="">
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
import KeyuanList from 'base/keyuan-list/keyuan'
import Confirm from 'base/confirm/confirm'
import SelectBox from 'base/select-box/select-box'
import PopBox from 'base/pop-box/pop-box'
import { getfilter } from 'api/recommendList'
import { getsourceitem } from 'api/keyuan'
export default {
  data () {
    return {
      fabufangyuanImg: require('common/image/sendfangyuanbtn.jpg'),
      sorryNoProject: require('common/image/sorrynoproject.png'),
      showNoProjectImg: false,
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
      noResultWrapper: '',
      projectList: [],
      itemSelectTypeActive: -1,
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
        start: 0,
        /* 长度 */
        length: 20
      },
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
    this._getsourceitem({}, true)
  },
  methods: {
    // 区域条件筛选
    selectTypeList (item, index) {
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
      this.projectList = []
      this.sendData.start = 0
      this._getsourceitem(this.sendData, true)
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
      this.projectList = []
      this.sendData.start = 0
      this._getsourceitem(this.sendData, true)
    },
    confirm () {},
    cancel () {},
    // 下拉加载
    searchMore () {
      if (this.showNoProjectImg) {
        return
      }
      if (this.noResultWrapper === '没有更多了') {
        return
      }
      this.hasMore = true
      this.sendData.start ++
      this._getsourceitem(this.sendData)
    },
    _getsourceitem(data, isFirst) {
      this.showNoProjectImg = false
      this.hasMore = true
      getsourceitem(data).then(res => {
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
          this.projectList = this.projectList.concat(res.data.data)
        }
      })
    }
  },
  components: {
    MyTitle,
    Scroll,
    KeyuanList,
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
    .list
      position: fixed
      top: 0
      bottom: 210px
      width: 100%
      padding-top: 98px
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
    .no-result-wrapper
      text-align: center
      z-index: 800
      p
        line-height: 30px
    .add-img
      position: fixed
      bottom: -2px
      img
        width: 100%
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
