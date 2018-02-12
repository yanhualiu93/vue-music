<template lang="pug">
  transition(name="slide")
    misuc-list(:songs="songs",@selectItem="selectItem")
</template>

<script>
  import MisucList from '../base/misuc-list/misuc-list'
  import getSheet from '../api/sheet/sheet'
  import {getSong} from "../api/song/song";
  import {Song} from "../common/js/song";
  import {commonMixin,refreshScroll} from "../common/js/mixin";
  export default {
      mixins:[commonMixin],
      name: "song_sheet_detail",
      data(){
        return{
          songs:[]
        }
      },
      components:{
          MisucList
      },
      created(){
        this._getSongList();
      },
      methods:{
        _getSongList(){
          getSheet(this.$route.params.id).then(res=>{
            let ids=[]
              this.songList = res.data.cdlist[0].songlist;
            this.songList.forEach(obj=>{
              ids.push(obj.mid)
            })

            return Promise.resolve(getSong(ids))
          }).then(res=>{
            this._bulidSongs(this.songList,res.data.url_mid.data.midurlinfo);
          })
        },
        _bulidSongs(list,vkList){
          let songs =[];
          list.forEach(obj=>{
            let vk = vkList.find((vk)=>{
              return vk.songmid == obj.mid
            })
            if(vk){
              songs.push(Song.createSong(obj,`http://dl.stream.qqmusic.qq.com/${vk.purl}`))
            }
            this.songs =songs;
          })
        }
      }
    }
</script>

<style scoped lang="stylus" >
  @import "../common/stylus/variable.styl"
  .slide-enter-active,.slide-leave-active
    transition all 0.35s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
