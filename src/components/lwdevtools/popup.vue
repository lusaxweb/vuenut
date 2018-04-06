<template lang="html">
  <transition name="fade">
  <div v-if="visible" class="con-popup">
    <div class="popup">
      <header>
        <h2>{{title}}</h2>
        <button @click="quitarPopup" class="btnx flaticon-close" type="button" name="button"></button>
      </header>
      <div class="slot">
        <slot/>
      </div>
      <div class="con-btns-popup">
        <slot name="btns">
        </slot>
      </div>
   </div>
  </div>
  </transition>
</template>

<script>
export default {
  props:[
    "title",
    "solicitud",
    "visible"
  ],
  data(){
    return{
      visiblex:this.visible
    }
  },
  methods:{
    quitarPopup(){
      // this.visible = "hola"
      // this.$emit("click")
      this.$emit("update:visible",false)
    }
  }
}
</script>

<style lang="css" scoped>
.fade-enter-active, .fade-leave-active {
transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
opacity: 0;
}
.fade-enter-active .popup, .fade-leave-active .popup{
transition: all .3s;
}
.fade-enter .popup, .fade-leave-to .popup /* .fade-leave-active below version 2.1.8 */ {
  transform: scale(.5);
  opacity: 0;
}
  .con-popup {
    position: fixed;
    top: 0px;
    left: 0px;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .popup {
    position: relative;
    width: calc(100% - 50px);
    max-width: 800px;
    max-height: 90%;
    display: flex;
    flex-direction: column;
    background: rgb(255, 255, 255);
    border-radius: 8px;
    box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.3);
    background: rgb(247, 247, 247);
  }
  .btnx {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 57px;
    height: 57px;
    display: flex;
    align-content: center;
    justify-content: center;
    border-radius: 0px 8px 0px 0px;
    background: rgb(255, 255, 255);
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }
  .btnx:hover {
    color: rgb(var(--color-primary));
  }
  header {
    display: block;
    position: relative;
    width: 100%;
    background: rgb(255, 255, 255);
    border-radius: 8px 8px 0px 0px;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.050);
  }
  header h2 {
    width: 100%;
    padding: 15px;
    font-weight:lighter;
    font-size: 22px;
  }
  .slot {
    padding: 15px;
    overflow: auto;
    /* max-height: calc(100% - 57px); */
    position: relative;
    display: block;
  }
  .con-btns-popup {
    position: relative;
    bottom: 0px;
    transform: translate(0,50%);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
