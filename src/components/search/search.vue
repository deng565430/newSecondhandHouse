<template>
<div>
  <div class="title">
    <my-title :title="'搜索'"></my-title>
  </div>
  <div>
    <search-box></search-box>
  </div>
</div>
</template>

<script>
import MyTitle from 'base/title/title'
import SearchBox from 'base/search-box/search-box'
export default {

  name: 'search',

  data () {
    return {

    }
  },
  components: {
    MyTitle,
    SearchBox
  }
}
</script>

<style lang="css" scoped>
</style>