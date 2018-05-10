<p align="center">
<a href="https://lusaxweb.github.io/vuenut.org/">
<img src="https://lusaxweb.github.io/vuenut.org/css/images/vuenut01.png" alt="vuenut">
</a>
  </p>


# Introduction

[Vuenut](https://lusaxweb.github.io/vuenut.org/) is a Vue.js component that visualizes, manipulates, and saves state data from [vuex](https://vuex.vuejs.org/en/).

<p align="center">
<a href="https://lusaxweb.github.io/vuenut.org/">
<img src="https://github.com/lusaxweb/vuenut/blob/master/src/public/img/vuenut.gif" alt="vuenut">
</a>
</p>

## Advantage

If your application uses a [vuex](https://vuex.vuejs.org/en/) store to maintain state, vuenut gives you the following advantages:

- Easy to implement the store
- Does not affect other libraries or components
- Saves settings in the browser storage
- Easy to add to any project with either webpack or CDN
- A very nice and intuitive interface

## What can you do with vuenut?

This component is designed to improve workflow and help programmers who love simple fast and effective tools. You can do great things with vuenut with the just a click.

- Visualize the entire store as a tree of nodes so as not to get lost
- Get the final route of the data to add it with a simple `ctl v`
- Edit the value you want and where you want by changing the data in the whole application
- Save the store to reuse it at any time and return to that point of the system
- Export the current store to give it to another developer or import it later
- Import a store
- And many more incredible features

# Demo

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

# install with NPM
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
