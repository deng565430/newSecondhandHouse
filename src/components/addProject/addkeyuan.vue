<template>
  <div class="add-project">
    <div class="title">
      <my-title :title="'发布二手客源'"></my-title>
    </div>
    <scroll ref="scroll" class="list"  :data="price" :listenScroll="true" @scroll="scroll" :beforeScroll="true" @beforeScroll="beforeScroll">
      <div>
        <div class="item">
          <div class="img">
            <img :src="topImg" alt="">
          </div>
          <div class="top">
            <div class="left" style="width: 2.5rem; min-width: 2.5rem"><span style="color: red">*</span>用途</div>
            <div class="right"><redio :width="{width: '2.7rem'}" @checkedVal="checkedVal" :data="type" :dataName="'type'"/></div>
          </div>
        </div>
        <div class="item">
          <div class="img">
            <img :src="mainali" style="width: 60%" alt="">
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
            <img :src="zongyusuan" alt="">
          </div>
          <div class="top">
            <redio @checkedVal="checkedVal" :data="price" :dataName="'price'" />
          </div>
        </div>
        <div class="item">
          <div class="img">
            <img :src="maiduoda" alt="">
          </div>
          <div class="top">
            <redio @checkedVal="checkedVal" :data="area" :dataName="'area'" />
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
            <div class="left" style="line-height: 25px">首付预算</div>
            <div class="input-item"><input ref="shoufuyusuan" placeholder="输入数字" v-model="proportion" class="text-input" type="text" name="" id="shoufuyusuan"> 万</div>
          </div>
          <div class="top">
            <div class="left">户型</div>
            <div><redio :width="{width: '2.7rem'}" @checkedVal="checkedVal" :data="huxing" :dataName="'huxing'"/></div>
          </div>
          <div class="top">
            <div class="left">楼层</div>
            <div><redio :width="{width: '2.7rem'}" @checkedVal="checkedVal" :data="floor" :dataName="'floor'"/></div>
          </div>
          <div class="top">
            <div class="left">装修</div>
            <div><redio :width="{width: '2.7rem'}" @checkedVal="checkedVal" :data="decoration" :dataName="'decoration'"/></div>
          </div>
          <div class="top">
            <div class="left">社保</div>
            <div><redio :width="{width: '2.7rem'}" @checkedVal="checkedVal" :data="social" :dataName="'social'"/></div>
          </div>
          <div class="top">
            <div class="left">户籍</div>
            <div><redio :width="{width: '2.7rem'}" @checkedVal="checkedVal" :data="hujiData" :dataName="'huji'"/></div>
          </div>
          <div class="wanshanxinxi" v-if="!wanshanFlag" @click="hidemore">
            <p><img :src="pullUpIcon" alt=""> 收起</p>
          </div>
        </div>
        <div class="item">
          <div class="top">
            <div class="left" style="width: 3.6rem; min-width: 3.6rem">备注:</div>
            <div class="right"><textarea @blur="textareasBlur" @focus="textareasFocus" ref="textareas" v-model="textarea" placeholder="推荐填写(限制50字以内)" class="textarea" name="" id="" cols="30" rows="10"></textarea></div>
          </div>
          <div class="top">
            <div class="left" style="width: 4rem; min-width: 4rem">需求名称</div>
            <div class="right"><input ref="needsnames" placeholder="方便查找,推荐填写（限10字以内）" v-model="needsName" class="text-input" type="text" name="" id=""></div>
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
  import MyTitle from 'base/title/title'
  import Scroll from 'base/scroll/scroll'
  import Modal from 'base/modal/modal'
  import Confirm from 'base/confirm/confirm'
  import { getProvincelist, getDistirctlist, getCitylist } from 'api/getCity'
  import { sendProject, getaddoptions, getUserbyid } from 'api/addSelectList'
  import TYPE from 'common/js/buryingpointType'
  import { addLog } from 'api/buryingpoint'
  export default {
    data () {
      return {
        topImg: require('common/image/maizenyang.png'),
        mainali: require('common/image/mainali.png'),
        maiduoda: require('common/image/maiduoda.png'),
        wanshanxinxi: require('common/image/wanshanxinxi.png'),
        pullDownIcon: require('common/image/pulldown.png'),
        pullUpIcon: require('common/image/pullup.png'),
        zongyusuan: require('common/image/zongyusuan.png'),
        sendbtn: require('common/image/sendkeyuanyuanbtn.jpg'),
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
        price: [],
        area: [],
        decoration: [],
        districtRecommend: [],
        floor: [],
        huxing: [],
        social: [],
        type: [],
        // 用途
        tenementType: '',
        // 买哪里
        defaultProvince: '',
        defaultCity: '',
        defaultDistrict: '',
        // 价格 最高价和最低价
        selectPrice: '',
        maxPrice: '',
        minPrice: '',
        // 买多大面积
        maxArea: '',
        minArea: '',
        // 首付预算
        proportion: '',
        // 户型
        houseHome: '',
        // 楼层
        slectFloor: '',
        // 装修
        slectDecoration: '',
        // 社保
        ensure: '',
        // 户籍
        census: '',
        // 备注
        textarea: '',
        // 需求名称
        needsName: '',
        // 软键盘高度

        hujiData: [
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
            if (!self.wanshanFlag) {
              if (document.activeElement.getAttribute('id') === 'shoufuyusuan') {
                self.$refs.scroll.scrollTo(0, -800)
              } else {
                self.$refs.scroll.scrollTo(0, -1300)
              }
            } else {
              self.$refs.scroll.scrollTo(0, -800)
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
        addLog(TYPE.SENDKEYUANPAGE, '', TYPE.SENDKEBTN, TYPE.FANGYUANPAGE, window.USERMSG)
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
        // 没有选择用途
        if (!this.tenementType) {
          this.confirmText = '请选择用途'
          this.$refs.confirm.show()
          return
        }
        // 没有选区域 买哪里
        if (!prov || !city) {
          this.confirmText = '请选择区域'
          this.$refs.confirm.show()
          return
        }
        // 没有选择总预算
        if (!this.selectPrice) {
          this.confirmText = '请选择预算范围'
          this.$refs.confirm.show()
          return
        }
        // 没有选择购买面积
        if (!this.minArea || !this.maxArea) {
          this.confirmText = '请选择面积范围'
          this.$refs.confirm.show()
          return
        }
        // 填写的备注是否超过限制
        if (this.textarea.length > 50) {
          this.confirmText = '填写备注长度已超过限制'
          this.$refs.confirm.show()
          return
        }
        // 填写的需求名称是否超过限制
        if (this.needsName.length > 10) {
          this.confirmText = '填写需求名称长度已超过限制'
          this.$refs.confirm.show()
          return
        }
        const data = {
          prov,
          city,
          district,
          start_area: this.minArea,
          end_area: this.maxArea,
          price: this.selectPrice ? this.selectPrice : null,
          minPrice: this.minPrice ? this.minPrice : null,
          maxPrice: this.maxPrice ? this.maxPrice : null,
          type: this.tenementType ? this.tenementType : null,
          scale: this.proportion ? this.proportion : null,
          room: this.houseHome ? this.houseHome : null,
          census: this.census ? this.census : null,
          floor: this.slectFloor ? this.slectFloor : null,
          ensure: this.ensure ? this.ensure : null,
          decoration: this.slectDecoration ? this.slectDecoration : null,
          msg: this.textarea ? this.textarea : null,
          needs_name: this.needsName ? this.needsName : null
        }
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          sendProject(data).then(res => {
            if (res.data.code === 0) {
              this.confirmText = '添加成功！'
              this.$refs.confirm.show()
              prov = null
              city = null
              district = null
              this.defaultProvince = null
              this.defaultCity = null
              this.defaultDistrict = null
              this.tenementType = null
              this.selectPrice = null
              this.defaultProvince = null
              this.minArea = null
              this.maxArea = null
            }
          })
        }, 200)
      },
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
        // 总预算
        if (val.dataName === 'price') {
          this.minPrice = this.selectContext(val, 'min')
          this.maxPrice = this.selectContext(val, 'max')
          this.selectPrice = this.selectContext(val, 'value')
        }
         // 买多大面积
        if (val.dataName === 'area') {
          this.minArea = this.selectContext(val, 'min')
          this.maxArea = this.selectContext(val, 'max')
        }
        /* 下面非必填项 */
        // 户型
        if (val.dataName === 'huxing') {
          this.houseHome = this.selectContext(val, 'key')
        }
        // 楼层
        if (val.dataName === 'floor') {
          this.slectFloor = this.selectContext(val, 'key')
        }
        // 装修
        if (val.dataName === 'decoration') {
          this.slectDecoration = this.selectContext(val, 'key')
        }
        // 社保
        if (val.dataName === 'social') {
          this.ensure = this.selectContext(val, 'key')
        }
        // 户籍
        if (val.dataName === 'huji') {
          this.census = this.selectContext(val, 'key')
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
          this.price = this.filterData(this.price)
          this.area = this.filterData(this.area)
          this.decoration = this.filterData(this.decoration)
          this.districtRecommend = this.filterData(this.districtRecommend)
          this.floor = this.filterData(this.floor)
          this.huxing = this.filterData(this.huxing)
          this.social = this.filterData(this.social)
          this.type = this.filterData(this.type)
          this.other = false
          this.textarea = ''
          this.proportion = ''
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
        if (this.$refs.shoufuyusuan) {
          this.$refs.shoufuyusuan.blur()
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
        getaddoptions().then(res => {
          if (res.data.code === 0) {
            this.price = this.filterData(res.data.data.price)
            this.area = this.filterData(res.data.data.area)
            this.decoration = this.filterData(res.data.data.decoration)
            this.districtRecommend = this.filterData(res.data.data.districtRecommend)
            this.floor = this.filterData(res.data.data.floor)
            this.huxing = this.filterData(res.data.data.huxing)
            this.social = this.filterData(res.data.data.social)
            this.type = this.filterData(res.data.data.type)
          }
          console.log(res.data.data)
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
    text-align: center
    padding: 18px 0
    img
      width: 70%
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
        &::placeholder
          font-size: 12px
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
      &::placeholder
        font-size: 12px
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
</style>
