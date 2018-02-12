<template lang="pug">
  div.ranking(:style="{bottom:playerBottom}")
    scroll.ranking-wrapper(ref="scroll",:data="rankList")
      ul#rank-content
        li.ranking-item(v-for="item in rankList",@click="$router.push({path:`/ranking/${item.id}`,query:{bgImg:item.picUrl,title:item.topTitle}})")
          img.imager(:src="item.picUrl")
          ul.song
            li.text(v-for="(song,index) in item.songList") {{index+1+'  '}}{{song.songname}}-{{song.singername}}
    div.loading-container(v-show="!rankList.length")
      load-ing
    router-view
</template>

<script>
  import Scroll from '../base/scroll/scroll'
  import {getRanking} from "../api/ranking/ranking";
  import {refreshScroll} from "../common/js/mixin";
  import loadIng from '../base/loading/loading'
  export default {
    name: "ranking",
    mixins:[refreshScroll],
    data() {
      return {
        rankList: []
      }
    },
    created(){
      this.getRanking();
    },
    methods:{
      getRanking(){
        getRanking().then(res=>{
          this.rankList = res.data.data.topList;
        })
      }
    },
    components: {
      Scroll,
      loadIng
    }
  }
</script>

<style scoped lang="stylus">
  @import "../common/stylus/mixin.styl"
  .ranking
    position fixed
    top 1.34rem
    bottom 0
    right 0
    left 0
    .ranking-wrapper
      overflow hidden
      height 100%
      .ranking-item
        height 1.5rem
        padding .20rem .2rem 0
        display flex
        .imager
          width 1.5rem
          height 1.5rem
          display inline-block
        .song
          width calc( 100% - 1.5rem)
          height 1.5rem
          overflow hidden
          display flex
          flex-direction column
          justify-content space-around
          padding 0 10px
          background #c6caca38
          .text
            font-size .28rem
            no-wrap()
            color #7e8c8d
</style>
<style scoped lang="stylus">
  #rank-content:last-child
    padding-bottom .20rem
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
