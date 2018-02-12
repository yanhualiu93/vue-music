<template lang="pug">
  div.misuc-list(ref="misuc_list",:style="{bottom:playerBottom}")
    div.singer-detail(ref="singer_detail")
      div.top-content( :style="{background :`url(${ $route.query.bgImg }) no-repeat`}")
        div.model
      h1.title {{$route.query.title}}
      div.random(v-if="isShowRandom")
        .random-btn(@click="randomPlay")
          i.icon-play
          span  随机播放全部
      div.back(@click="$router.go(-1)"): i.icon-back
    div.song-list(ref="song_list")
      div.bg-layer(ref="bg_layer")
      scroll.song-wrapper(ref="scroll", :probeType="3",:listenScroll="true",@scroll="scroll",:data="songs")
        div
          ul
            li.song-item(v-for="(song,index) in songs",@click="selectItem({song,index})")
              div.rank(v-if="rank")
                span.icon(:class="`icon${index}`",v-if="index<=2")
                span.text(v-if="index>2") {{index+1}}
              div.content
                h1 {{song.name}}
                p   {{song.singers[0].name}}-{{song.name}}
    div.loading-container
      loading(v-if="songs.length==0")
</template>
<script>
  import Scroll from '../scroll/scroll'
  import {refreshScroll,commonMixin} from "../../common/js/mixin";
  import Loading from '../../base/loading/loading'
  export default {
    name: "misuc-list",
    mixins:[refreshScroll,commonMixin],
    props: {
      songs:{
        type:Array
      },
      rank:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        scrollY:0,
        isShowRandom:true
      }
    },
    components: {
      Scroll,
      Loading
    },
    created() {
    },
    mounted() {
      setTimeout(() => {
        this.firstTop = this.$refs.misuc_list.clientHeight * 0.40;
        this.minY=-this.firstTop+40;
      }, 20)
    },
    methods: {
      randomPlay(){
        this.setPlayerBottom('68px');
        this.setIsShowPlayer(true);
        this.setPlayType(2);
        this.setPlayList(this.songs);
        this.setPlayIng(true);
        this.setCurrentIndex(1);
      },
      scroll(pos) {
        this.scrollY=pos.y;
      },
      _songListUp(newY) {
        if(newY===this.minY){
          this.$refs.singer_detail.style.height="40px";
          this.$refs.singer_detail.style.zIndex="20";
          this.isShowRandom=false;
        }
        if(newY>this.minY) {
          this.$refs.singer_detail.style.height="";
          this.$refs.singer_detail.style.zIndex="";
          this.isShowRandom=true;
        }
        if(newY>0){
          const dom = document.querySelector(".top-content");
          dom.style.transform=`scale(${1+newY/130})`;
          this.$refs.singer_detail.style.zIndex="20";
        }
        this.$refs.bg_layer.style.transform=`translate3d(0,${newY}px,0)`;
      },
      selectItem({song,index}){
        this.$emit('selectItem',{song,index})
      }
    },watch:{
      scrollY(newY,oldY){
        this._songListUp(Math.max(this.minY,newY))
      }
    }

  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .misuc-list
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    z-index 1
    .song-list
      position absolute
      top 40%
      right 0
      left 0
      bottom 0
      background #fff
      .bg-layer
        background #fff
        width 100%
        height 100%
      .song-wrapper
        position absolute
        top 0
        bottom 0
        right 0
        left 0
        .song-item
          font-size .3rem
          padding 10px 10px 0
          display flex
          flex-direction row
          .rank
            flex 1
            display flex
            justify-content center
            align-items center
            .icon
              display inline-block
              width 100%
              height 100%
              transform scale(0.5)
              background-size cover
            .icon0
              bg-image('first')
            .icon1
              bg-image('second')
            .icon2
              bg-image('third')
          .content
            flex 5
            padding 5px
            p
              padding-top 8px
              color #7e8c8d
              font-size .28rem
</style>
<style scoped lang="stylus">
  @import "../../common/stylus/variable.styl"
  .singer-detail
    position absolute
    top 0
    right 0
    left 0
    height 40%
    .title
      position absolute
      width 100%
      text-align center
      font-size .45rem
      color #fff
      z-index 10
      top 0px
      padding-top 10px
      padding-bottom 10px
      transform none
      -webkit-transform none
    .back
      position absolute
      top 6px
      left 10px
      z-index 10
      transform none
      -webkit-transform none
      .icon-back
        display block
        padding 10px
        font-size 15px
        color $color-theme-w
        font-family 'music-icon'
    .top-content
      display block
      overflow hidden
      background-size cover !important
      height 100%
      .model
        background rgba(51, 51, 51, .4)
        position absolute
        top 0
        left 0
        right 0
        bottom 0
    .random
      position absolute
      bottom 20px
      font-size 16px
      width 100%
      text-align center
      color $color-theme-w
      padding 10px
      .icon-play
        padding-right 10px
      .random-btn
        display inline-block
        padding 10px 30px
        border solid 2px $color-theme-w
        border-radius 100px
        z-index 20
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
