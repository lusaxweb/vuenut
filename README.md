<p align="center">
<img src="https://github.com/lusaxweb/vuenut/blob/master/src/public/img/vuenut.png" alt="vuenut">
  </p>


# Introduction

Vuenut is a development tool to make work with vuex much easier with features designed for a fast and fluid development.

# demo

[Codepen](https://codepen.io/lusaxweb/pen/dmLEKv)


# Browser Support
Recent versions of Firefox, Chrome, Edge, Opera and Safari. IE10+

# Quick-start CDN

```html
<!DOCTYPE html>
<title>vuenut demo</title>
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vuenut/dist/vuenut.umd.js"></script>
<link rel="stylesheet" href="https://unpkg.com/vuenut/dist/vuenut.css">

<div id="app">
  <vuenut :store="$store.state"/>
</div>

<script>
new Vue({
}).$mount('#app')
</script>
```

# CDN

- https://unpkg.com/vuenut/dist/vuenut.umd.js
- https://unpkg.com/vuenut/dist/vuenut.css

# install en Proyecto NPM
``` bash
# npm
npm install vuenut
```

``` bash
# yarn
yarn add vuenut
```

## Use

```javascript
import Vue from 'vue'
import Vuenut from 'vuenut'

import 'vuenut/dist/vuenut.css'
Vue.use(Vuenut)
```
## Become a Patron

Vuenut is an open source MIT project if you want to contribute to keep improving, If you are interested in supporting this project, please consider becoming a patron. [[patron](https://www.patreon.com/bePatron?c=1567892)]

## Lusaxweb

This library was created and is supported by [Lusaxweb](http://www.lusaxweb.com.ve/)
