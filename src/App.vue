<template lang="html">
  <div class="con-prueba">
    <vuenut hidden :store="$store.state"></vuenut>

    <div class="con-links">
      <a target="_blank" href="https://lusaxweb.github.io/vuenut.org/">
        <img src="./assets/img/vuenut01.png" alt="">
      </a>
      <input class="myName" type="text" v-model="$store.state.myName" name="" value="">
      <h2>links</h2>
      <ul class="ul-links">
        <li>
          <a target="_blank" href="https://lusaxweb.github.io/vuenut.org/">Vuenut</a>
        </li>
        <li>
          <a target="_blank" href="https://lusaxweb.github.io/vuenut.org/docs/introduction.html">Docs</a>
        </li>
        <li>
          <a target="_blank" href="https://lusaxweb.github.io/vuesax/">Vuesax</a>
        </li>
        <li>
          <a target="_blank" href="https://github.com/lusaxweb/vuenut">GitHub</a>
        </li>
        <li>
          <a target="_blank" href="http://www.lusaxweb.com/">Lusaxweb</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import vuenut from './vuenut/vuenut.vue'
export default {
  components:{
    vuenut,
  }
}
</script>

<style lang="css" scoped>
:root {
  --primary-vuenut: 0, 198, 158;
  --secondary-vuenut: 67, 84, 102;
  --danger-vuenut: 255, 74, 74;
  --fondo-vuenut:255, 255, 255;
  --gris-vuenut:240, 240, 240;
}
* {
  padding: 0px;
  margin: 0px;
  list-style: none;
  color: rgb(var(--secondary-vuenut));
  text-decoration: none;
  font-family: arial;
}
  .con-links {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .myName {
    background: transparent;
    border: 0px;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    outline: none;
  }
  .ul-links {

  }
  h2 {
    padding: 5px;
    margin-bottom: 5px;
    margin-top:50px;
    width: 100px;
    text-align: center;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }
  .ul-links li {
    float: left;
    padding: 10px;
    transition: all .2s ease;
  }
  .ul-links li a {
    transition: all .3s ease;
  }
  .ul-links li a:hover {
    color: rgb(var(--primary-vuenut))
  }
  input {
    padding: 10px;
  }
</style>
