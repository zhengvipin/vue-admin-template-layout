<template>
  <div :class="{'vab-top-bar':true,'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="false" />
    <vab-avatar />
    <div class="menu-container">
      <el-menu
        :default-active="activeMenu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="horizontal"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from '../Sidebar/Logo'
import SidebarItem from '../Sidebar/SidebarItem'
import VabAvatar from '../VabAvatar'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo, VabAvatar },
  data() {
    return {
      ops: {
        scrollPanel: {
          scrollingY: false
        },
        bar: {
          // keepShow: true,
          size: '6px',
          background: '#c7c9cc',
          opacity: 0.4
        },
        scrollButton: {
          enable: true,
          background: '#c7c9cc'
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    }
  }
}
</script>

<style scoped>

</style>
