<template>
  <div class="redio">
    <span :style="width"  @click="checked(item, index)" class="label" :class="item.isChecked ? 'checked-style' : 'no-checked-style'" :key="item" v-for="(item, index) in data">
      {{item.value}}
    </span>
  </div>
</template>
<script>
  import { removeByValue } from 'common/js/util'
  export default {
    props: {
      data: {
        type: Array,
        default: []
      },
      width: {
        type: Object,
        default: {
          width: '3.4rem'
        }
      },
      dataName: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        dataList: []
      }
    },
    methods: {
      checked(item, index) {
        item.isChecked = !item.isChecked
        if (item.isChecked) {
          this.dataList.push(item.key)
        } else {
          removeByValue(this.dataList, item.key)
        }
        this.$emit('selectCheckboxVal', {data: this.dataList.join(',')})
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .redio
    .label
      display: inline-block;
      font-size: 12px
      line-height: 30px
      border-radius: 20px
      text-align: center
      margin: 3px 0
      margin-left: .3rem
      transition: all .3s
    .no-checked-style
      border: 1px solid #8c8c8c
      color: #8c8c8c
    .checked-style
      border: 1px solid #0066f3
      background: #0066f3
      color: #fff
</style>
