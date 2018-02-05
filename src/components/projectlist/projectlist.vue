<template>
<div id="projectlists">
  <div class="mengceng" v-if="mengcengFlag">
    <img :src="mengcengImg" alt="" @click="hideMengceng">
  </div>
  <div class="titles">
	 <MyTitle :title="title" ></MyTitle>
    </div>
  <div class="contants">
  	<div class="headertabs">
    <!-- 发布响应切换 -->
  	   <!-- <select class="selectcss" @change="changeselect" ref="selectes">
	    	<option v-for="(itme, index) in selects">{{itme}}</option>
	    </select> -->
      <!-- 房源客源切换 -->
  		<!-- <ul class="tabbtn">
          <li
          v-for="(itme, index) in tabs"
          :class="bkindex === index ? 'active': ''"
          @click="tabsqh(index)">{{itme}}</li>
        </ul> -->
        <ul class="listtab">
          <li v-for="i in lists" @click="tabsqh(i.key)" :class="bkindexs === i.key ? 'actives': ''">
            <div class=""><img :src="i.img"/></div>
            <div class="" :class="i.key === idnexcolor ? 'active': ''">{{i.title}}</div>
          </li>
        </ul>
  	</div>
  	<div class="contanttab">
    <!-- 三种状态切换 -->
  		<ul class="ctwrap">
  			<li
        class=""
  			v-for="(itme, index) in contentbat"
            :class="bdactive === index ? 'active': ''"
            @click="contenttab(index)">{{itme.status}}<span style="color:#e5672c">{{itme.count}}</span></li>
  		</ul>
  		<Scroll
  		:data="myprojects"
        :pullup='pullup'
  		@scrollToEnd="scrollToEnd"
  		class="list">
  		<div>
  			<ProjectList
  			:myprojects="myprojects"
        :mark="mark"
        :zanwu="zanwu"
  			@stoplist="stoplist"
  			@blackMsg="blackMsg">
  			</ProjectList>
  			<Loading v-show="isloading"></Loading>
  		</div>
  		</Scroll>
  	</div>
  </div>
  <Confirm ref="confirms"
  :text="confirmtext"
  @confirm="confirm"></Confirm>
</div>
</template>

<script>
import MyTitle from 'base/title/title'
import Scroll from 'base/scroll/scroll'
import Confirm from 'base/confirm/confirm'
import Loading from 'base/loading/loading'
import ProjectList from 'base/project-list/project-list.vue'
import {getprojectList, getfabuNum, huifuList} from 'api/myList.js'
import { getFirstVisited } from 'api/getFirstVisited'
import TYPE from 'common/js/buryingpointType'
import { addLog } from 'api/buryingpoint'
import fang1 from 'common/image/fang1.png'
import fang2 from 'common/image/fang2.png'
import people1 from 'common/image/people1.png'
import people2 from 'common/image/people2.png'
export default {

  name: 'projectlist',
  components: {
    MyTitle,
    ProjectList,
    Scroll,
    Loading,
    Confirm
  },
  data () {
    return {
      mengcengImg: require('common/image/mengceng004.jpg'),
      mengcengFlag: false,
      title: '我的列表',
      tabs: ['房源', '客源'],
      contentbat: ['全部', '待响应', '待联系', '已停止'],
      selects: ['发布', '响应'],
      bkindex: 0,
      bkindexs: 1,
      idnexcolor: 1,
      bdactive: 0,
      myprojects: [],
      startnum: 0,
      pullup: true,
      isloading: true,
      confirmtext: '确定停止这个项目吗？',
      id: 0,
      flag: '',
      isfabu: 0,
      isstatus: 0,
      operate: 1,  // 房源1客源2
      contact: null,
      ismy: 1,
      mark: 1,
      zanwu: false,
      lists: [{
        'title': '我的房源',
        'key': 1,
        'img': fang1
      }, {
        'title': '我的客源',
        'key': 2,
        'img': people2
      }, {
        'title': '找的房源',
        'key': 3,
        'img': fang2
      }, {
        'title': '找的客源',
        'key': 4,
        'img': people1
      }]
    }
  },
  created () {
    // 判断是否是首次访问
    getFirstVisited('secondhouseprojectlist').then(res => {
      console.log(res.data)
      if (res.data.data === 0) {
        this.mengcengFlag = true
      }
    })
    setTimeout(function () {
      addLog(TYPE.MYPROPAGE, '', '', '', window.USERMSG)
    }, 1500)
    this.idnexcolor = 1
    this._getfabuNum(this.isfabu)
    this._getprojectList(this.startnum, 10, this.isfabu, this.isstatus)
  },
  methods: {
    // 点击隐藏蒙层
    hideMengceng () {
      this.mengcengFlag = false
    },
    // 获取 发布的房源
    _getfabuNum (fabu) {
      getfabuNum(fabu).then((res) => {
        if (this.operate === 1) {
          this.contentbat = res.data.data.room
        } else {
          this.contentbat = res.data.data.source
        }
      })
    },
    // 获取列表
    _getprojectList (start, length, fabu, status) {
      getprojectList(start, length, fabu, status).then((res) => {
        // this.myprojects = res.data.data
        if (res.data.code === 0) {
          this.isloading = false
          if (this.operate === 1) {
            if (res.data.data.room.length < 1) {
              this.zanwu = true
            } else {
              this.zanwu = false
            }
            res.data.data.room.map((i) => {
              this.myprojects.push(i)
              i.contact = this.contact
              i.ismy = this.ismy
            })
          } else {
            if (res.data.data.source.length < 1) {
              this.zanwu = true
            } else {
              this.zanwu = false
            }
            res.data.data.source.map((i) => {
              this.myprojects.push(i)
              i.contact = this.contact
              i.ismy = this.ismy
            })
          }
        } else {
          this.isloading = false
          this.pullup = false
        }
      })
    },
    // 滚动列表
    scrollToEnd () {
      this.startnum++
      this._getprojectList(this.startnum, 10, this.isfabu, this.isstatus)
    },
    // 房源客源切换
    tabsqh (index) {
      console.log(this.bdactive)
      console.log(index)
      this.idnexcolor = index
      this.startnum = 0
      this.isstatus = 0
      this.myprojects = []
      this.bdactive = 0
      this.bkindexs = index
      if (index === 1 || index === 2) {
        this.isfabu = 0
        this.ismy = 1
      } else {
        this.isfabu = 1
        this.ismy = 0
      }
      getfabuNum(this.isfabu).then((res) => {
        if (index === 1 || index === 3) {
          this.operate = 1
          this.mark = 1
          this.contentbat = res.data.data.room
        } else {
          this.operate = 2
          this.mark = 2
          this.contentbat = res.data.data.source
        }
      })
      this._getprojectList(this.startnum, 10, this.isfabu, this.isstatus)
      // this.bkindex = index
      // this.startnum = 0
      // this.isstatus = 0
      // this.myprojects = []
      // this.bdactive = 0
      // if (index === 0) {
      //   this.operate = 1
      //   this.mark = 1
      //   getfabuNum(this.isfabu).then((res) => {
      //     this.contentbat = res.data.data.room
      //   })
      //   this._getprojectList(this.startnum, 10, this.isfabu, this.isstatus)
      // } else {
      //   this.operate = 2
      //   this.mark = 2
      //   getfabuNum(this.isfabu).then((res) => {
      //     this.contentbat = res.data.data.source
      //   })
      //   this._getprojectList(this.startnum, 10, this.isfabu, this.isstatus)
      // }
    },
    // 三个切换
    contenttab (index) {
      this.bdactive = index
      this.isloading = true
      this.startnum = 0
      this.myprojects = []
      if (index === 0) {
        this.isstatus = 0
        this._getprojectList(this.startnum, 10, this.isfabu, this.isstatus)
      } else if (index === 1) {
        this.isstatus = 1
        this._getprojectList(this.startnum, 10, this.isfabu, this.isstatus)
        // this._getxiangyingList(this.startnum, 10, this.isfabu, this.isstatus)
      } else if (index === 2) {
        this.isstatus = 2
        this._getprojectList(this.startnum, 10, this.isfabu, this.isstatus)
        // this._getstopList(this.startnum, 10, this.isfabu, this.isstatus)
      }
    },
    // 发布个响应切换
    changeselect () {
      console.log(this.$refs.selectes.value)
      this.isstatus = 0
      this.isloading = true
      this.startnum = 0
      this.myprojects = []
      this.bdactive = 0
      // this.bkindex = 0
      // this.operate = 1
      this.isfabu = 0
      if (this.$refs.selectes.value === '发布') {
        this.isfabu = 0
        this.ismy = 1
      } else {
        this.isfabu = 1
        this.ismy = 0
      }
      this._getfabuNum(this.isfabu)
      this._getprojectList(this.startnum, 10, this.isfabu, this.isstatus)
    },
    // 停止这个项目
    stoplist (i) {
      console.log(i)
      this.confirmtext = '确定停止这个项目吗？'
      this.$refs.confirms.show()
      if (i.roomid !== null) {
        this.id = i.roomid
      } else {
        this.id = i.sourceid
      }
      this.flag = 0
    },
    // 恢复这个项目
    blackMsg (i) {
      console.log(i)
      this.confirmtext = '确定恢复这个项目吗？'
      this.$refs.confirms.show()
      if (i.roomid !== null) {
        this.id = i.roomid
      } else {
        this.id = i.sourceid
      }
      this.flag = 1
    },
    // 确定
    confirm () {
      huifuList(this.id, this.flag, this.operate).then((res) => {
        this._getfabuNum(this.isfabu)
        this.myprojects.map((item) => {
          if (item.roomid !== null) {
            if (item.roomid === this.id) {
              if (item.stop_status === 1) {
                item.stop_status = 0
              } else {
                item.stop_status = 1
              }
            }
          } else {
            if (item.sourceid === this.id) {
              if (item.stop_status === 1) {
                item.stop_status = 0
              } else {
                item.stop_status = 1
              }
            }
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/base"
body, html
  height: 100%
  width: 100%
  background: #f4f1f4
  color: #333 !important
  #projectlists
    background: #f4f1f4
    .mengceng
      position: fixed
      top: 0
      left: 0
      right: 0
      buttom: 0
      z-index: 999999
      width: 100%
      height: 100%
      img
        width: 100%
        height: 100%
    .titles
      position:fixed
      top: 0
      left: 0
      width:100%
      z-index: 111
      .search
        position: absolute
        top: 6px
        right: 10px
        font-size: 20px
        color: #fff
        padding: 10px
    .contants
       margin-top: 50px
       color: #333
       .headertabs
         position: fixed
         height: 70px
         background: linear-gradient(left, #ee6354, #f87529)
         display: flex
         justify-content: center
         width: 100%
         top: 50px
         left: 0
         z-index: 111
         border-bottom:1px solid #d2d2d2
         .listtab
           display: flex
           background: #fff
           font-size: 14px
           width: 100%
           li
             width: 25%
             text-align:center
             padding: 10px 0
             overflow: hidden
             position: relative
             .active
              color: #e5672c
             div:nth-child(1)
               margin-bottom: 10px
             img
               width: 20px
           .actives
             background: #f2f2f2
         .selectcss
           position: absolute
           left: 10px
           top: 3px
           padding: 0 3px 0 3px
           border: solid 1px #fff
           border-radius: 3px
           height: 26px
           line-height: 26px
           background: none
           color: #fff
           font-size: 12px
         .tabbtn
           height: 30px
         .head-title
           width: 50%
           display: flex
           text-align: center
           line-height: 30px
           color: #fff
           font-size: 14px
           border: 1px solid #fff
           border-radius: 5px
           li
             width: 50%
             padding: 0 30px
             position:relative
             margin:2em
             letter-spacing:.2em
             font-weight:bold
             background:#999
             cursor:pointer
             overflow:hidden
             user-select:none
           li:nth-child(1)
             border-right: 1px solid #fff
           .active
              background: #fff
              color: #e5672c
       .contanttab
         height: 40px
         line-height: 40px
         .ctwrap
           display: flex
           font-size: 14px
           text-align: center
           color: #666
           text-align:justify
           justify-content: space-around
           position:fixed
           top: 128px
           left: 0
           width: 100%
           z-index: 111
           background: #fff
           border-top:1px solid #d2d2d2
           li
             position: relative
             overflow: hidden
             width: 100%
             text-align: center
             border-right: 1px solid #d2d2d2
             border-bottom: 1px solid #d2d2d2
             color: #a2a2a2
           li:last-child
             border-right: 0
           .active
             border-bottom: 2px solid #ff5500
             color: #000
         .list
           position: fixed
           top: 31px
           bottom: 120px
           width: 100%
           padding-top: 148px
</style>
