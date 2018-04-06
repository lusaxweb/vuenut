<template lang="html">
  <div :class="{'abierto':abierto,'ancho100':resize,'prod':prod&&p!='lusaxweb'}" class="con-devTools">
    <div @click="abierto=!abierto,configurando=false" class="btn-lwDevTools">
      <span :class="{'flaticon-right-arrow':!abierto,'flaticon-left-arrow':abierto}"></span>
    </div>
    <!-- <input v-model="buscando" type="text" name="" value="" placeholder="Buscar"> -->
    <div v-if="prod?p=='lusaxweb':true" @click="configurando=!configurando" :class="{'flaticon-close':configurando,'flaticon-settings':!configurando}" class=" btn-setings">
    </div>
    <transition name="togglex">
    <div v-if="configurando" class="con-setings">
      <h3>Configuraciones</h3>
      <ul>
        <li ><span @click="guardando = !guardando" :class="{'flaticon-close':guardando,'flaticon-technology-3':!guardando}"></span><span @click="guardando = true" v-if="!guardando">Guardar Store</span><input @keypress.enter="guardarStore($event.target.value)" placeholder="Nombre del store" v-if="guardando" type="text" name="" value="">  </li>
        <li @click="$store.state.prelaciones=!$store.state.prelaciones"><span class="flaticon-file"></span>prelaciones <span>{{$store.state.prelaciones}}</span></li>
        <li @click="obtenerText"><span class="flaticon-file"></span>Importar Store</li>
        <li @click="obtenerText"><span class="flaticon-file"></span>Text Store Actual</li>
        <li v-if="!ventana" @click="resize=!resize"><span :class="{'flaticon-maximize':!resize,'flaticon-minimize':resize}"></span>Resize</li>
        <li @click="abrirVentana(),abierto=false"><span class="flaticon-external"></span>Ventana externa</li>
        <li @click="hijos=!hijos"><span class="flaticon-grid"></span>Mis Store</li>
        <ul v-if="hijos" class="ul-hijo">
          <li v-if="misCookies.length!=0" v-for="store,index in misCookies">
            <span @click="borrarCookie(store.name,index)" class="flaticon-interface spanClick"></span>
            <span @click="ponerStore(store.name,index)" class="flaticon-upload spanClick"></span>
            <!-- <span @click="cambiarStore(store.name,index)" class="flaticon-arrows-2"></span> -->
            <span @click="verpopupx(store.name,index)" class="flaticon-eye-outline spanClick"></span>
            <!-- <span class="flaticon-draw"></span> -->
            <span>{{store.name}}</span>
          </li>
          <li class="no-hay" v-if="misCookies.length==0">No hay ningun store Guardado</li>
        </ul>

      </ul>
    </div>
  </transition>
  <div class="con-json-x">
    <div v-if="p!='lusaxweb'&&prod" class="con-clave">
      <label for="password">Password</label>
      <input v-model="p" id="password" placeholder="Password" type="password" name="" value="">
    </div>
    <h2 v-if="prod?p=='lusaxweb':true">LwDevTools</h2>
    <div v-if="prod?p=='lusaxweb':true" class="contiene-el-json">
      <tabs :tabs="detallesTabs" theme="linea" position="center">
        <div slot="0">
          <lw-json :json.sync="this.$store.state">
          </lw-json>
        </div>
        <div slot="1">
          <pre>
            {{this.$store.state}}
          </pre>
        </div>
      </tabs>

  </div>
    <popup :visible.sync="verpopup" :title="nameStore">
      <tabs :tabs="detallesTabs">
        <div slot="0">
          <lw-json :json="jsonPopup">
          </lw-json>
        </div>
        <div slot="1">
          <pre>

            {{jsonPopup}}
          </pre>
        </div>
    </tabs>
    </popup>
  </div>
</div>
</template>

<script>
import tabs from './tabs.vue'
import lwJson from './lwJson.vue'
import popup from './popup.vue'
import $ from 'jquery'
import alertify from 'alertifyjs'
export default {
  components:{
    lwJson,
    popup,
    tabs,
  },
  props:[
    "json",
    "prod"
  ],
  data(){
    return {
      p:'',
      nameStore:"Store",
      ventana:false,
      resize:false,
      abierto:false,
      configurando:false,
      hijos:false,
      verpopup:false,
      jsonx:this.json,
      buscando:null,
      guardando:false,
      misCookies:null,
      jsonPopup:null,
      detallesTabs:[
        {
          text:"Arbol Store"
        },
        {
          text:"Texto Store"
        }
      ],
    }
  },
  created(){

    this.getStores()

    if(this.$router.currentRoute.path=="/ventana"){
      this.resize = true
      this.abierto = true
      this.ventana = true
    }
  },
  methods:{
    abrirVentana(){

    // window.open("http://localhost:8080/#/ventana", "LwDevTools", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, top=50, left=50, width=400, height=600");
    function popup(url,ancho,alto) {
var posicion_x;
var posicion_y;
posicion_x=(screen.width/2)-(ancho/2);
posicion_y=(screen.height/2)-(alto/2);
window.open(url, "leonpurpura.com", "width="+ancho+",height="+alto+",menubar=0,toolbar=0,directories=0,scrollbars=no,resizable=no,left="+posicion_x+",top="+posicion_y+"");
}
popup("http://localhost/limedInac/autogestion#/ventana",400,600)

    },
    obtenerText(){
      var aux = document.createElement("input");

      // Asigna el contenido del elemento especificado al valor del campo
      aux.setAttribute("value", JSON.stringify(this.$store.state));
      // Añade el campo a la página
      document.body.appendChild(aux);

      // Selecciona el contenido del campo
      aux.select();

      // Copia el texto seleccionado
      document.execCommand("copy");

      // Elimina el campo de la página
      document.body.removeChild(aux);

      this.checkJ = true

      setTimeout(() => {
        this.checkJ = false
      }, 1000);

      alertify.success("Store Copiado")
    },
    verpopupx(nombre,index){
      let json = localStorage.getItem(nombre)
      this.jsonPopup = JSON.parse(json);
      this.verpopup=true
    },
    ponerStore(nombre,index){
      // console.log(this.$store.state);
      this.nameStore = nombre
      let json = JSON.parse(localStorage.getItem(nombre))
      // for (var clave in json) {
      //   this.$store.state[clave] = json[clave]
      // }
      // Object.assign(this.$store.state.section1, json.section1)
      this.$store.replaceState(json)
      // this.$store.state.section1 = JSON.parse(json).section1
      alertify.success('Store Asignado Satisfactoriamente');
    },
    borrarCookie(name){
      var _this = this
      alertify.confirm("Estas seguro de <b>Eliminar</b> este Store.",
  function(){
    localStorage.removeItem(name)
    alertify.error('Store Eliminado');
    // document.cookie = name+"=;expires=thu, 01 Jan 1970 00:00:00 UTC;"
    _this.getStores()
  });

    },
    guardarStore(value){
      console.log(this.$store.state);
      localStorage["Store "+value] = JSON.stringify(this.$store.state);
      console.log("localStorage---->",localStorage.getItem(value));
      this.getStores()
      this.guardando = false
    },
    getStores(){
      // // //agregar cookie
      // // document.cookie = "nombre=luis"
      // // //eliminar cookie
      // // document.cookie = "nombre=;expires=thu, 01 Jan 1970 00:00:00 UTC;"
      // var c = document.cookie.split(";");
      // // for (var i = 0; i < cookieArray.length; i++) {
      // //   var c = cookieArray[i]
      // //   while (c.charAt(0)==" "){
      // //     c = c.substring(1);
      // //   }
      // var c2 = []
      // c.forEach((item)=>{
      //   let str = String(item);
      //   let name = str.substring(-1,str.indexOf("=")).trim();
      //   let json = str.substring(str.indexOf("=")+1, str.length);
      //   console.log(name);
      //   if(name!=""){
      //     c2.push({
      //       name:name,
      //       store:json
      //     })
      //   }
      // })
      // // }
      // console.log(c2);
      var misStore = []
      for (var clave in localStorage) {
        if(clave.search("Store")!=-1){
          console.log("clave-->",clave);
          misStore.push({
            name:clave,
            store:localStorage[clave]
          })
        }
      }
      this.misCookies = misStore
    },
  },
  computed:{
    buscarx(){
      function quitaacentos(s) {
var r=s.toLowerCase();
            r = r.replace(new RegExp(/\s/g),"");
            r = r.replace(new RegExp(/[àáâãäå]/g),"a");
            r = r.replace(new RegExp(/[èéêë]/g),"e");
            r = r.replace(new RegExp(/[ìíîï]/g),"i");
            // r = r.replace(new RegExp(/ñ/g),"n");
            r = r.replace(new RegExp(/[òóôõö]/g),"o");
            r = r.replace(new RegExp(/[ùúûü]/g),"u");
 return r;
}
var json_x = JSON.parse(JSON.stringify(this.jsonx))
if(this.buscando != null){

      if (Array.isArray(json_x)) {
         json_x.filter((item) => {
           return item.search(this.buscando);
         })
} else if (typeof json_x === 'object') {
       for (var clave in json_x) {
         console.log(clave.search(this.buscando));
        if(clave.search(this.buscando)){
          delete json_x[clave]
        }
       }
} else {
 // puede ser undefined, string, number o boolean.
}
}
return json_x
},
  },
}
</script>

<style lang="css" scoped>
.con-clave {
  position: absolute;
  width: 100%;
  height: 100%;
  display: block;
  left: 0px;
  top: 0px;
  background: rgb(255, 255, 255);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.con-clave input{
  margin: 10px;
}
.prod .btn-lwDevTools{
  opacity: 0 !important;
}
h2 {
  padding: 10px;
  text-align: center;
  width: 100%;
  font-weight:lighter;
}
h3 {
  padding: 10px;
  text-align: center;
  width: 100%;
  font-weight:lighter;
}
.ancho100 {
  width: 100% !important;
  height: 100%;
}
.btn-lwDevTools {
  position: absolute;
  right: 0px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(100%);
  background: rgb(255, 255, 255);
  box-shadow: 5px 0px 10px 0px rgba(0, 0, 0, 0.1);
  bottom: 0px;
  cursor: pointer;
  border-radius: 0px 30px 0px 0px;
  transition: all .3s ease;
}
.btn-lwDevTools:hover {
  padding-left: 30px;
}
.btn-lwDevTools:hover span {
  color: rgb(var(--color-primary));
}
.con-json-x {
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
}
.contiene-el-json {
  max-height: 100%;
  overflow: auto;
  position: relative;
}
.togglex-enter-active, .togglex-leave-active {
  transition: all .5s;
  /* transform: translate(-100%); */
}
.togglex-enter, .togglex-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translate(0,-100%);
}
h2 {
    position: relative;
    padding-top: 20px;
    width: 100%;
}
.no-hay {
  pointer-events: none;
  color: rgba(0, 0, 0,.4)
}
.spanClick {
  transition: all .3s ease;
}
.spanClick:hover {
  color: rgb(var(--color-primary));
}
.spanClick:nth-child(1):hover{
  color: rgb(var(--color-danger))
}
.con-devTools {
  width: 400px;
  left: 0px;
  top: 0px;
  background: rgb(255, 255, 255);
  height: 100vh;
  position: fixed;
  z-index: 100000;
  box-shadow: 3px 0px 15px 0px rgba(0, 0, 0,.1);
  display: flex;
  flex-direction: column;
  transform: translate(-100%);
  transition: all .3s ease;
}
.abierto {
  transform: translate(0%);
}
.btn-setings {
  position: absolute;
  top: 7px;
  right: 0px;
  width: 50px;
  height: 50px;
  background: rgb(245, 245, 245);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 21px;
  border-radius: 10px 0px 0px 10px;
  color: rgba(0, 0, 0,.6);
  cursor: pointer;
  z-index: 100;
  transition: all .3s ease;
}
.btn-setings:hover {
  width: 70px;
}
.con-setings {
  position: absolute;
  background: rgb(245, 245, 245);
  /* transform: translate(0,100%); */
  width: 100%;
  transition: all .3s ease;
  display: block;
  overflow: hidden;
  overflow: auto;
  z-index: 50;
  padding-bottom: 10px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
}
.con-setings li {
  padding: 10px;
  cursor: pointer;
  transition: all .3s ease;
  border-left: 0px;
}
.con-setings li:hover {
  background: rgb(235, 235, 235);
  border-left: 5px solid rgb(var(--color-primary));
  color: rgb(var(--color-primary));
}
.con-setings li span {
  margin-right: 10px;
}
.ul-hijo {
  box-shadow:inset 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
}
</style>
