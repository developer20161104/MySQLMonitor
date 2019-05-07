<template>
  <div class="wrapper">
    <Head></Head>
    <InterfaceLayout></InterfaceLayout>
    <!-- 必须实现路由嵌套-->
    <div class="content-box" :class="{'content-collapse':collapse}">
      <div class="content">
        <transition name="move" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Head from './Head.vue'
import InterfaceLayout from './InterfaceLayout.vue'
import bus from './bus.js'
export default {
  name: 'Home',
  data () {
    return {
      collapse: false
    }
  },
  components: {
    InterfaceLayout, Head
  },
  created () {
    bus.$on('collapse', msg => {
      this.collapse = msg
    })
  }
}
</script>
