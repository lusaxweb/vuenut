<template lang="html">
  <div v-if="visible" class="con-my-functions">
    <ul>
      <li v-for="fun,index in functions" class="li-principal">
        <p>
          <span class="span-p" v-if="!fun.activos.editName" @click="fun.activos.editName = true">{{fun.name}}</span>
          <input v-else class="input-name" @blur="fun.activos.editName = false" @keypress.enter="fun.activos.editName = false" v-model="fun.name" type="text" name="" value="">
        </p>
        <ul class="ul-opciones">

          <li @click="fun.activos.edit=!fun.activos.edit" :class="{'activo-f':fun.activos.edit}" title="Edit">
            <i class="material-icons">mode_edit</i>
          </li>
          <li @click="ejecutarFunction(fun.functionx)" title="Run">
            <i class="material-icons">play_circle_filled</i>
          </li>
          <li @click="fun.startup = !fun.startup" :class="{'activo-f':fun.startup}" title="Run on startup">
            <i class="material-icons">power_settings_new</i>
          </li>
          <li @click="fun.activos.keyx=!fun.activos.keyx" :class="{'activo-f':fun.activos.keyx}" :title="`Execution keys ( Alt + ${fun.keyx} )`">
            <i class="material-icons">keyboard</i>
          </li>
          <li @click="exportarx(index)" title="Export function">
            <i class="material-icons">move_to_inbox</i>
          </li>
          <li  title="Import function">
            <input accept=".js" @change="importx($event,index)" type="file" name="" value="">
            <i class="material-icons">unarchive</i>
          </li>
          <li @click="eliminarF(index)"  class="dangerx" title="Delete">
            <i class="material-icons">delete_sweep</i>
          </li>
        </ul>

        <div v-if="fun.activos.keyx" class="con-key">
          <span>alt </span> + <span><input v-model="fun.keyx" type="text" maxlength="1"></span>
        </div>

        <div v-show="fun.activos.edit" class="con-function">
          <textarea spellcheck="false" @keydown.tab.prevent :ref="'textFunction'+index" :value="String(fun.functionx)" name="name"></textarea>
          <button class="cambiarbtn" @click="cambiarFunction(fun.functionx,index),guardarFunction(index)" type="button" name="button">Guardar</button>
        </div>
      </li>
    </ul>
    <a ref="export" href="#"></a>
  </div>
</template>

<script>
export default {
  props:{
    visible:{
      type:Boolean,
      default:false,
    }
  },
  data(){
    return {
      _this:this,
      map:{},
      thisx:"this",
      functions:[]
    }
  },
  created(){
    window._this = this
    // localStorage.removeItem('vuenutFunctions')
    this.consultarFunctions()


    if(this.functions){

    this.functions.forEach((item,index)=>{
      if(item.startup){
        this.ejecutarFunction(item.functionx)
      }


      if(item.keyx){
        document.addEventListener("keydown", this.keyx.bind(null, item.keyx), false);
        document.addEventListener("keyup", this.keyx.bind(null, item.keyx), false);
      }
    })

  }
  },
  watch:{
    functions:{
      handler(val, oldVal) {
        this.guardarFunction()
      },
      deep: true
    }
  },
  methods:{
    guardarFunction(index){
      let funxx = this.functions
      this.functions.forEach((item)=>{
        item.functionx = String(item.functionx)
      })
      // console.log(funxx);
      // return
      localStorage.setItem("vuenutFunctions", JSON.stringify(funxx))
    },
    consultarFunctions(){
      let functionsx = JSON.parse(localStorage.getItem('vuenutFunctions'))
      // console.log(functionsx);
      functionsx.forEach((item)=>{
        item.activos = {
          edit:false,
          keyx:false,
          editName:false
        }
      })
      this.functions = functionsx
      this.$parent.flength = functionsx.length
      if(functionsx.length == 0){
        this.$parent.myFunctions = false
      }
    },
    ejecutarFunction(funx){
      let funxx = eval(`(${funx})`)
      funxx()
      // console.log(funx);
    },
    eliminarF(index){
      console.log("ya esta solo add");
      let funxx = JSON.parse(localStorage.getItem("vuenutFunctions"))
      funxx.splice(index,1);
      localStorage.setItem("vuenutFunctions", JSON.stringify(funxx))
      // console.dir(funxx);
      this.consultarFunctions()
    },
    importx(e,index){
      let storex
      let _this = this
  var archivo = e.target.files[0];

  if (!archivo||archivo.name.search('.js')==-1) {
    this.$emit('change-import',false)
    return;
  }
  this.$emit('change-import',true)
  var lector = new FileReader();
  lector.onload = function(e) {
    var contenido = e.target.result;
    _this.functions[index].functionx = eval(`(${contenido})`)
  };
  lector.readAsText(archivo);
    },
    upx(){
      // this.key = []
      // this.map = {}
    },
    keyx(keyx){

    this.map[event.key] = event.type == 'keydown';

    this.functions.forEach((item)=>{

      if(item.keyx){
        if(this.map["Alt"] && this.map[item.keyx]){

          console.log("Alt "+ item.keyx);

          this.ejecutarFunction(item.functionx)

        }
      }
    })
    // this.map = {}

    // console.log(this.map);
      // var y = 0, l = this.key.length, i, t;
      // for(i = 0; i < l; i ++){
      //   if(this.key[i]){
      //     console.log(i);
      //   }
      // }

    },
    exportarx(index){
      let [funx] = this.$refs[`textFunction${index}`]

      var data = "text/json;charset=utf-8," + encodeURIComponent(funx.value);
      this.$refs.export.setAttribute('href','data:'+data)
      this.$refs.export.setAttribute('download','vuenut-function.js')
      this.$refs.export.click()

    },
    exportFunction(){
      console.log("export");
    },
    cambiarFunction(funx,index){
      let [textareax] = this.$refs[`textFunction${index}`]
      let value = textareax.value
      this.functions[index].functionx = eval(`(${value})`)
    }
  }
}
</script>

<style lang="css" scoped>
.span-p {
  border-bottom: 2px solid rgba(var(--secondary-vuenut),0);
  display: block;
}
.input-name {
  /* width: 100%; */
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: rgb(var(--secondary-vuenut));
  text-transform: capitalize;
  background: transparent;
  border: 0px;
  border-bottom: 2px solid rgb(var(--secondary-vuenut));
}
.con-key {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  color: rgb(var(--secondary-vuenut))
}
.con-key input {
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 25px;
  padding: 5px;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  color: rgb(var(--secondary-vuenut));
  font-size: 18px;
  padding-top: 1px;
  padding-bottom: 1px;
  transition: all .3s ease;
}
.cambiarbtn {
  width: 100%;
  background: rgb(var(--secondary-vuenut));
  border: 0px;
  padding: 6px;
  color: rgb(var(--fondo-vuenut));
  border-radius: 3px;
}
.cambiarbtn:disabled {
  opacity: .4;
}

.con-my-functions {
  width: 100%;
  display: block;
  max-height: 400px;
  overflow: auto;
}

.con-my-functions li {
  list-style: none;
}
.con-my-functions .li-principal {
  width: calc(100% - 10px);
  padding: 10px;
  background: rgb(236, 219, 180);
  float: left;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
  list-style: none;
  border-radius: 5px;
  background: rgb(var(--gris-vuenut));
  font-weight: bold;
  text-transform: capitalize;
}
.con-my-functions .li-principal > p {
  width: 100%;
  text-align: center;
  padding: 5px;
  color: rgb(var(--secondary-vuenut));
}
.ul-opciones {
  position:relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ul-opciones li {
  width: 35px;
  height: 35px;
  display:flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--secondary-vuenut));
  border-radius: 50%;
  background: rgb(var(--fondo-vuenut));
  cursor: pointer;
  margin: 4px;
  overflow: hidden;
  position: relative;
  transition: all .2s ease;
}
.ul-opciones li:hover {
  background: rgb(var(--secondary-vuenut));
  color: rgb(var(--fondo-vuenut))
}
.ul-opciones li input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.activo-f {
  color: rgb(var(--fondo-vuenut)) !important;
  background: rgb(var(--primary-vuenut)) !important;
}

.con-my-functions textarea {
  width: 100%;
  padding: 10px;
  height: 120px;
  resize: none;
  border: 0px;
  border-radius: 5px;
  color: rgb(var(--secondary-vuenut));
  background: rgb(var(--fondo-vuenut));
  margin-bottom: 0px;
  margin-top: 5px;
}
.dangerx:hover {
  background: rgb(var(--danger-vuenut)) !important;
  color: rgb(var(--fondo-vuenut)) !important
}
</style>
