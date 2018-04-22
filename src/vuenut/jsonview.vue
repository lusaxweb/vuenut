<template>
	<div class="con-json">
		<template class="jsonx" v-if="typeof( jsonxx ) === 'object' && ( maxDepth == 0 || ( currentDepth < maxDepth ) )">
			<div class="con-json-view">
			<a :class="{'jsonstring':jsonstringx}" class="a-json">
				<div :class="{
					'copiando':iconCopy
					}" title="Copiar Store" @click="copiar($event,null)" class=" btn-copy">
					<i  class="material-icons">{{iconCopy?'thumb_up':'my_location'}}</i>
				</div>
				<div :class="{
					'copiando':checkJ
					}" title="Copiar Store" @click="toggleJson(json)" class=" btn-json">
					<i class="material-icons">{{checkJ?'thumb_up':'content_copy'}}</i>
				</div>
				<div title="Cambiar Formato" @click="jsonstringx=!jsonstringx" class=" btn-jsonstring">
					<i class="material-icons">flip</i>
				</div>
				<span @click="opened = !opened" class="spanx" :class="{'activox':opened}">
					<i class="material-icons">{{opened?'remove':'navigate_next'}}</i>
				</span><span @click="opened = !opened" :class="{'activoxtext':opened}" class="spanName" style="color: rgb(var(--primary-vuenut))">{{ name }}</span>
			</a>

			<template v-if="opened">

				<jsonview
					v-for="k,index in jsonTotal"
					:key="k"
					:max-depth="maxDepth"
					:current-depth="currentDepth + 1"
					:json.sync="jsonstringx?JSON.stringify(jsonxx[ k ],null,2):json[ k ]"
					@copied-click="$listeners['copied-click']"
					:name="k"
					:jsonstring="jsonstringx"
				>
				</jsonview>

			</template>
			</div>
		</template>
		<template v-else>
			<!-- <span>{{ Array.isArray( json ) ? 'array' : typeof( json ) }}</span> -->
			<!-- :data-clave="name" -->
			<div  class="con-hijos">
				<div :class="{
					'copiando':iconCopy
					}"
					title="Copiar Ruta"

					@click="copiar($event,name)"
					class="btn-copiar">
					<i  class="material-icons">{{iconCopy?'thumb_up':'my_location'}}</i>
				</div>
				<!-- :data-clave="name" -->
				<span class="con-edit-text" v-show="!jsonstring">
					<b class="b">{{ name + ": "}} </b>
					<a v-if="!editandox" @click="editandox=true">
						{{ jsonxx }}
					</a>
					<div v-else id="editando" class="editando eee">
						<!--  -->
						<input @keypress.enter="editandox=false" v-if="typeof json != 'boolean'" @blur="editandox=false" v-focus="editandox" :value="json" @input="inputx($event.target.value)" type="text">
						<!-- <input v-else type="checkbox" :value="json == true" @blur="editandox=false" v-focus="editandox" @change="inputx($event.target.checked,true)"> -->
						<!-- <a v-else href="#">{{json}}</a> -->
						<!--  -->
						<button class="btn-boolean material-icons" @blur="editandox=false" v-focus="editandox" v-else type="button"  name="button" @click="inputx(!json,true)">{{json?'check_box':'check_box_outline_blank'}}</button>

					</div>
				</span>
				<span v-show="jsonstring" >
					<b class="b">{{ name }}</b>:<code><pre>{{jsonxx}}</pre></code>
				</span>
				<!-- <input v-if="editando" v-model="json" type="text" name="" value=""> -->
			</div>
			<!-- <span>{{ typeof( json ) == 'object' ? ( Object.keys( json ).length + " items" ) : json }} </span> -->
		</template>

	</div>
</template>

<script>
export default {
	name:	'jsonview',
	props:	{
	json: {},
	name: {
		default: "state"
	},
	maxDepth: {
		default: 0
	},
	currentDepth:{
		default: 0
	},
	jsonstring:{
		type:Boolean,
		default:false,
	}
 },
 directives: {
  focus: {
    // directive definition
    inserted: function (el) {
      el.focus()
    }
  }
},
 data()	{
	return {
		editandox:false,
		iconCopy:false,
		opened: false,
		check:false,
		checkJ:false,
		editando:false,
		jsonxx:this.json,
		jsonModel:this.json,
		jsonstringx:this.jsonstring,
		jsonSource:[]
	}
},
mounted(){
	// console.log(this.$listeners);
},
	watch:{
		json(){
			this.jsonxx = this.json
		}
	},
	computed:{
		jsonTotal(){
			const isNull = (value) => value === null;
			return isNull( this.json )?{}:Object.keys( this.json )
		}
	},
	methods:{
		inputx(value,booleanx){
			// console.log(this);
			if(booleanx){
				console.log(value);
				this.$emit('update:json', value)

			} else {

				this.$emit('update:json', value)
			}
		},
		cambiarString(json){
			// console.log("click");
		},
		toggleJson(jsonR){
			// console.log(JSON.stringify(jsonR));
			// Crea un campo de texto "oculto"
			var aux = document.createElement("input");

			// Asigna el contenido del elemento especificado al valor del campo
			aux.setAttribute("value", JSON.stringify(jsonR));
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

			// alertify.success("Store Copiado")
		},
		copiar(evt,name){
			this.$emit('copied-click')
			console.dir(evt);
			let clave = name
			this.jsonSource = []
			if(name){
				this.jsonSource.push(clave)

			}
			this.recorreJson(evt.target)
			let jsonFinal = JSON.parse(JSON.stringify(this.jsonSource))

			let jsonCopiar = "this.$store"

			jsonFinal.forEach((item)=>{
				// console.log();
				if(Number.isInteger(Number(item))){
					jsonCopiar += '['+item+']'
				} else {
					jsonCopiar += '.'+item
				}

			})
			// console.log("jsonCopiar>>>>>>>>>>>>>>>>>>>>");

			this.copiarPortapapeles(jsonCopiar)

			this.iconCopy = true
			setTimeout( ()=> {
					this.iconCopy = false
			}, 800);

		},
		recorreJson(json){


			if(json.parentNode.className != 'arbolJson'){
				if(json.className == 'con-json-view'){
					this.jsonSource.unshift(json.querySelector('.a-json').querySelector('.spanName').innerText)
				}
				// console.log(json);
				this.recorreJson(json.parentNode)
			}

				},
		copiarPortapapeles(texto){
			// Crea un campo de texto "oculto"
			var aux = document.createElement("input");

			// Asigna el contenido del elemento especificado al valor del campo
			aux.setAttribute("value", texto);
			// arrayTextos = []
			// Añade el campo a la página
			document.body.appendChild(aux);

			// Selecciona el contenido del campo
			aux.select();

			// Copia el texto seleccionado
			document.execCommand("copy");

			// Elimina el campo de la página
			document.body.removeChild(aux);

			this.check = true

			setTimeout(() => {
				this.check = false
			}, 1000);
		}
	},
}
</script>
<style lang="css" scoped>
.btn-boolean {
	width: 19px;
	height: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 21px;
	border: 0px;
	background: transparent;
	overflow: hidden;
	color: rgb(var(--secondary-vuenut));
	transition: all .3s ease;
	margin-left: 5px;
	display: block;
	float: left;
	cursor: pointer;
}
.editando {
	position: relative;
	width: 100%;
	display: block;
}
.editando input{
	font-size: 16px;
	color: rgb(var(--secondary-vuenut));
	font-weight: bold;
	border: 0px;
	padding-left: 5px;
	border-bottom: 2px solid rgb(var(--secondary-vuenut)) !important;
	width: auto;
	transition: all .3s ease;
}
.con-edit-text {
	/* display: flex !important; */
	/* align-items: center; */
	/* justify-content: flex-start; */
}
.con-edit-text b {
	float: left;
	display: block;
	border-bottom: 2px solid rgba(var(--gris-vuenut),0) !important;
}
.con-edit-text a {
	display: block;
	float: left;
	padding-left: 5px;
	/* border-bottom: 2px solid rgba(var(--gris-vuenut),0) !important; */
}
.copiando i{
	transform: rotate(360deg);
}
.con-json i {
	/* transition: all .2s ease; */
	font-size: 18px;
	display: block;
}
.activoEdit {
	color: rgb(var(--primary-vuenut));
}
.con-hijos:hover .btn-copiar {
	opacity: 1;
	left: 5px;
}
.con-hijos:hover .btn-editar {
	opacity: 1;
	left: 27px;
}
.con-json a:hover .btn-copy {
	opacity: 1;
	left: 30px;
}
.con-json a:hover .btn-json {
	opacity: 1;
	left: 55px;
}
.con-json a:hover .btn-jsonstring {
	opacity: 1;
	left: 80px;
}
.con-hijos span {
	transition: all .2s ease;
	width: 100%;
	display: block;
}
.con-hijos:hover span {
	padding-left: 20px;
}
.btn-copiar {
	position: absolute;
	left: -22px;
	cursor: pointer;
	opacity: 0;
	transition: all .2s ease;
}
.btn-editar {
	position: absolute;
	left: 22px;
	cursor: pointer;
	opacity: 0;
	transition: all .2s ease;
}
.btn-json {
	padding: 2px;
	border-radius: 4px;
	position: absolute;
	left: -10px;
	cursor: pointer;
	opacity: 0;
	transition: all .2s ease;
}
.btn-copy {
	padding: 2px;
	border-radius: 4px;
	position: absolute;
	left: -10px;
	cursor: pointer;
	opacity: 0;
	transition: all .2s ease;

}
.btn-jsonstring {
	padding: 2px;
	border-radius: 4px;
	position: absolute;
	left: -10px;
	cursor: pointer;
	opacity: 0;
	transition: all .2s ease;

}
.btn-json:hover,.btn-jsonstring:hover,.btn-copy:hover {
	color: rgb(var(--primary-vuenut)) !important;
}
.btn-copiar:hover {
	color: rgb(var(--primary-vuenut)) !important;
}
.con-json {
	height: 100%;
	margin-left: 10px;
	padding: 5px;
	color: rgb(var(--secondary-vuenut));
}
.con-json a {
	cursor: pointer;
	position: relative;
	display: block;
	/* background: rgb(24, 97, 89); */
	display: flex;
	align-items: center;
	transition: all .2s ease;
	/* justify-content: center; */
}
.con-json a .spanName {
	transition: all .2s ease;
}
.con-json a:hover .spanName {
	margin-left: 75px;
}
.con-json a:hover .spanx:not(.activox) {
	border: 1px solid rgb(var(--primary-vuenut)) !important;
	color: rgb(var(--primary-vuenut)) !important;
}
.jsonx {
	padding: 5px;
}
.spanx {
	width: 24px;
	height: 24px;
	display: block;
	background: rgb(var(--gris-vuenut));
	border-radius: 50%;
	float: left;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	font-size: 14px;
	margin-right: 8px;
	transition: all .2s ease;
}
.spanx::before {
	transition: all .2s ease;
}
.activox {
	background: rgb(var(--primary-vuenut));
	color: rgb(var(--fondo-vuenut));
}
.activoxtext {
	font-weight: bold;
}
.con-hijos {
	border-left: 2px solid rgb(240, 240, 240);
	padding: 5px;
	padding-left: 10px;
	position: relative;
	cursor: default;
	display: flex;
	align-items: center;
}
.check {
	background: rgb(var(--color-vuenut-success));
	color: rgb(var(--fondo-vuenut)) !important;
	font-size: 12px;
	padding: 3px;
}
{

}
.jsonstring .btn-copy {
	opacity: 1;
	left: 30px;
}
.jsonstring .btn-json {
	opacity: 1;
	left: 55px;
}
.jsonstring .btn-jsonstring {
	opacity: 1;
	left: 80px;
}
.jsonstring .spanName {
	margin-left: 75px;
}
.jsonstring .btn-jsonstring {
	background: rgb(var(--primary-vuenut));
	color: rgb(var(--fondo-vuenut));
	padding: 2px;
	border-radius: 4px;
}
</style>
