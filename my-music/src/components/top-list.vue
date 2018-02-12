<template lang="pug">
  transition(name="slide")
    misuc-list(:songs="songs",@selectItem="selectItem",:rank="true")
</template>

<script>
  import misucList from '../base/misuc-list/misuc-list'
  import {getTop} from "../api/ranking/ranking";
  import {commonMixin} from '../common/js/mixin'
  import {Song} from "../common/js/song";
  import {getSong} from "../api/song/song";
  export default {
    name: "top-list",
    mixins:[commonMixin],
    data(){
      return{
        songs:[]
      }
    },
    components:{
          misucList
    },
    created(){
      this.getTop()
    },
    methods:{
      getTop(){
        let musicDatas=[];
        getTop(this.$route.params.id).then(res=>{
          let ids=[]
          musicDatas=res.data.songlist;
          musicDatas.forEach(obj=>{
            ids.push(obj.data.songmid)
          });
          return getSong(ids)
        }).then(res=>{
          console.log(res)
          this._buildSongs(musicDatas,res.data.url_mid.data.midurlinfo)
        })
      },
      _buildSongs(list,vkList){
        let  songs =[];
        list.forEach((obj)=>{
          let vkObj= vkList.find( vk=> vk.songmid == obj.data.songmid)
          if(vkObj){
            songs.push( Song.createSong(obj.data,`http://dl.stream.qqmusic.qq.com/${vkObj.purl}`))
          }
        })
        this.songs = songs;
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../common/stylus/variable.styl"
  .slide-enter-active,.slide-leave-active
    transition all 0.35s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
