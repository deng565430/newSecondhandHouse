<template>
  <div class="add-project">
    <div class="title">
      <my-title :title="'发布二手房源'"></my-title>
    </div>
    <scroll ref="scroll" class="list"  :data="districtRecommend" :listenScroll="true" @scroll="scroll" :beforeScroll="true" @beforeScroll="beforeScroll">
      <div>
        <div class="item">
          <div class="img">
            <img :src="loupansuozaidi" alt="">
          </div>
          <div class="top">
            <div>
              <redio  @checkedVal="checkedVal" :data="districtRecommend" :dataName="'districtRecommend'" />
              <div class="other" @click="selectOther" :class="other ? 'checked-style' : 'no-checked-style'">
                其他区域
              </div>
              <span v-if="other"> 已选择：{{province.value}} {{city.value}} {{district.value}}</span>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="img">
            <img :src="loupanmingcheng" alt="">
          </div>
          <div class="top">
            <div>
              <div class="house-name">
                <input type="text" ref="needsnames" id="needsnames" placeholder="方便查找,推荐填写（限12字以内）" v-model="needsName" name="">
              </div>
              <redio @checkedVal="checkedVal" :data="type" :dataName="'type'"/>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="img">
            <img :src="loufangxinxi" alt="">
          </div>
          <div class="item-list">
            <div class="context">
              <div class="left">售价</div>
              <div class="middle"><input type="text" ref="priceInput" id="priceInput" v-model="price" placeholder="填写具体数字"></div>
              <div class="right">万/套</div>
            </div>
            <div class="context">
              <div class="left">面积</div>
              <div class="middle"><input type="text" ref="areaInput" id="areaInput" v-model="area" placeholder="填写具体数字"></div>
              <div class="right">平米</div>
            </div>
            <div class="context">
              <div class="left">户型</div>
              <div class="select">
                <select v-model="room">
                  <option value ="-1">请选择</option>
                  <option :key="item.key" v-for="item in huxingRoom" :value ="item.key">{{item.value}}</option>
                </select>
                室
                <select v-model="hall">
                  <option value ="-1">请选择</option>
                  <option :key="item.key" v-for="item in huxingRoom" :value ="item.key">{{item.value}}</option>
                </select>
                厅
              </div>
              <div class="right"></div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="img">
            <img :src="loupantese" alt="">
          </div>
          <div class="top">
            <check-box @selectCheckboxVal="selectCheckboxVal" :data="features" :dataName="'features'" />
          </div>
           <div class="wanshanxinxi" v-if="wanshanFlag" @click="showMore">
            <p><img :src="pullDownIcon" alt=""> 完善信息 (推荐填写)</p>
          </div>
        </div>
        <div class="item" v-if="!wanshanFlag">
          <div class="img">
            <img :src="wanshanxinxi" alt="">
          </div>
          <div class="top">
            <div class="left">朝向</div>
            <div><redio :width="{width: '2.7rem'}" @checkedVal="checkedVal" :data="face" :dataName="'face'"/></div>
          </div>
           <div class="top">
            <div class="left">装修</div>
            <div><redio :width="{width: '2.7rem'}" @checkedVal="checkedVal" :data="decoration" :dataName="'decoration'"/></div>
          </div>
          <div class="top">
            <div class="left">楼层</div>
            <div><redio :width="{width: '2.7rem'}" @checkedVal="checkedVal" :data="floor" :dataName="'floor'"/></div>
          </div>
          <div class="top">
            <div class="left">房龄</div>
            <div><redio :width="{width: '2.7rem'}" @checkedVal="checkedVal" :data="roomAge" :dataName="'roomAge'"/></div>
          </div>
          <div class="top">
            <div class="left">电梯</div>
            <div><redio :width="{width: '2.7rem'}" @checkedVal="checkedVal" :data="hujiData" :dataName="'huji'"/></div>
          </div>
          <div class="wanshanxinxi" v-if="!wanshanFlag" @click="hidemore">
            <p><img :src="pullUpIcon" alt=""> 收起</p>
          </div>
        </div>
        <div class="item">
          <div class="top">
            <div class="left" style="width: 3.6rem; min-width: 3.6rem">备注:</div>
            <div class="right"><textarea @blur="textareasBlur" @focus="textareasFocus" ref="textareas" v-model="textarea" placeholder="推荐填写(限制50字以内)" class="textarea" name="" id="textarea" cols="30" rows="10"></textarea></div>
          </div>
        </div>
      </div>
    </scroll>
    <div class="btn" @click="sendProject">
      <img :src="sendbtn" alt="">
    </div>
    <div >
      <modal ref="modal" @modal="modal" @cancel="cancel" :title="'其他区域'">
        <div class="item-bg">
            <div class="item-50">
              <div>
                <label><span class="select-color">*</span>省:
                  <select name="" class="select" v-model="province" @change="selectProvince">
                    <option value="全部" selected="selected">全部</option>
                    <option :value="item" :key="item.key" v-for="item in provinceList">{{item.value}}</option>
                  </select>
                </label>
              </div>
            </div>
            <div class="item-50">
              <div>
                <label><span class="select-color">*</span>市:
                  <select name="" class="select" v-model="city" @change="selectCity">
                    <option value="全部" selected="selected">全部</option>
                    <option :value="item" :key="item.key"  v-for="item in cityList">{{item.value}}</option>
                  </select>
                </label>
              </div>
            </div>
            <div class="item-50">
              <div>
                <label>区:
                  <select name="" class="select" v-model="district">
                    <option value="全部" selected="selected">全部</option>
                    <option :value="item" :key="item.key"  v-for="item in districtList">{{item.value}}</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
      </modal>
    </div>
    <confirm ref="confirm" @cancel="cancelConfirm" :text="confirmText" @confirm="confirm"></confirm>
  </div>
</template>
<script>
  import Redio from 'base/redio/redio'
  import CheckBox from 'base/checkbox/checkbox'
  import MyTitle from 'base/title/title'
  import Scroll from 'base/scroll/scroll'
  import Modal from 'base/modal/modal'
  import Confirm from 'base/confirm/confirm'
  import { getProvincelist, getDistirctlist, getCitylist } from 'api/getCity'
  import { addClientRoom, getoption, getUserbyid } from 'api/addSelectList'
  import TYPE from 'common/js/buryingpointType'
  import { addLog } from 'api/buryingpoint'
  export default {
    data () {
      return {
        loupansuozaidi: require('common/image/loupansuozaidi.png'),
        loupanmingcheng: require('common/image/loupanmingcheng.png'),
        loufangxinxi: require('common/image/loufangxinxi.png'),
        loupantese: require('common/image/loupantese.png'),
        pullDownIcon: require('common/image/pulldown.png'),
        pullUpIcon: require('common/image/pullup.png'),
        wanshanxinxi: require('common/image/wanshanxinxi.png'),
        sendbtn: require('common/image/sendfangyuanbtn.jpg'),
        wanshanFlag: true,
        timer: null,
        confirmText: '',
        selectCityList: '选择城市',
        province: '全部',
        provinceList: [],
        city: '全部',
        cityList: [],
        district: '全部',
        districtList: [],
        other: false,
        decoration: [],
        districtRecommend: [],
        floor: [],
        type: [],
        // 用途
        tenementType: '',
        // 买哪里
        defaultProvince: '',
        defaultCity: '',
        defaultDistrict: '',
        // 户型 室
        huxingRoom: [],
        // 户型 厅
        huxingHall: [],
        // 售价
        price: '',
        // 面积
        area: '',
        // 户型
        room: '-1',
        hall: '-1',
        // 楼层
        slectFloor: '',
        // 装修
        slectDecoration: '',
        // 楼盘特色
        selectFeatures: '',
        features: '',
        // 房龄
        selectRoomAge: '',
        roomAge: [],
        // 朝向
        selectFace: '',
        face: [],
        // 备注
        textarea: '',
        // 需求名称
        needsName: '',
        hujiData: [
          {
            isChecked: false,
            key: '1',
            value: '有'
          },
          {
            isChecked: false,
            key: '2',
            value: '无'
          }
        ],
        // window窗口高度
        windowInnerHeight: window.innerHeight
      }
    },
    created () {
      this._getaddoptions()
      const self = this
      // 监听软键盘事件
      window.addEventListener('resize', function () {
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
          if (self.windowInnerHeight - window.innerHeight > 0) {
            if (document.activeElement.getAttribute('id') === 'needsnames') {
              self.$refs.scroll.scrollTo(0, -160)
            }
            if (document.activeElement.getAttribute('id') === 'priceInput' || document.activeElement.getAttribute('id') === 'areaInput') {
              self.$refs.scroll.scrollTo(0, -420)
            }
            if (!self.wanshanFlag) {
              if (document.activeElement.getAttribute('id') === 'textarea') {
                self.$refs.scroll.scrollTo(0, -1300)
              }
            } else {
              if (document.activeElement.getAttribute('id') === 'textarea') {
                self.$refs.scroll.scrollTo(0, -770)
              }
            }
          } else {
            self.$refs.scroll.scrollTo(0, self.scrollY)
          }
        }
      })
    },
    methods: {
      scroll(pos) {
        this.scrollY = pos.y
      },
      sendProject() {
        addLog(TYPE.SENDFANGYUANPAGE, '', TYPE.SENDKEBTN, TYPE.KEYUANPAGE, window.USERMSG)
        let prov, city, district
        if (!this.other) {
          prov = this.defaultProvince
          city = this.defaultCity
          district = this.defaultDistrict
        } else {
          prov = this.province.value
          city = this.city.value
          district = this.district.value
        }
        // 没有选区域 买哪里
        if (!prov || !city) {
          this.confirmText = '请选择楼房所在地'
          this.$refs.confirm.show()
          return
        }
        // 填写的需求名称是否超过限制
        if (!this.needsName || this.needsName.length === 0 || this.needsName.length > 12) {
          this.confirmText = '填写楼盘名称不符合规范或已超出规定字数'
          this.$refs.confirm.show()
          return
        }
        // 没有选择用途
        if (!this.tenementType) {
          this.confirmText = '请选择用途'
          this.$refs.confirm.show()
          return
        }
        // 没有填写售价
        if (!this.price) {
          this.confirmText = '请填写售价'
          this.$refs.confirm.show()
          return
        }
        // 售价必须为数字
        if (!/\d/.test(this.price)) {
          this.confirmText = '售价必须填写具体数字'
          this.$refs.confirm.show()
          return
        }
        // 没有填写面积
        if (!this.area) {
          this.confirmText = '请填写面积'
          this.$refs.confirm.show()
          return
        }
        // 面积必须为数字
        if (!/\d/.test(this.area)) {
          this.confirmText = '面积必须填写具体数字'
          this.$refs.confirm.show()
          return
        }
        // 没有选择户型
        if (this.room === '-1' || this.hall === '-1') {
          this.confirmText = '请选择户型'
          this.$refs.confirm.show()
          return
        }
        // 填写的备注是否超过限制
        if (this.textarea.length > 500) {
          this.confirmText = '填写备注长度已超过限制'
          this.$refs.confirm.show()
          return
        }

        const data = {
          prov,
          city,
          district,
          name: this.needsName ? this.needsName : null,
          type: this.tenementType ? this.tenementType : null,
          totalPrice: this.price ? this.price : null,
          area: this.area ? this.area : null,
          room: this.room ? this.room : null,
          hall: this.hall ? this.hall : null,
          features: this.selectFeatures ? this.selectFeatures : null,
          face: this.selectFace ? this.selectFace : null,
          decoration: this.slectDecoration ? this.slectDecoration : null,
          floor: this.slectFloor ? this.slectFloor : null,
          roomAge: this.selectRoomAge ? this.selectRoomAge : null,
          msg: this.textarea ? this.textarea : null
        }
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          addClientRoom(data).then(res => {
            if (res.data.code === 0) {
              this.confirmText = '添加成功！'
              this.$refs.confirm.show()
              prov = null
              city = null
              district = null
              this.defaultProvince = null
              this.defaultCity = null
              this.defaultDistrict = null
              this.needsName = null
              this.tenementType = null
              this.selectFace = null
              this.slectDecoration = null
              this.slectFloor = null
              this.selectRoomAge = null
              this.price = null
              this.area = null
              this.room = '-1'
              this.hall = '-1'
            }
          })
        }, 200)
      },
      // 多选
      selectCheckboxVal (data) {
        this.selectFeatures = data.data
      },
      // 单选
      checkedVal (val) {
        console.log(val)
        /* 必填项 */
        // 用途 物业类型
        if (val.dataName === 'type') {
          this.tenementType = this.selectContext(val, 'key')
        }
        // 买哪里 地区
        if (val.dataName === 'districtRecommend') {
          this.defaultProvince = this.selectContext(val, 'province')
          this.defaultCity = this.selectContext(val, 'city')
          this.defaultDistrict = this.selectContext(val, 'district')
        }
        /* 下面非必填项 */
        // 朝向
        if (val.dataName === 'face') {
          this.selectFace = this.selectContext(val, 'key')
        }
        // 装修
        if (val.dataName === 'decoration') {
          this.slectDecoration = this.selectContext(val, 'key')
        }
        // 楼层
        if (val.dataName === 'floor') {
          this.slectFloor = this.selectContext(val, 'key')
        }
        // 房龄
        if (val.dataName === 'roomAge') {
          this.selectRoomAge = this.selectContext(val, 'key')
        }
        if (val.dataName === 'districtRecommend') {
          this.other = false
        }
      },
      // 确定弹框
      confirm() {
        if (this.confirmText === '添加成功！') {
          this.$router.back()
        }
        if (this.confirmText === '请先登录') {
          window.location.href = '/registration'
        }
      },
      // 取消弹框
      cancelConfirm() {
        if (this.confirmText === '请先登录') {
          this.$router.back()
        }
        if (this.confirmText === '添加成功！') {
          this.districtRecommend = this.filterData(this.districtRecommend)
          this.features = this.filterData(this.features)
          this.face = this.filterData(this.face)
          this.roomAge = this.filterData(this.roomAge)
          this.floor = this.filterData(this.floor)
          this.decoration = this.filterData(this.decoration)
          this.type = this.filterData(this.type)
          this.other = false
          this.textarea = ''
          this.hujiData = [
            {
              isChecked: false,
              key: '1',
              value: '本地'
            },
            {
              isChecked: false,
              key: '2',
              value: '外地'
            }
          ]
        }
      },
      beforeScroll() {
        if (this.$refs.textareas) {
          this.$refs.textareas.blur()
        }
        if (this.$refs.needsnames) {
          this.$refs.needsnames.blur()
        }
        if (this.$refs.priceInput) {
          this.$refs.priceInput.blur()
        }
        if (this.$refs.areaInput) {
          this.$refs.areaInput.blur()
        }
      },
      showMore() {
        this.wanshanFlag = false
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 200)
      },
      hidemore() {
        this.wanshanFlag = true
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 0)
      },
      // 选择其他区域
      selectOther() {
        this._getProvincelist()
        this.$refs.modal.show()
      },
      // 确认选择
      modal() {
        if (this.province === '全部' || this.city === '全部') {
          this.confirmText = '请选择省或者市'
          this.$refs.confirm.show()
          this.other = false
        } else {
          this.districtRecommend.map(res => {
            res.isChecked = false
          })
          console.log(this.districtRecommend)
          this.other = true
          this.$refs.modal.hide()
        }
      },
      // 取消选择
      cancel() {
        this.other = false
      },
      // 选择省市区
      selectProvince() {
        console.log(this.province)
        this.city = '全部'
        this.district = '全部'
        this.cityList = []
        getCitylist(this.province.key).then(res => {
          this.cityList = res.data.data
        })
      },
      selectCity () {
        this.district = '全部'
        if (this.city === '全部') {
          return
        }
        this.districtList = []
        getDistirctlist(this.province.key, this.city.key).then(res => {
          this.districtList = res.data.data
        })
      },
      _getProvincelist () {
        if (this.provinceList.length > 0) {
          return
        }
        getProvincelist().then(res => {
          this.provinceList = res.data.data
        })
      },
      _getaddoptions() {
        getUserbyid().then(res => {
          if (res.data.code === 0) {
            console.log(res.data.data)
            if (res.data.data.user.openid == null) {
              this.confirmText = '请先登录'
              this.$refs.confirm.show()
            }
          }
        })
        getoption().then(res => {
          if (res.data.code === 0) {
            this.districtRecommend = this.filterData(res.data.data.districtRecommend)
            this.features = this.filterData(res.data.data.features)
            this.decoration = this.filterData(res.data.data.decoration)
            this.floor = this.filterData(res.data.data.floor)
            this.roomAge = this.filterData(res.data.data.roomAge)
            this.face = this.filterData(res.data.data.face)
            this.type = this.filterData(res.data.data.type)
            this.huxingRoom = res.data.data.huxing
          }
        })
      },
      filterData(data) {
        if (!data) {
          return []
        }
        data.map((item) => {
          item.isChecked = false
        })
        return data
      },
      selectContext(val, con) {
        let obj
        if (val.item.isChecked) {
          if (val.item[con]) {
            obj = val.item[con]
          }
        } else {
          obj = ''
        }
        return obj
      }
    },
    components: {
      Redio,
      CheckBox,
      MyTitle,
      Scroll,
      Modal,
      Confirm
    },
    props: {
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.add-project
  position: fixed
  width: 100%
  bottom: 0
  height: 100%
  z-index: 888
  background: #eee
  font-size: $font-size-medium
  .title
    position: fixed
    z-index: 900
    width: 100%
    text-align: center
    line-height: 40px
    font-size: $font-size-large-x
    color: white
    top: 0
  .list
    position: fixed
    top: 0
    bottom: 114px
    width: 100%
    padding-top: 50px
  .img
    padding: 18px 15%
    img
      width: 100%
  .item
    background: #fff
    padding: 10px 0
    margin-bottom: 1px
    .other
      display: inline-block;
      font-size: 12px
      line-height: 30px
      border-radius: 20px
      padding: 0 .6rem
      text-align: center
      margin: 3px 0
      margin-left: .4rem
    .no-checked-style
      border: 1px solid #8c8c8c
      color: #8c8c8c
    .checked-style
      border: 1px solid #ff5d00
      background: #ff5d00
      color: #fff
  .btn
    position: fixed
    bottom: -4px
    img
      width: 100%
  .top
    display: flex
    font-size: $font-size-medium-x
    margin: 10px 0
    .left
      padding-top: 10px
      text-align: center
      width: 3rem
      min-width: 3rem
    .right
      width: 80%
      flex-wrap: wrap
      .text-input
        border: 1px solid #ccc
        height: 30px
        width: 84%
    .house-name
      padding: 10px 10%
      input
        border: 1px solid #ccc
        height: 30px
        width: 100%
  .item-list
    .context
      width: 100%
      display: flex
      line-height: 35px
      margin: 5px 0
      .left
        text-align: center
        flex: 2
      .middle
        flex: 7
        input
          border: 1px solid #ccc
          height: 35px
          width: 100%
      .select
        flex: 7
        select
          border: 1px solid #cccccc
          width: 40%
          height: 35px
      .right
        text-align: center
        flex: 2
  .wanshanxinxi
    p
      font-size: 16px
      text-align: center
      line-height: 50px
      img
        width: 13px
  .textarea
    border: 1px solid #ccc
    height: 50px
    width: 80%
    margin-left: 10px
  .input-item
    margin: 5px 0
    margin-left: 10px
    .text-input
      border: 1px solid #ccc
      height: 30px
      width: 84%
  .item-bg
    background: #fff
    margin-bottom: 5px
    .item-50
      display: inline-block
      width: 32%
      box-sizing: border-box
      >div
        width: 100%
        border-radius: 3px
        box-sizing: border-box
        >label
          color: #333
          width: 100%
          line-height: 35px
          .select-color
            color: red
          .select
            width: 60%
            height: 30px
            border-radius: 4px
            font-weight: 600
            border: 1px solid #ccc
            color: black
  input::placeholder
    font-size: 12px
</style>
