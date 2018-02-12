<template lang="pug">
    .search(:style="{bottom:playerBottom}")
      .form
        i.icon-search
        input.search-input(type="search",placeholder="搜索歌曲、歌手",@keyup="changeText($event)",v-model="searchText")
        div(style="width:20px")
      .hot(v-show="searchText.length===0")
        .hot-title 热门搜索
        ul.hot-key
          li.hot-item(v-for="item in hotKey",@click="searchText=item.k") {{item.k}}
      .song-list(v-show="searchText.length!==0")
        scroll.scroll-warpper(:data="songs",ref="scroll")
          ul
            li.song-item(v-for="song in songs",@click="selectItem({song})")
              p {{song.name}}
              p(style="padding:5px 0;font-size:10px;") {{song.singers[0].name}}-{{song.name}}
      .loading-container(v-show="searchText.length!==0&&songs.length==0")
        load-ing
</template>
<script>
  import {getHotKey,getSearchSong} from "../api/search/search";
  import {Song} from "../common/js/song";
  import {getSong} from "../api/song/song";
  import Scroll from '../base/scroll/scroll'
  import {refreshScroll,commonMixin} from "../common/js/mixin";
  import LoadIng from '../base/loading/loading'
  export default {
        name: "search",
        mixins:[refreshScroll,commonMixin],
      components:{
          Scroll,
          LoadIng
      },
      data(){
          return{
            searchText:"",
            hotKey:[],
            songs:[]
          }
      },created(){
          this._getHotKey();
    },watch:{
      searchText(newVal){

        this.songs=[];
        newVal!==''&&this._getSearchSong();
      }
    },
      methods:{
        changeText(e){
          window.timer && window.clearTimeout(window.timer);
           window.timer = setTimeout(()=>{
             console.log(e.target.value)
            this.searchText =e.target.value;
          },300)
        },
        _getHotKey(){
          getHotKey().then(res=>{
            this.hotKey=res.data.data.hotkey.splice(0,9);
            console.log(res)
          })
        },
        _getSearchSong(){
          let musicDatas =[];
          getSearchSong(this.searchText).then(res=>{
            let ids=[]
            musicDatas =  res.data.data.song.list;
            musicDatas.forEach((musicData)=>{
              ids.push(musicData.songmid)
            })
            return Promise.resolve( getSong(ids))
          }).then(res=>{
            let  Songs = [];
            musicDatas.forEach(musicData=>{
              let vk = res.data.url_mid.data.midurlinfo.find(res=>{
                return res.songmid === musicData.songmid;
              })
              Songs.push( Song.createSong(musicData,`http://dl.stream.qqmusic.qq.com/${vk.purl}`))
            })
            this.songs =Songs;
          })
        }
      }
    }
</script>

<style scoped lang="stylus">
  .search
    width 100%
    position fixed
    top 1.34rem
    bottom 0
    .form
      width 90%
      height 50px
      margin 0 auto
      background #7e8c8d21
      border-radius 10px
      margin-top 20px
      display flex
      flex-direction row
      align-items center
      .search-input
        flex 8
        height 25px
        font-size initial !important
      .icon-search
        font-size 20px
        flex 1
        text-align center
      .icon-dismiss
        text-align center
        flex 1
        font-size 20px
    .hot
      padding 10px 20px
      .hot-title
        font-size 15px
        padding 10px 20px
      .hot-key
        display flex
        align-content space-around
        justify-content space-around
        flex-wrap wrap
        height 150px
      .hot-item
        font-size 17px
        padding 5px 20px
        border-radius 30px
        background #7e8c8d21
    .song-list
      position absolute
      top  80px
      right 0
      left 0
      bottom 0
    .scroll-warpper
      overflow hidden
      height 100%
      ul:last-child
        padding-bottom 20px
      .song-item
        font-size 15px
        padding 10px 20px 0px
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
