import  {mapGetters,mapMutations}  from 'vuex'
export const refreshScroll = {
  mounted(){
    this.isShowPlayer && this.refreshScroll()
  },
  methods:{
    refreshScroll(){
      console.log(this.$refs.scroll)
        this.$refs.scroll&& this.$refs.scroll.refresh();
    },
    ...mapMutations([
      'setPlayerBottom'
    ])
  },
  activated(){
    this.isShowPlayer&& this.refreshScroll()
  },
  watch:{
    playerBottom(newVal){
      setTimeout(()=>{
        this.refreshScroll();
      },200)
    }
  },
  computed:{
    ...mapGetters([
      'isShowPlayer',
      'playerBottom'
    ])
  },
}

export  const commComputed ={
  computed:{
    ...mapGetters([
      'currentSong',
      'isShowPlayer',
      'playIng',
      'playType',
      'playList',
      'playerBottom'
    ])
  }
}
export const commMethods = {
   methods:{

   }
}
export const  commonMixin={
  computed:{
    ...mapGetters([
      'currentSong',
      'isShowPlayer',
      'playIng',
      'playType',
      'playList',
      'playerBottom'
    ])
  },
  methods:{
    selectItem({song,index}){
      this.setPlayerBottom('68px');
      this.setIsShowPlayer(true);
      this.setPlayList(this.songs);
      this.setPlayIng(true);
      this.setCurrentIndex(song);
    },
    ...mapMutations([
      'setPlayIng',
      'setPlayList',
      'setCurrentIndex',
      'setIsShowPlayer',
      'setPlayerBottom',
      'setPlayType'
    ])
  }


}
