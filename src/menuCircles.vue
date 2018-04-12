<template lang="html">
  <div class="con-ul-circles">
    <div class="con-logo">
      <img src="./assets/img/vuenut_opt.png" alt="">
    </div>
    <div :class="{'ul-flex':resize,'activo-alguno':storesActivos||formato=='json'||resize||config}" class="con-ul">

      <div :class="{'no-va':scroll==0}" @click="scroll-=100" class="btn1">
        <i class="material-icons">keyboard_arrow_left</i>
      </div>
    <ul
    ref="ulcircles"
    class="menu-circles">
    <li title="Edit Store" :class="{'activo-menu':formato=='edit'}" @click="$emit('click-formato',formato=='edit'?'arbol':'edit')">
      <i class="material-icons">create</i>
    </li>
      <li :class="{'copiado':copiado}" @click="$emit('click-copiar','Store copiado',true),copiadox()">
        <i title="Copiar Store" class="material-icons">{{copiado?'thumb_up':'content_copy'}}</i>
      </li>
      <li  :class="{'nombre-activo':nombreActivo}" >
        <i @click="nombreActivo=true" title="Guardar Store" class="material-icons">cloud_upload</i>
        <div class="nombrex" >
          <input @keypress.enter="guardarStore" v-model="nameStore" placeholder="Name new store" type="text">
          <button class="cancelar" @click="nombreActivo=false,nameStore=''" type="button" name="button"><i class="material-icons">clear</i></button>
          <button :disabled="nameStore==''" class="guardar" @click="guardarStore" type="button" name="button"><i class="material-icons">save</i></button>
        </div>
      </li>
      <li  :class="{'activo-menu':storesActivos,'disabledx':storesx.length == 0}" @click="storesActivos=!storesActivos">
        <i title="Mis Store guardados" class="material-icons">folder</i>
      </li>
      <li :class="{'activo-menu':formato=='json'}" @click="$emit('click-formato',formato=='json'?'arbol':'json')">
        <i title="Cambiar formato" class="material-icons">flip</i>
      </li>

      <li :class="{'activo-menu':resize}" @click="$emit('click-resize')">
        <i title="Fullscreen" class="material-icons">fullscreen</i>
      </li>
      <li v-if="password" @click="$emit('click-locked')">
        <i title="Bloquear" class="material-icons">https</i>
      </li>
      <li @click="exportarx(storex)">
        <i title="Exportar Store" class="material-icons">move_to_inbox</i>

      </li>
      <li class="importx">
        <input @change="importarx($event)" type="file" title="Importar Store" accept=".json">
        <i title="Importar Store" class="material-icons">unarchive</i>
      </li>
      <li @click="modeNight"  title="night mode">
        <i class="material-icons">hdr_strong</i>
      </li>
      <li :class="{'activo-menu':config}" @click="config=!config">
        <i title="Settings" class="material-icons">settings</i>
      </li>
      <li class="con-img" >
        <a target="_blank" href="https://github.com/lusaxweb/vuenut">
          <img src="./assets/img/vuenut-favicon-32x32.png" alt="">
        </a>
      </li>
    </ul>
    <div :class="{'no-va2':scroll>=scrollWidth-client}" @click="scroll+=100" class="btn2">
      <i class="material-icons">keyboard_arrow_right</i>

    </div>
    </div>
    <a ref="export" href="#"></a>
    <div v-if="storesActivos" class="con-stores">
      <!-- <button @click="eliminarStores" type="button" name="button">eliminar todo</button> -->
      <ul>
        <li v-for="store,index in storesx">
          {{store.vnUser.name}}
          <div class="con-icons">
            <i title="Exportar Store" @click="exportarx(store)" class="material-icons">move_to_inbox</i>
            <i title="Poner Store" @click="ponerStore(index)" class="material-icons">unarchive</i>
            <i class="eliminarUno material-icons" title="Eliminar Store" @click="eliminarS(index)" >delete_sweep</i>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="config" class="con-config">
      <ul>
        <li class="color">
          Color
          <div class="iconsx">

            <span title="change color">
              <input @change="changeColor($event.target.value)" type="color" v-model="colorTotal">
              <i class="material-icons">color_lens</i>
            </span>
            <i @click="restoreColor" class="material-icons" title="restore color">restore</i>
          </div>
        </li>

        <li :class="{'no-sticky':!sticky}" @click="$emit('sticky-click')">
          Arrow sticky
          <i class="material-icons">{{sticky?'check_box':'check_box_outline_blank'}}</i>
        </li>

        <li>
          font size
          <span class="btns-size">
            <button :disabled="fontSize<=12" @click="$emit('font-size-less')"  type="button" name="button"><i class="material-icons">remove</i></button>
            {{fontSize}}px
            <button  :disabled="fontSize>=28" @click="$emit('font-size-plus')" type="button" name="button"><i class="material-icons">add</i></button>
          </span>
        </li>
        <!-- <li><a href="https://github.com/lusaxweb/vuenut">Vuenut issues</a></li> -->
        <!-- <li>Login</li> -->
        <!-- <li>Firebase</li> -->
        <li :class="{'restaurandox':restaurando}" class="rojo">
          <span @click="restaurando=true">{{restaurando?'¿Estas seguro? se borraran todos los datos.':'Restaurar'}}</span>
          <div  class="con-btns-restaurar">
            <button class="aceptarR" @click="restaurarx" type="button" name="button">Aceptar</button>
            <button @click="restaurando=false" class="cancelarR" type="button" name="button">Cancelar</button>
          </div>
        </li>
      </ul>
    </div>
<!-- <input  type="file" name="" value=""> -->
  </div>
</template>

<script>
import color from './utils/color.js'
export default {
  props:{
    fontSize:{
      type:[Number,String],
      default:16,
    },
    jsonSpace:{},
    sticky:{},
    password:{
      type:[String,Boolean]
    },
    storex:{},
    resize:{
      type:Boolean,
    },
    formato:{
      type:String,
    }
  },
  data(){
    return {
      restaurando:false,
      night:false,
      config:false,
      colorTotal:'',
      client:0,
      scrollWidth:0,
      scroll:0,
      storesActivos:false,
      nameStore:'',
      copiado:false,
      storesx:[],
      nombreActivo:false,
    }
  },
  watch:{
    resize(){
      this.scroll = 0
    },
    scroll(){
      let ul = this.$refs.ulcircles
      scrollTo(ul, this.scroll, 300)
      function scrollTo(element, to, duration) {
        var start = element.scrollLeft,
        change = to - start,
        currentTime = 0,
        increment = 20;

        var animateScroll = function(){
          currentTime += increment;
          var val = easeOutCirc(currentTime, start, change, duration);
          // console.log(val);
          element.scrollLeft = val;
          if(currentTime < duration) {
            setTimeout(animateScroll, increment);
          }
        };
        animateScroll();


      }
      function easeOutCirc(t, b, c, d) {
        t /= d;
        t--;
        return c * Math.sqrt(1 - t*t) + b;
      }
    }
  },
  mounted(){
    this.consultarStores()
    let ul = this.$refs.ulcircles
    console.dir(ul);
    this.scrollWidth = ul.scrollWidth
    this.client = ul.clientWidth

    this.obtenerColor()
  },
  computed:{
    totalScroll(){
      let ul = this.$refs.ulcircles
    }
  },
  methods:{
    modeNight(){

      if(this.night) {
        // --primary: 0, 198, 158;
        // --secondary: 67, 84, 102;
        // --danger: 255, 74, 74;
        // --fondo:255, 255, 255;
        // --gris:240, 240, 240;
        color.setCssVariable('--fondo',`255, 255, 255`)
        // color.setCssVariable('--primary',`0,198,158`)
        color.setCssVariable('--secondary',`67, 84, 102`)
        color.setCssVariable('--gris',`240, 240, 240`)
        this.night = false
      } else {
        this.night = true
        console.log("click night");
  // rgb(31, 42, 55)
        color.setCssVariable('--fondo',`21, 28, 37`);
        // color.setCssVariable('--primary',`0,198,158`)
        color.setCssVariable('--secondary',`220,220,220`)
        color.setCssVariable('--gris',`31, 42, 55`)
      }

    },
    restaurarx(){
      this.restoreColor()
      this.eliminarStores()
      localStorage.removeItem("vuenutSticky");
      this.$parent.sticky = true
      localStorage.removeItem('vuenutFontSize')
      this.$parent.fontSize = 16
      console.dir(this.$parent);
      console.dir(localStorage);
      this.restaurando = false
    },
    restoreColor(){
      localStorage.setItem("vuenutColor", `0,198,158`)
      color.setCssVariable('--primary',`0,198,158`)
      this.colorTotal = '#00c69e'
      console.log("paso");
    },
    obtenerColor(){
      let storageColor = localStorage.getItem("vuenutColor");
      if(storageColor){
        color.setCssVariable('--primary',storageColor)
        let storageColorSplit = storageColor.split(',')
        console.log(storageColorSplit);
        this.colorTotal = color.rgbToHex(Number(storageColorSplit[0]),Number(storageColorSplit[1]),Number(storageColorSplit[2]))

      }
      // this.colorTotal = color.rgbToHex(0, 51, 255)
    },
    changeColor(colorx){
      let colorxx = color.hexToRgb(colorx)
      color.setCssVariable('--primary',`${colorxx.r},${colorxx.g},${colorxx.b}`)
      localStorage.setItem("vuenutColor", `${colorxx.r},${colorxx.g},${colorxx.b}`)
    },
    ponerStore(i){
      let storePoner = this.storesx.filter((item,index) => {
        return i == index
      })
      storePoner = JSON.parse(JSON.stringify(storePoner[0]))
      if(storePoner.hasOwnProperty('vnUser')){
        delete storePoner.vnUser
      }
      this.$store.replaceState(storePoner)
    },
    eliminarS(index){
      console.log(index);
      // let storexx = JSON.parse(localStorage.getItem("vuenutStores"))
      this.storesx.splice(index,1)
      console.log(this.storesx);
      localStorage.setItem("vuenutStores", JSON.stringify(this.storesx))
      if(this.storesx.length==0){
        this.storesActivos = false
      }
      this.consultarStores()
    },
    eliminarStores(){
      localStorage.removeItem('vuenutStores')
      this.consultarStores()
    },
    consultarStores(){
      // console.dir(localStorage.getItem("vuenutStores"));
      if(localStorage.hasOwnProperty("vuenutStores")){
        this.storesx = JSON.parse(localStorage.getItem("vuenutStores"))

      }
    },
    guardarStore(){
      if(this.nameStore == ''){
        return
      }
      let jsonx = JSON.parse(JSON.stringify(this.storex),null,this.jsonSpace)
      jsonx.vnUser = {
        "name": this.nameStore,
      };

// ahora intentamos guardar jsonData en localstorage
if(localStorage.hasOwnProperty('vuenutStores')){
  console.log("ya esta solo add");
  let storexx = JSON.parse(localStorage.getItem("vuenutStores"))
  storexx.push(jsonx)
  localStorage.setItem("vuenutStores", JSON.stringify(storexx))
  console.dir(storexx);
} else {

  localStorage.setItem("vuenutStores", `[${JSON.stringify(jsonx)}]`)
  console.dir(localStorage);

}
this.consultarStores()
this.nombreActivo = false
this.nameStore = ''
this.$emit('click-copiar','Store guardado',false)
//ningún problema hasta ahora, y si la requerimos?

// var retrievedData = localStorage.getItem("jsonData")


// console.log(retrievedData)

    },
    importarx(e){
      let storex
      let _this = this
  var archivo = e.target.files[0];

  if (!archivo||archivo.name.search('.json')==-1) {
    this.$emit('change-import',false)
    return;
  }
  this.$emit('change-import',true)
  var lector = new FileReader();
  lector.onload = function(e) {
    var contenido = e.target.result;
    console.log(contenido);
    storex = JSON.parse(contenido)
    console.log(storex);
    // _this.$set(_this.$store,storex)
    _this.$store.replaceState(storex)
    _this.$parent.storeVuenut = storex
  };
  lector.readAsText(archivo);

    },
    exportarx(store){
      if(JSON.parse(JSON.stringify(store)).hasOwnProperty('vnUser')){
        delete store.vnUser
      }
      var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(store,null,this.jsonSpace));
      this.$refs.export.setAttribute('href','data:'+data)
      this.$refs.export.setAttribute('download','vuenut-store.json')
      this.$refs.export.click()

    },
    copiadox(){
      this.copiado = true
      setTimeout( ()=> {
        this.copiado = false
      }, 800);
    }
  }
}
</script>

<style lang="css" scoped>
/* .src= */
/* .logo-vuenut {
  background-image: url("./assets/img/vuenut.png");
  width: 100%;
  height: 50px;
} */
.con-btns-restaurar {
  transition: all .3s ease;
  opacity: 0;
  transform: translate(100%);
}

.con-btns-restaurar button{
  padding: 5px;
  cursor: pointer;
}
.restaurandox .con-btns-restaurar{
  opacity: 1;
  transform: translate(0);
}
.restaurandox span{
  width: calc(100% - 150px);
  font-size: 12px !important;
}
.aceptarR {
  background: rgb(var(--danger));
  border: 0px;
  color: rgb(var(--fondo));
  border-radius: 12px;
  padding-left: 10px !important;
  padding-right: 10px !important;
}
.cancelarR {
  background: rgb(var(--gris));
  border: 0px;
  color: rgb(var(--secondary));
  border-radius: 12px;
  padding-left: 10px !important;
  padding-right: 10px !important;
}
.btns-size {
  display: flex;
  align-items: center;
  justify-content: center;
}
.btns-size button {
  width: 27px;
  height: 27px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255,.0);
  background: rgb(var(--gris));
  color: rgb(var(--secondary));
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
  transition: all .3s ease;
  padding: 0px;
}
.btns-size button:disabled {
  opacity: .5;
  pointer-events: none;
}
.btns-size button i {
  font-size: 16px;
}
.btns-size button:hover {
  background: rgb(var(--primary)) !important;
  color: rgb(var(--fondo)) !important;
}
.con-logo {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
.con-logo img {
  width: 140px;
}
.con-img img{
  width: 28px;
  display: block;
  position: absolute !important;
  margin: 0px !important;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  filter: saturate(0%);
  transition: all .3s ease;
}
.con-img:hover {
  background: rgba(var(--gris)) !important;
}
.con-img:hover img {
  filter: saturate(100%);
  background: rgb(var(--gris)) !important;
}
.con-img a {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  display: block;
  justify-content: center;

}
.disabledx {
  opacity: .4;
  pointer-events: none;
}
.iconsx {
  display: flex;
  align-items: center;
  justify-content: center;
}
.con-config {
  width: 100%;
}
.con-config a {
  transition: all .3s ease;
  color: rgba(var(--secondary),.7);
}
.con-config a:hover {
  color: rgb(var(--primary)) !important;
}
.con-config ul li {
  width: 100%;
  padding: 10px;
  background: linear-gradient(to right, rgb(var(--gris)) 0%, rgb(var(--fondo)) 100%);
  color: rgba(var(--secondary),.7);
  font-weight: bold;
  cursor: pointer;
  transition: all .3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
}
.con-config ul li:hover {
  color: rgb(var(--primary)) !important;
  background: linear-gradient(to right, rgb(var(--gris)) 0%, rgb(var(--fondo)) 100%) !important;
}
.rojo:hover {
  color: rgb(var(--danger)) !important;
}
.color {
  color: rgb(var(--primary)) !important;

}
.color span {
  position: relative;
  height: 20px;
  width: 20px;
  display: block;
  margin-right: 10px;
  /* margin-left: 10px; */
}
.color input {
  border: 0px;
  background: rgb(var(--primary));
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  left: 0px;
  top: 0px;

}
.color i {
  font-size: 21px;
  display: block;
}
.con-config ul li>i {
  margin-left: 5px;

}
.con-stores {
  width: 100%;
  /* padding: 10px; */
  padding-right: 10px;
  margin-bottom: 10px;
}
.con-stores ul li {
  width: 100%;
  padding: 6px;
  padding-left: 15px;
  padding-right: 15px;
  /* background: rgb(250, 250, 250); */
  background: linear-gradient(to right, rgb(var(--gris)) 0%, rgb(var(--fondo)) 100%);
  cursor: pointer;
  border-top: 1px solid rgba(0, 0, 0, 0.050);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgb(var(--secondary));
  transition: all .2s ease;
  text-transform: capitalize;
  font-weight: bold;
}

.con-stores ul li:first-child {
  border-top: 0px
}
.con-stores ul li:hover {
  background: linear-gradient(to right, rgb(var(--gris)) 0%, rgb(var(--fondo)) 100%) !important;
  /* color:rgb(var(--fondo)); */
}
.con-icons {
  /* color: rgb(var(--secondary)) */
  display: flex;
  align-items: center;
  justify-content: center;
}
.con-icons i {
  border-radius: 50%;
  background: rgba(var(--gris));
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-left: 5px;
  transition: all .3s ease;
}
.con-icons i:hover {
  background: rgb(var(--primary)) !important;
  color: rgb(var(--fondo)) !important;
}
.eliminarUno:hover{
  background: rgb(var(--danger)) !important;
}
.importx input{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  opacity: 0;
  z-index: 500;
  cursor: pointer;
}
.copiado {
  transform: rotate(360deg);
}
.activo-menu {
  background: rgb(var(--primary)) !important;
  color: rgb(var(--fondo)) !important;
  border-radius: 50% 50% 0px 0px !important;
  transform: translate(0,10px);
  /* height: 60px !important; */
}
.con-ul-circles {
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
  position: relative;
  width: 100%;
}

.con-ul {
  width: 100%;
  overflow: hidden;
  height: 60px;
  position: relative;
}
.con-ul::after {
  width: 0%;
  position: absolute;
  bottom: 0px;
  background: rgb(147, 17, 140);
  height: 2px;
  content: '';
  z-index: 3000;
  left: 50%;
  transform: translate(-50%);
  background: rgb(var(--primary));
  transition: all .3s ease;
}
.activo-alguno::after {
  width: 100% !important;
}
.btn1 {
  position: absolute;
  left: 0px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(var(--fondo));
  color: rgba(var(--secondary),.6);
  border-right: 1px solid rgba(var(--gris));
  z-index: 2000;
  height: 100%;
  top: 0px;
  transition: all .3s ease;
  cursor: pointer;
}
.btn2 {
  top: 0px;
  position: absolute;
  right: 0px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(var(--fondo));
  color: rgba(var(--secondary),.6);
  border-left: 1px solid rgba(var(--gris));
  z-index: 2000;
  height: 100%;
  transition: all .3s ease;
  cursor: pointer;
}
.btn2:hover,.btn1:hover {
  color: rgb(var(--primary)) !important;
}
.no-va {
  opacity: 0;
  transform: translate(-100%);
}
.no-va2 {
  opacity: 0;
  transform: translate(100%);
}
.menu-circles {
  height: auto;
  overflow: hidden;
  position: relative;
  display: block;
  border-bottom: 1px solid rgba(0, 0, 0, 0.050);
  white-space: nowrap;
  overflow: auto;
  overflow-y: hidden;
  padding-left: 10px;
  padding-right: 10px;
  z-index: 100;
  /* padding: 8px; */
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
}
.menu-circles li{
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgb(var(--gris));
  color: rgba(var(--secondary));
  display: inline-block;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 10px;
  margin-top: 10px;
  /* float: left; */
  transition: all .3s ease;
  overflow: hidden;
}
.menu-circles li:not(.nombre-activo):hover {
  background: rgb(var(--primary)) !important;
  color: rgb(var(--fondo)) !important;
}
.menu-circles li i {
  font-size: 20px;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ul-flex ul{
  display: flex;
  align-items: center;
  justify-content: center;
}
.ul-flex .btn2,.ul-flex .btn1 {
  display: none;
}
.nombrex {
  width: 0px;
  overflow: hidden;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  height: 100%;
}

.nombrex input {
  padding: 7px;
  width: calc(100% - 80px);
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.0);
  padding-left: 15px;
  color: rgb(var(--secondary));
  background: rgb(var(--gris))
}
.nombrex button {
  border: 0px solid rgba(0, 0, 0, 0.0);
  width: 29px;
  color: rgb(var(--fondo));
  height: 29px;
  background: rgb(var(--primary));
  cursor: pointer;
  border-radius: 50%;
  margin-left: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}
.nombrex button:disabled {
  opacity: .4;
}
.nombrex .cancelar{
  background: rgb(var(--fondo));
  color: rgb(var(--danger))
}
.nombrex .guardar{
  /* border-radius: 0px 15px 15px 0px; */
}
.nombrex button i {
  font-size: 16px;
}
.nombre-activo{
  width: 250px !important;
  border-radius: 20px !important;
}
.nombre-activo>i {
  display: none !important;
  opacity: 0;
}
.nombre-activo .nombrex {
  opacity: 1;
  width: 100%;
  visibility: visible;
}
.no-sticky {
  color: rgb(var(--secondary),.4) !important;
}

</style>
