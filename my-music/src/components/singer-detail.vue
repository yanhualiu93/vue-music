<template lang="pug">
  transition(name="slide")
    misuc-list(:songs="songs",@selectItem="selectItem")
</template>

<script>
  import MisucList from '../base/misuc-list/misuc-list'
  import Singer from '../common/js/singer'
  import {Song} from '../common/js/song'
  import {getSong} from "../api/song/song";
  import {getSingerSong} from "../api/singer/singer";
  import {mapMutations,mapGetters} from 'vuex';
  import {refreshScroll,commonMixin} from "../common/js/mixin";
  export default {
      name: "singer-detail",
    mixins:[refreshScroll,commonMixin],
    data(){
     return {
       songs:[]
     }
    },
    components:{
        MisucList
      },
    created(){
        this._getSingerSong();
    },
    computed:{
      singer(){
        return    new Singer(this.song_detil.singer_mid,this.song_detil.singer_name)
      }
    },methods:{
        refreshScroll(){

        },
        _getSingerSong(){
          let musicDatas=[];
          getSingerSong(this.$route.params.id).then(res=>{
            let ids=[]
            musicDatas=res.data.data.list;
            musicDatas.forEach(obj=>{
              ids.push(obj.musicData.songmid)
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
            let vkObj= vkList.find( vk=> vk.songmid == obj.musicData.songmid)
            if(vkObj){
              songs.push( Song.createSong(obj.musicData,`http://dl.stream.qqmusic.qq.com/${vkObj.purl}`))
            }
          })
          this.songs = songs;
        },
      ...mapMutations([
        'setPlayIng',
        'setPlayList',
        'setCurrentIndex',
        'setIsShowPlayer'
      ])
    },
    watch:{

    },
    computed:{
      ...mapGetters([
        'currentSong',
      ])
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
