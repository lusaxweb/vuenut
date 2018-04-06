<template lang="html">
  <transition name="fade">
  <div class="con-lok">
    <input placeholder="Password" :value="value" @input="$emit('input',$event.target.value)" type="password">
    <slot>
    </slot>
  </div>
  </transition>
</template>

<script>
export default {
  props:['value'],
  data(){
    return {

    }
  }
}
</script>

<style lang="css" scoped>
.con-lok input{
  padding: 8px;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding-left: 15px;
  color: rgb(var(--secondary));
}
.fade-enter-active, .fade-leave-active {
  transition: all .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translate(-100%);
}
  .con-lok {
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgb(var(--fondo));
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
  }
</style>
