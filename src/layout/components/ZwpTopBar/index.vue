<template>
  <div :class="{'zwp-top-bar':true,'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="false" />
    <zwp-avatar />
    <div class="menu-container">
      <vue-scroll :ops="ops">
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
      </vue-scroll>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from '../Sidebar/Logo'
import SidebarItem from '../Sidebar/SidebarItem'
import ZwpAvatar from '../ZwpAvatar'
import variables from '@/styles/variables.scss'
import VueScroll from 'vuescroll'

export default {
  components: { SidebarItem, Logo, ZwpAvatar, VueScroll },
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
  },
  mounted() {
    console.log(this.permission_routes)
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

$logoWidth: 300px;
$avatarWidth: 160px;

.zwp-top-bar {
  width: 100%;
  background-color: $navbarBg;
  @include clearfix;

  &.has-logo {
    .sidebar-logo-container {
      float: left;
      width: $logoWidth;
      @media screen and (max-width: 760px) {
        display: none;
      }
    }

    .menu-container {
      width: calc(100% - #{$logoWidth} - #{$avatarWidth});
      @media screen and (max-width: 760px) {
        width: calc(100% - #{$avatarWidth});
      }
    }
  }

  .menu-container {
    float: right;
    width: calc(100% - #{$avatarWidth});
    height: $navbarHeight;

    .el-menu {
      display: flex;
      flex-wrap: nowrap;
      justify-content: flex-end;
      border-bottom: none;

      ::v-deep .el-menu-item {
        height: $navbarHeight;
        line-height: $navbarHeight;

        &.is-active {
          border-bottom-width: 4px;
          border-bottom-style: solid;
        }
      }

      ::v-deep .el-submenu {
        .el-submenu__title {
          height: $navbarHeight;
          line-height: $navbarHeight;
        }

        &.is-active {
          .el-submenu__title {
            border-bottom-width: 4px;
            border-bottom-style: solid;
          }
        }
      }
    }
  }

  .zwp-avatar {
    float: right;
    width: #{$avatarWidth};
    text-align: right;
  }
}
</style>
