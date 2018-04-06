<template lang="html">
  <div class="contiene-tabs">

  <div :class="{'vertical':orientation=='vertical','numberBtns':type=='number'}" class="con-tabs">
    <div class="con-menu-tabls">
      <ul :class="{'linea':theme=='linea','position_center':position=='center'}" class="ul-tabls">
        <li v-for="tab,index in tabs">
          <button :class="{'primary-these':tabVisible==index&&theme!='linea','estasx':tabVisible==index&&theme=='linea','primary-shadow':theme=='shadow'||theme==undefined}" @click="mostarTab(index)" type="button" name="button">{{type=='number'?index+1:tab.text}}</button>
        </li>
      </ul>
    </div>
    <div :class="{'con-btns-slot':btns}" class="con-slot">
      <div class="con-un-slot">
        <slot v-if="tabVisible==index" v-for="tab,index in tabs" :name="index">
          <slot name="btns"></slot>
        </slot>
        <!-- <div v-if="btns" class="btns-slot">
        </div> -->
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props:[
    "tabs",
    "theme",
    "position",
    "type",
    "orientation",
    "btns"
  ],
  data(){
    return{
      tabVisible:0,
    }
  },
  methods:{
    mostarTab(index){
      this.tabVisible = index
    }
  }
}
</script>

<style lang="css" scoped>
.contiene-tabs {
  max-width: 100%;
  display: flex;
  justify-content: center;
}
.con-tabs {
  max-width: 1000px;
  width: 100%;
  /* width: 1000px; */
}
.con-menu-tabls {
  width: 100%;
  padding: 20px;

}
.ul-tabls {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content:flex-start;
  position: relative;
  flex-flow:wrap;
}
.position_center {
    justify-content: center;
}
.ul-tabls li{
  position: relative;
  margin: 4px;
}
.con-slot {
  width: 100%;
  padding: 20px;
  max-height: 100%;
  overflow: auto;
  position: relative;
}

.linea {

}
.linea li {
    margin: 0px;
}
.linea li button {
  border-radius: 0px;
  position: relative;
  background: transparent !important;
  padding: 20px;
}
.linea li button::after {
  width: 0%;
  height: 2px;
  background: rgb(var(--color-primary));
  content: '';
  bottom: 0px;
  left: 0px;
  position: absolute;
  transition: all .3s ease;
  left: 50%;
  transform: translate(-50%);
}
.linea li button.estasx::after {
  width: 100%;
}
.linea li button.estasx {
  color:rgb(var(--color-primary));
}
.vertical {
  display: flex;
  align-items:stretch;
  position: relative;
  background: rgb(255, 255, 255);
}
.vertical .con-menu-tabls {
  width: auto;
  padding: 0px;
}
.vertical .con-menu-tabls li {
  margin: 0px;
}
.vertical .con-menu-tabls li button {
  border-radius: 0px;
  margin: 0px;
}
.vertical .ul-tabls {
  display: flex;
  flex-direction: column;
  flex-flow:column;
  border-radius: 5px;
  overflow: auto;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 65px;
  min-height: 200px;
}
.vertical .con-slot {
  position: relative;
  width: calc(100% - 70px);
  margin-left: 70px;
}
.numberBtns ul button {
  padding-left: 15px;
  padding-right: 15px;
  padding: 20px;
}
.btns-slot {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content:flex-end ;
}
.btns-slot button {
  margin: 10px;
}
.con-btns-slot {
  padding-bottom: 0px;
}
</style>
