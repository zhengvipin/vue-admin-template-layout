<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar v-if="!horizontalMode" class="sidebar-container" />
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <vab-top-bar v-if="horizontalMode" />
        <navbar v-else />
        <tags-view v-if="needTagsView" />
      </div>
      <div class="app-main">
        <vab-ad v-if="vadAd" />
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, VabTopBar, AppMain, VabAd, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    VabTopBar,
    AppMain,
    VabAd,
    TagsView
  },
  mixins: [ResizeMixin],
  data() {
    return { oldHorizontalMode: undefined }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader,
      vadAd: state => state.settings.vadAd,
      horizontalMode: state => state.settings.horizontalMode
    }),
    classObj() {
      return {
        hideSidebar: !this.horizontalMode && !this.sidebar.opened,
        openSidebar: !this.horizontalMode && this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted() {
    this.oldHorizontalMode = this.horizontalMode
    const userAgent = navigator.userAgent
    if (userAgent.includes('Juejin')) {
      this.$baseAlert(
        'vue-admin-beautiful不支持在掘金内置浏览器演示，请手动复制以下地址到浏览器中查看http://mpfhrd48.sanxing.uz7.cn/vue-admin-beautiful'
      )
    }
    this.handleResize()
  },
  beforeMount() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    handleIsMobile() {
      return document.body.getBoundingClientRect().width - 1 < 992
    },
    handleResize() {
      if (!document.hidden) {
        const isMobile = this.handleIsMobile()
        if (isMobile) {
          // 横向布局时如果是手机端访问那么改成纵向版
          this.$store.dispatch('settings/changeSetting', {
            key: 'horizontalMode',
            value: false
          })
        } else {
          this.$store.dispatch('settings/changeSetting', {
            key: 'horizontalMode',
            value: this.oldHorizontalMode
          })
        }

        this.$store.dispatch(
          'app/toggleDevice',
          isMobile ? 'mobile' : 'desktop'
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%;
  transition: width 0.28s;
}

.openSidebar .fixed-header {
  width: calc(100% - #{$sideBarWidth})
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}

.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - #{$navbarHeight});
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: $navbarHeight;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - #{$navbarHeight} - 34px);
  }

  .fixed-header + .app-main {
    padding-top: calc(#{$navbarHeight} + 34px);;
  }
}

// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
