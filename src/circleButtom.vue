<template lang="html">
  <div
    :class="{
      'sticky-no':!sticky,
      'unseen':unseen,
      'resizexx':resize&&visible,
      'visiblexx':visible
      }"
    v-on="$listeners"
    :style="{
      'left':`${visible?360:leftx}px`,
      'top':`${topx>30?topx:30}px`,
    }"
   class="con-circle-btn">
    <!-- {{visible?'<':'>'}} -->
    <i v-if="visible" class="material-icons">navigate_before</i>
    <i v-else class="material-icons">navigate_next</i>
  </div>
</template>

<script>

export default {
  name:'circleButtom',
  props:{
    sticky:{
      type:[Boolean,String],
    },
    unseen:{
      type:Boolean,
      default:false,
    },
    resize:{
      type:Boolean,
      default:false,
    },
    visible:{
      type:Boolean,
      default:false,
    }
  },
  data(){
    return {
      leftx:0,
      topx:0,
    }
  },
  created(){
    console.log("hola");
    window.addEventListener("mousemove",this.mousemovex)
  },
  methods:{
    mousemovex(event){
      let x = event.x
      let y = event.y
      this.topx = y
      if(x < 80){
        this.leftx = x
      } else {
        this.leftx = 0
      }
    }
  }
}
</script>

<style lang="css" scoped>
.con-circle-btn {
  position: fixed;
  z-index: 10000;
  background: rgb(var(--primary-vuenut));
  width: 55px;
  height: 55px;
  transform: translate(-50%,-50%);
  transition: all .180s ease-out;
  border-radius: 50%;
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.10);
  /* color: rgba(0, 0, 0, 0.4); */
  color: rgb(var(--fondo-vuenut));
}
.con-circle-btn:not(.visiblexx):hover {
  margin-left: 8px;
}
.con-circle-btn.visiblexx:hover {
  color: rgb(var(--primary-vuenut)) !important;
  padding-right: 15px;
}
.visiblexx {
  color: rgba(var(--secondary-vuenut));
  background: rgb(var(--fondo-vuenut));
  margin-left: 27px;
  border-radius: 0px 50% 50% 0px;
  box-shadow: 10px 0px 15px 0px rgba(0, 0, 0, 0.05);
}
.resizexx {
  transform: translate(0) !important;
  left: 0px !important;
  top: 5px !important;
  background: rgb(var(--primary-vuenut));
  color: rgb(var(--fondo-vuenut));
  margin-left: 0px;
}
.unseen:not(.visiblexx) {
  opacity: 0;
}
.unseen:hover {
  opacity: 1;
}
.sticky-no:not(.resizexx) {
  top: auto !important;
  bottom: 10px !important;
  left: 10px !important;
  margin-left: 0px !important;
  transform: translate(0) !important;
}
.visiblexx.sticky-no:not(.resizexx) {
  left: 360px !important;
}
</style>
