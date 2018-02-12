<template lang="pug">
  div.singer(v-if="singer_list.length!=0",v-cloak,ref="singer",:style="{bottom:playerBottom}")
    scroll.singer-wrapper(ref="scroll",@scroll="scroll",:data="singer_list" ,:listenScroll="true",:probe-type="3")
      div
        div.singer-group(v-for=" item in singer_list" ref="singer_group")
          h1.title {{item[0]}}
          ul.singer-items
            li.singer-item(v-for="singer in item[1]",
            @click="selectItem(singer)" )
              div.imager: img(:src="singer.avatar",style="width :1rem;height :1rem;border-radius :.5rem")
              div.name {{singer.name}}
      div.group-bar(ref="group_bar",:style="{transform:translate3d}")
        h1.title {{singer_bar[currentIndex]+(currentIndex==0?'门':'')}}
    ul.singer_bar
      li.singer_bar_item(v-for="(item,index) in singer_bar"
        , @touchstart.stop.prevent="touchBarStart($event,index)",
        :class="{'current-active':index===currentIndex}",
          @touchmove.stop.prevent="touchBarMove($event,index)" ,@touchend.stop="" ) {{item}}
    router-view
</template>
<script>
  import Scroll from '../base/scroll/scroll'
  import Singer from '../common/js/singer'
  import {getSinger} from "../api/singer/singer";
  import {refreshScroll} from "../common/js/mixin";
  export default {
    name: "singer",
    mixins:[refreshScroll],
    data(){
          return {
            singer_list :[],
            currentIndex:0,
            scrollY:0,
            translate3d:'(0,0,0)'
          }
      },
      components:{
        Scroll
      },
      created(){
        this.singer_bar=[]
        this.BAR_ITEM_HEIGHT=0;
        this._getSinger();
      },
      mounted(){
      },
      methods:{
        sortList(){
          let map = new  Map();
          this.singer_list.forEach((obj,index,arr)=>{
            let findex = obj.Findex;
            if (findex!=='0'&&findex!=='9'){
              const singer =new Singer(obj.Fsinger_mid,obj.Fsinger_name)
              if(index<10){
                if(!map.has("hot")){
                  map.set("hot",[singer])
                }else {
                  map.get("hot").push(singer)
                }
              }
              if(!map.has(findex)){
                map.set(findex,[singer]);
              }else {
                map.get(findex).push(singer);
              }
            }
          })
          let sortList =[["hot",map.get("hot")]]
          map.delete("hot");
          sortList.push(...[...map].sort((o1,o2)=>{
            return o1[0].charCodeAt(0)-o2[0].charCodeAt(0);
          }))
          this.singer_list= sortList;
          sortList.forEach((obj,index)=>{
            if(index===0){
              this.singer_bar.push("热");
            }else {
              this.singer_bar.push(obj[0]);
            }
          })
          setTimeout(()=>this.BAR_ITEM_HEIGHT=document.querySelector(".singer_bar_item").clientHeight,20)
        },
        touchBarStart(e,index){
          this.firstY=e.touches[0].pageY;
          this._scrollTo(index);
        },
        touchBarMove(e,index){
          let moveY = e.touches[0].pageY;
          let num = (moveY- this.firstY)/this.BAR_ITEM_HEIGHT;
          this._scrollTo(parseInt(num)+index);
        },
        scroll(pos){
         this.scrollY=pos.y;
        },
        calculationGroupHeight(){
          this.groupHeightArr=[];
          this.$refs.singer_group.forEach((dom,index)=>{
            this.groupHeightArr.push(index===0?dom.clientHeight:this.groupHeightArr[index-1]+dom.clientHeight);
          })
        },
        calculationTranslate3d(){
          let y= -this.scrollY-this.groupHeightArr[this.currentIndex];
          if(this.scrollY<0) {
            this.translate3d = -y < this.$refs.group_bar.clientHeight ? `translate3d(0,-${this.$refs.group_bar.clientHeight - (-y)}px,0)` : 'translate3d(0,0,0)';
          }else {
            this.translate3d =  `translate3d(0,${this.scrollY}px,0)` ;
          }
        },
        _scrollTo(index){
          console.log(index)
          if(index<0||index>=this.singer_bar.length){
            return;
          }
          this.currentIndex=index;
          this.$refs.scroll.scrollToElement(this.$refs.singer_group[index])
        },
        selectItem(singer){
          this.$router.push({path:`/singer/${singer.id}`,query:{bgImg:singer.avatar,title:singer.name}})
        },
        _getSinger(){
          getSinger().then(res=>{
            this.singer_list=res.data.data.list
            this.sortList();
            setTimeout(()=>{
              this.calculationGroupHeight();
            },20)
          })
        },

      },
      watch:{
        scrollY(newY){
          this.currentIndex= this.groupHeightArr.findIndex((height)=>{
            return height>-newY;
          })
          this.calculationTranslate3d()
        }
      }
    }
</script>

<style scoped lang="stylus">
  @import "../common/stylus/variable.styl"
  @import "../common/stylus/mixin.styl"
  .singer
    position fixed
    bottom 0px
    left 0
    right 0
    top 1.34rem
    .singer_bar
      position absolute
      width 18px
      top 50%
      transform translateY(-50%);
      right 10px
      padding 20px 5px
      background rgba(169, 169, 169, .4)
      border-radius 20px
      .singer_bar_item
        padding 1px 5px
        font-size 10px
      .current-active
        color darkorange
    .singer-wrapper
      overflow hidden
      height 100%
      position relative
      .group-bar
        position absolute
        top 0px
        width 100%
        background #fff
      .title
        line-height  .5rem
        box-shadow()
        font-size .38rem
        padding 5px
      .title
        line-height  .5rem
        box-shadow()
        font-size .38rem
        padding 5px
      .singer-item
        display flex
        height 1.5rem
        align-items  center
        flex-direction row
        .imager
          flex 1
          display flex
          justify-content center
          align-items center
        .name
          font-size .4rem
          flex 4
</style>
