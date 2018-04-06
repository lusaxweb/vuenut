<template>
  <div id="app">
    <!-- password="123" -->
    <!-- unseen -->
    <vuenut   :store="this.$store.state" />
    <div class="contenedor">
      <input type="checkbox" v-model="$store.state.scroll" name="" value="">
      <input v-model="$store.state.color" type="text" name="" value="">
      <input v-model="$store.state.color" type="color" name="" value="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      valor:'hola'
    }
  }
}
</script>

<style>
.fade2-enter-active, .fade2-leave-active {
  transition: all .3s;
}
.fade2-enter,.fade2-leave-to  /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  /* transform: translate(0,-10%); */
}
/* .fade2-enter-active .proximamente img, .fade2-leave-active .proximamente img{
  transition: all .3s;
} */
.fade2-enter .proximamente img,.fade2-leave-to .proximamente img  /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translate(0,-70px) scale(1.1);
}

.fade2-enter-active .contiene-titulo,.fade2-enter-active .contiene-titulo{
  transition: all .3s;
}
.fade2-enter .contiene-titulo  /* .fade-leave-active below version 2.1.8 */ {
  transform: translate(0,-100%);
}

.fade2-enter-active .con-code,.fade2-enter-active .con-code{
  transition: all .3s;
}
.fade2-enter .con-code  /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: scale(.5);
}
#app {
  overflow: hidden;
}
.contenedor {
  /* margin-top: 48px; */
  overflow: hidden;
  margin-left: 500px;
}
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  list-style: none;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  outline: none;
  text-transform: none;
  text-decoration: none;
}

:root {
  --morado:92, 60, 196;
}
body {
  overflow: hidden;
  width: 100%;
}



</style>
