<template lang="pug">
 div.myheader
  h1.text my-music

</template>

<script>
    export default {

    }
</script>

<style scoped lang="stylus" >
  @import "../common/stylus/variable.styl"
  @import "../common/stylus/mixin.styl"
  .myheader
     position relative
     text-align center
     height .60rem
    .text
      font-size $font-size-large
      display inline-block
      line-height .60rem
      vertical-align top

</style>
