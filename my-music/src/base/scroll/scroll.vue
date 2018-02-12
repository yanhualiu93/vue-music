<template lang="pug">
  div(ref="wrapper")
    slot
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "scroll",
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    mounted() {
      setTimeout(() => {
        this._init_scroll();
      }, 20)
      this.isMaxY=true;
    },
    methods: {
      scrollToElement(el) {
        this.scroll && this.scroll.scrollToElement(el, 0)
      },
      _init_scroll() {
        if (!this.$refs.wrapper) {
          return;
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: this.click,
          probeType: this.probeType
        })
        let _t = this;
        this.listenScroll && this.scroll && (
          this.scroll.on("scroll", (pos) =>{
            _t.$emit("scroll", pos)
          }))
      },
      refresh() {
        if(this.scroll){
            this.scroll.refresh();
        }
      }
    },
    watch: {
      data() {
        this.$nextTick(()=>{
          this.scroll.refresh();
        })
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
