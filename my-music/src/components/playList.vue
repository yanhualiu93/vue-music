<template lang="pug">
  transition(name="play-list")
    .play-list(v-if="showPlayList", @click.stop="changeShowPlayList")
      .play-wrapper
        .list-header(@click.stop="")
          .content
            i.icon(@click="setPlayType(playType+1)", :class="{'icon-sequence':playType===0,'icon-loop':playType===1,'icon-random':playType===2}")
            span.text {{playText}}
            span.clear
              i.icon-clear
        scroll.list-wrapper(ref="scroll",:data="playList")
          ul
            li.song-item(v-for="song in playList")
              span.play
                i.icon-play(v-show="currentSong.id ==song.id")
              span.song-name(@click="setCurrentIndex(song)") {{song.name}}
              span.like
                i.icon-not-favorite
              span.delete
                i.icon-delete(@click="deleteSong(song)")
        .list-footer 关闭
</template>

<script>
  import Scroll from '../base/scroll/scroll'
  import {commComputed,commonMixin} from "../common/js/mixin";
  import {mapGeppers,mapMutations} from 'vuex'
  export default {
        mixins:[commComputed,commonMixin],
        name: "play-list",
      data(){
        return{
          showPlayList:false
        }
      },
      components:{
          Scroll
      },
      methods:{
        changeShowPlayList(){
          this.showPlayList=!this.showPlayList;
        },
        ...mapMutations([
          'setPlayType',
          'deleteSong'
        ])
      },
      mounted(){
      },computed:{
        playText(){
          switch (this.playType){
            case 0:
              return "顺序播放"
              break
            case 1:
              return "单曲循环"
              break
            case 2:
              return "随机播放"
          }
        }
      }

    }
</script>

<style scoped lang="stylus">
  @import "../common/stylus/variable.styl"
  .play-list
    position fixed
    top 0
    right 0
    left 0
    bottom 0
    background rgba(51,51,51,.3)
    z-index 100
    .play-wrapper
      height 70%
      position absolute;
      width 100%
      bottom 0;
      background $color-theme-w
      color #333333
      .list-header
        height 50px
        position absolute
        top 0
        width 100%
        box-shadow 0 0px 3px 0 #a9a9a9
        .content
          display flex
          justify-content space-around
          font-size 20px
          align-items center
          width 90%
          margin 0 auto
          height 50px
          .text
            width 100%
            display block
            padding-left 10px
          .icon
            font-size 30px
      .list-footer
        text-align center
        position absolute
        bottom 0
        line-height  50px
        width 100%
        font-size 25px
        box-shadow 0 0px 3px 0 #a9a9a9
      .list-wrapper
        top 50px
        position absolute
        bottom 50px
        left 0
        right 0
        overflow hidden
        .song-item
          font-size 15px
          display flex
          justify-content space-around
          padding 10px 20px
          flex-direction row
          .play
            width 10px
            flex 1
          .song-name
            flex 10
          .like
            flex 1
          .delete
            flex 1

</style>
<style scoped lang="stylus">
  .play-list-enter-active,.play-list-leave-active
    transition  all .35s
    .play-wrapper
      transition all .35s
  .play-list-enter,.play-list-leave-to
    opacity 0
    .play-wrapper
        transform translate3d(0,100%,0)
</style>
