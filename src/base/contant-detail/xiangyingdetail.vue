<template>
  <div class="xiangiqng-detail">
      <ul>
        <li>
          <div class="topheader">
            <span>09-25</span>
            <span>15:38</span>
          </div>
          <div  class="content">
            <a>我</a>
            <span>有曹阳周边，500w以内的房源吗有曹阳周边，500w以内的房源吗有曹阳周边，500w以内的房源吗有曹阳周边，500w以内的房源吗有曹阳周边，500w以内的房源吗</span>
          </div>
        </li>
        <li class="right">
          <div class="topheader">
            <span>09-25</span>
            <span>15:38</span>
          </div>
          <div  class="content">
            <a>王晓亮</a>
            <a>13899998888</a>
            <span>有曹阳周边，500w以内的房源吗有曹阳周边，500w以内的房源吗有曹阳周边，500w以内的房源吗有曹阳周边，500w以内的房源吗有曹阳周边，500w以内的房源吗</span>
          </div>
        </li>
      </ul>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.xiangiqng-detail
  li
    border-bottom: 1px solid #ebebeb
    margin-top: 5px
    padding-bottom: 10px
    .topheader
      height: 20px
      line-height: 20px
      padding: 0 15px
      color: #666
      font-size: 12px
    .content
      padding: 0 15px
      line-height: 22px
      font-size: 14px
      a
        text-decoration: underline
        margin-right: 18px
    .footer
      text-align: right
      height: 40px
      line-height: 40px
      span
        display:inline-block
        height:18px
        line-height:18px
        padding:  5px 15px
        background: #f7732e
        color: #fff
        font-size: 12px
        border-radius: 3px
        margin-right:10px
  .right
    text-align: right
</style>
