<template lang="pug">
  div(style="position:relative")
    ul.navigation
      li: router-link.nav-item(tag="div" to="/recommend" ) 推荐
      li: router-link.nav-item(tag="div" to="/singer" ) 歌手
      li: router-link.nav-item(tag="div" to="/ranking" ) 排行
      li: router-link.nav-item(tag="div" to="/search" ) 搜索
    div#hr(style="width:25%;position :absolute; display: inline-block ;height: 3px ;background: red; bottom :-1px; left: 0 ;transition :left .5s;")
</template>

<script>
  export default {
    mounted(){
      let dom_hr =document.querySelector("#hr");
      let dom_item =document.querySelectorAll(".nav-item");
      let num = 100/dom_item.length;
      dom_hr.style.width=`${num}%`
      dom_item.forEach((dom,index,arr) => {
        let className =dom.className+''
       new RegExp("router-link-active").test(className)&&(dom_hr.style.left=`${num*index}%`)
      })
    },watch:{
      '$route'(to,from){
        let dom_hr =document.querySelector("#hr");
        let dom_item =document.querySelectorAll(".nav-item");
        let num = 100/dom_item.length;
        dom_hr.style.left=`${num*to.meta.index}%`
      }
    }
  }
</script>

<style scoped lang="stylus" >
  @import "../common/stylus/variable.styl"
  @import "../common/stylus/mixin.styl"
  .navigation
    display flex
    justify-content  space-around
    height .74rem
    position relative
    box-shadow()
    li
      line-height .74rem
      width 100%
      .nav-item
        font-size .32rem
        color $color-text
        width 100%
        text-align center
      .router-link-active
        color red!important
</style>
