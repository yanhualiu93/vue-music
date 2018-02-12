<template lang="pug">
  div#app
    my-header
    my-nav
    transition(:name="transitionName")
      keep-alive
        router-view.router
    div(v-if="isShowPlayer")
      player
</template>
<script>
  import MyHeader from './components/my-header'
  import MyNav    from "@/components/navigation"
  import Player from './components/player'
  import {mapGetters} from 'vuex'
  export default {
    data(){
      return{
        transitionName:'right'
      }
    },
    components:{
      MyHeader,
      MyNav,
      Player
    },
    watch:{
      '$route'(to,from){
        this.transitionName= to.meta.index>from.meta.index?'right':'left'
      }
    },
    computed:{
      ...mapGetters([
        'currentSong',
        'isShowPlayer'
      ])
    }
}
</script>

<style lang="stylus" >
  .router
    transition all .3s
  .left-enter,.right-leave-to
    opacity 0.3
    transform translate3d(100%,0,0)
  .right-enter,.left-leave-to
    opacity 0.3
    transform translate3d(-100%,0,0)
</style>
