<template lang="pug">
   .play-bar
      .play-wrapper(@click="clickProgress")
        .time {{currentTime|filterTime}}
        .bg-inner(ref="inner")
          .progress(ref="progress")
          .progress-btn(ref="btn",@touchstart.stop.prevent="touchBarStart($event)",@touchmove.stop.prevent="touchBarMove($event)" ,@touchend.stop="touchBarEnd")
        .time {{currentSong.interval | filterTime}}
</template>

<script>
  import {commComputed} from "../common/js/mixin";
  export default {
        name: "play-bar",
      mixins:[commComputed],
    data(){
          return{
            currentTime:0
          }
      },
      mounted(){
        this.audio = document.querySelector("audio");
        this._updateProgress();
      },
      filters:{
          filterTime(time){
             time = parseInt(time)
            let min = parseInt(time/60);
            let s = time%60;
            if(s<10){
              s = `0${s}`
            }
            return `${min}:${s}`
          }
      },
      methods:{
        _updateProgress(){
          this.audio.addEventListener("timeupdate",this.updateTime)
        },
        updateTime(e){
          this.currentTime = e.target.currentTime;
          let x =this.currentTime/this.currentSong.interval*this.$refs.inner.clientWidth+this.$refs.inner.getBoundingClientRect().left;
          this._computedX(x);
        },
        clickProgress(e){
          let x = this._computedX(e.pageX)
          this._skipPlay(x);
        },
        touchBarStart(e){
          this.audio.removeEventListener('timeupdate',this.updateTime)
          this._computedX(e.touches[0].pageX)
        },
        touchBarMove(e){
           this.maxX = this._computedX(e.touches[0].pageX)
           this.currentTime=this._compuetedCurrentTime(this.maxX);
        },
        touchBarEnd(e){
          this._skipPlay(this.maxX);
          this.audio.addEventListener("timeupdate",this.updateTime)
        },
        _computedX(x2){
          let x = x2-this.$refs.inner.getBoundingClientRect().left;
          if(x<0){
            x = 0;
          }
          if(x>this.$refs.inner.clientWidth){
            x=this.$refs.inner.clientWidth;
          }
          this.$refs.btn.style.transform=`translate3d(${x}px,0,0)`;
          this.$refs.progress.style.width=`${x}px`;
          return x
        },
        _skipPlay(x){
          let currentTime = this._compuetedCurrentTime(x);
          this.audio.pause();
          this.audio.currentTime=currentTime;
          this.audio.play();
        },
        _compuetedCurrentTime(x){
          return x/this.$refs.inner.clientWidth*this.currentSong.interval;
        }
      }
    }
</script>

<style scoped lang="stylus">
  @import "../common/stylus/variable.styl"
  .play-bar
    width 100%
    height 40px
    font-size 10px
    .play-wrapper
      width 85%
      margin 0 auto
      position relative
      height 40px
      display flex
      justify-content space-around
      align-items center
      .time
        color $color-theme-w
        padding 0 15px
      .bg-inner
        height 4px
        width 100%
        background #333333
        position relative
        .progress
          background $color-theme-w
          height 4px
          width 0
        .progress-btn
          width 10px
          height 10px
          left -9px
          background darkorange
          border $color-theme-w solid 4px !important
          position absolute
          top -6px
          border-radius 10px
</style>
