<template lang="pug">
  div(@touchstart.stop.parent="_touchstartX",@touchmove.stop.parent="_touchendX",@touchend.stop="")
    slot
</template>

<script>
    export default {
      data(){
       return{
         differenceX:0
       }
      },
      methods:{
          _touchstartX(e){
            this.x1= e.touches[0].pageX
          },
          _touchendX(e){
            console.log(e.touches)
            this.x2 =e.touches[0].pageX;
            this.differenceX=this.x2-this.x1;
            console.log(this.differenceX)
          }
      }
    }
</script>

<style scoped>

</style>
