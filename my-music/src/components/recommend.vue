<template lang="pug">
  div.recommend(ref="recommend",v-if="recommends.length!=0 && popular_song_arr.length!=0",:style="{bottom: playerBottom}")
    scroll.scroll-wrapper(ref="scroll",:data="popular_song_arr")
      div
        div.slider-wrapper(ref="slider-wrapper",v-cloak )
          slider
            div( v-for="item in recommends")
              a(:href="item.linkUrl"): img.needsclick(:src="item.picUrl")
        div.popular-song 热门歌单
        ul.popular_content(v-if="popular_song_arr.length!=0")
          li.popular_item(  v-for="item in popular_song_arr",
          @click="$router.push({path:`/recommend/${item.dissid}`,query:{bgImg:item.imgurl,title:item.creator.name}})")
            div.icon
              img(style="width:1.20rem; height:1.20rem" ,:src="item.imgurl")
            div.text
              div.name
                span.name_text( v-html="item.creator.name")
              div.desc
                span.desc_text( v-html="item.dissname")
    div.loading-container
      load-ing(v-if="popular_song_arr.length==0")
    router-view
</template>
<script>
  import Slider from '../base/slider/slider'
  import Scroll from '../base/scroll/scroll'
  import {getRecommend,getDiscList}from '../api/recommend/recommend'
  import {refreshScroll} from "../common/js/mixin";
  import loadIng from '../base/loading/loading'
  export default {
    mixins:[refreshScroll],
    name: "recommend",
    data() {
      return {
        recommends: [],
        popular_song_arr: [],
        isCheck:false
      }
    },
    components: {
      Slider,
      Scroll,
      loadIng
    },created(){
      this._getRecomendAndDiscList();
    },
    methods: {
      _getRecomendAndDiscList(){
        Promise.all([getRecommend(),getDiscList()]).then(([res1,res2])=>{
          this.recommends=res1.data.data.slider;
          this.popular_song_arr=res2.data.data.list
        })

      },

    }
  }
</script>

<style scoped lang="stylus">
  @import "../common/stylus/variable.styl"
  @import "../common/stylus/mixin.styl"
  .recommend
    position fixed
    left 0
    right 0
    bottom 0
    top 1.34rem
    .scroll-wrapper
      height 100%
      overflow hidden
      .slider-wrapper
        position relative
        width 100%
        overflow hidden
        padding-top 5px
      .popular-song
        text-align center
        font-size $font-size-large
        line-height .8rem
        box-shadow()
        letter-spacing 2px
        color red
      .popular_content
        .popular_item
          display flex
          flex-direction row
          height 1.5rem
          padding-top 10px
          border-bottom #a9a9a978 solid 1px
          .icon
            flex 1
            text-align center
            padding-top .10rem
          .text
            display flex
            flex 3
            flex-direction column
            height 1.2rem
            .name
              flex 6
              display flex
              align-items center
              .name_text
                font-size .33rem
                display inline
                line-height .33rem
            .desc
              flex 4
              display inline-block
              display flex
              align-items flex-end
              .desc_text
                font-size .30rem
                color darkgray
                overflow: hidden
                text-overflow ellipsis
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
