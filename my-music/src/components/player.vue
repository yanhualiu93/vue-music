<template lang="pug">
  .player(v-if="isShowPlayer")
    transition(name="player-tran",
        @enter="enter"
      ,@after-enter="afterEnter"
      ,@leave="leave"
      ,@after-leave="afterLeave")
      .big-player(v-show="!isShowMini")
        .background-imge(:style="{ background :`url(${currentSong.image}) no-repeat`}")
        .top
            h1.title {{currentSong.name}}
              .back(@click="isShowMini=!isShowMini"): i.icon-back
            h2.singer-name {{currentSong.singers[0].name}}
        .middle
          .middle-l
            .cd-wrapper(ref="cd")
              .cd-content(class="play", :class="{pause:!playIng}")
                img.image(ref="big_img", :src="currentSong.image")
          .mini-lrc
        .bottom
            .dot-wrapper
              span.dot( )
              span.dot( )
            play-bar
            .operators
              div( class="icon i-left")
                i( @click="setPlayType(playType+1)" ,:class="{'icon-sequence':playType===0,'icon-loop':playType===1,'icon-random':playType===2}")
              div( class="icon i-left" )
                i( class="icon-prev",@click="setCurrentIndex($store.state.currentIndex-1)")
              div( class="icon i-center" )
                i( @click="setPlayIng(!playIng)", :class="{'icon-play':!playIng,'icon-pause':playIng}")
              div( class="icon i-right" )
                i(  class="icon-next",@click="setCurrentIndex($store.state.currentIndex+1)")
              div( class="icon i-right")
                i(  class="icon  icon-not-favorite" )
    transition(name="play-mini")
      .mini-player(v-show="isShowMini")
        .content
          .icon(class="image-content")
            img.image(ref="mini_img",:src="currentSong.image" ,class="play",:class="{pause:!playIng}",@click.parent.stop="isShowMini=!isShowMini",style="width:60px;height:60px;border-radius:50px")
          .text(@click.parent.stop="isShowMini=!isShowMini")
            div
              p.song-name {{currentSong.name}}
              p.singer-name {{currentSong.singers[0].name}}
          .icon
            i(:class="{'icon-play':!playIng,'icon-pause':playIng}",@click="setPlayIng(!playIng)")
          .icon
            i.icon-playlist(@click="$refs.playList.showPlayList= !$refs.playList.showPlayList")
    play-list(ref="playList")
    audio(:src="currentSong.url" ,autoplay,ref="audio",:loop="playType===1")
</template>

<script>
  import animations from 'create-keyframe-animation'
  import {mapGetters,mapMutations} from 'vuex'
  import playList from './playList'
  import playBar from './play-bar'
  export default {
    name: "player",
    data() {
      return {
        isShowMini:true,
        songlist: [],
        showPlayList:false,
        currentTime:0
      }
    },components:{
      playList,
      playBar
    },methods:{
      changeShowPlayList(){
        this.showPlayList=!this.showPlayList;
      },
      enter(el,done){
        const {x,y,scale} =this.computedAnimation();
        console.log(x,y,scale)
          let animation ={
              0:{
                transform: `translate3d(${x}px,${y}px,0) scale(${scale})`,
              },
              60:{
                transform: `translate3d(0,0,0) scale(1.1)`,
              },
              100:{
                transform: `translate3d(0,0,0) scale(1)`,
              }
          }
        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 400,
            easing: 'linear'
          }
        })
        animations.runAnimation(this.$refs.cd, 'move', done)
      },
      afterEnter(){
        animations.unregisterAnimation('move')
        this.$refs.cd.style.animation = ``
      },
      leave(el,done){
        const {x,y,scale} =this.computedAnimation();
        console.log(x,y,scale)
        this.$refs.cd.setAttribute("style",`transition:all .4s;transform:translate3d(${x}px,${y}px,0) scale(${scale})`)
        this.$refs.cd.addEventListener("transitionend",done);
      },
      afterLeave(el){
        this.$refs.cd.style.transition='';
        this.$refs.cd.style.transform=''
      },
      computedAnimation(){
        let innerHeight = window.innerHeight;
        let cd_bottom=innerHeight- this.$refs.cd.getBoundingClientRect().bottom+this.$refs.cd.clientHeight/2;
        let x = -(window.innerWidth/2-this.mini_left-this.miniClientWidth/2)
        let y = cd_bottom-this.mini_bottom-this.miniClientWidth
        let scale =  this.miniClientWidth/this.$refs.cd.clientWidth;
        return{
          x,y,scale
        }
      },
      updateTime(e){
         e.target.currentTime;
      },
      ...mapMutations([
        'setPlayIng',
        'setCurrentIndex',
        'setPlayType'
      ])
    },
    mounted(){
          (this.mini_bottom = window.innerHeight - this.$refs.mini_img.getBoundingClientRect().bottom);
          (this.miniClientWidth = this.$refs.mini_img.clientWidth);
          (this.mini_left = this.$refs.mini_img.getBoundingClientRect().left);
          setTimeout(()=>{
            this.isShowMini=false;
          },20)
          let _t =this;
          this.$refs.audio.addEventListener("ended",()=>{
              switch ( _t.playType){
                case 0:
                  _t.setCurrentIndex(_t.$store.state.currentIndex+1);
                  break;
                case 2:
                  this.setCurrentIndex(_t.$store.state.currentIndex);
                  break;

              }
          })
    },
   watch:{
      playIng(newVal){
        newVal?this.$refs.audio.play():this.$refs.audio.pause();
      }
    },computed:{
      ...mapGetters([
        'isShowPlayer',
        'currentSong',
        'playIng',
        'playType'
      ])
    }
  }
</script>

<style scoped lang="stylus" >
  @import "../common/stylus/variable.styl"
  @import "../common/stylus/mixin.styl"
  .player
    .big-player
      position fixed
      top 0
      bottom 0
      left 0
      right 0
      background #333333
      z-index 10
      .background-imge
        width 100%
        height 100%
        background-size cover!important
        position absolute
        z-index -5
        filter blur(20px)
        opacity 0.6
      .top
        position absolute
        top 0
        width 100%
        .title
          color $color-theme-w
          font-size .45rem
          text-align center
          line-height 1rem
          position relative
          .back
            display inline-block
            position absolute
            left 15px
            transform rotate(-90deg)
            .icon-back
              color $color-theme-w
        .singer-name
          color $color-theme-w
          font-size .28rem
          text-align center
      .middle
        width 100%
        position absolute
        top 1rem
        bottom 18%
        .middle-l
          .cd-wrapper
            position absolute
            left calc( (100% - 5.8rem) / 2 )
            top 12%
            width 5.8rem
            height 5.8rem
            .cd-content
              background url("../common/image/cd-ring.png") no-repeat
              background-size cover
              display flex
              justify-content center
              align-items center
              width 100%
              height 100%
            .pause
              animation-play-state paused !important
            .play
              animation image-rotate 10s  linear infinite
              .image
                width 63.66%
                height 63.66%
                border-radius 1000px
                position absolute
                z-index 100
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .operators
          display flex
          justify-content space-around
          align-items center
          height 1rem
          .icon
            font-size .7rem
            color $color-theme-w
            opacity 0.6
    .mini-player
      position fixed
      bottom 0
      right 0
      left 0
      z-index 10
      box-shadow 0px -1px 3px 0px #7e8c8d21
      background $color-theme-w
      .content
        display flex
        flex-direction row
        height 70px
        .text
          flex 2
          display flex
          align-items center
          max-width 4.2rem
          .song-name
            font-size 18px
            padding-bottom 4px
            max-width 4.2rem
            no-wrap()
            overflow hidden
          .singer-name
            font-size 15px
            color #7e8c8d
        .icon
          flex 1
          font-size .6rem
          display flex
          justify-content center
          align-items center
        .image-content
          .pause
              animation-play-state paused !important
          .play
              animation image-rotate 10s  linear infinite
</style>
<style lang="stylus">
  @-webkit-keyframes image-rotate
    0%
      transform rotate(0deg)
      -webkit-transform rotate(0deg)
    100%
      transform rotate(360deg)
      -webkit-transform rotate(360deg)
  @@keyframes image-rotate
       0%
         transform rotate(0deg)
         -webkit-transform rotate(0deg)
       100%
         transform rotate(360deg)
         -webkit-transform rotate(360deg)
  .player-tran-enter-active,.player-tran-leave-active
    transition all .35s
    .top,.bottom
      transition all .3s cubic-bezier(0.86, 0.18, 0.82, 1.32)
  .player-tran-enter,.player-tran-leave-to
    opacity 0
    .top
      transform translate3d(0,-100%,0)
    .bottom
      transform translate3d(0,100%,0)
  .player-mini-enter,.player-mini-leave
    transform all .35s
  .player-mini-enter,.player-mini-leave-to
    opacity 0
</style>
