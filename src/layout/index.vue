<template>
  <div :class="classObj" class="app-wrapper">

    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />

    <div v-if="layout === 'vertical'" class="layout-container-vertical">
      <sidebar class="sidebar-container" />
      <div class="main-container" :class="{hasTagsView:needTagsView}">
        <div class="app-header" :class="{'fixed-header':fixedHeader}">
          <navbar />
          <tags-view v-if="needTagsView" />
        </div>
        <div class="app-main">
          <vab-ad v-if="vadAd" />
          <app-main />
        </div>
      </div>
    </div>

    <div v-else class="layout-container-horizontal">
      <div :class="{hasTagsView:needTagsView}" class="main-container">
        <div class="app-header" :class="{'fixed-header':fixedHeader}">
          <vab-top-bar class="topbar-container" />
          <tags-view v-if="needTagsView" />
        </div>
        <div class="app-main">
          <vab-ad v-if="vadAd" />
          <app-main />
        </div>
      </div>
    </div>

    <el-backtop />

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
    return { oldLayout: undefined }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader,
      vadAd: state => state.settings.vadAd,
      layout: state => state.settings.layout
    }),
    classObj() {
      return {
        hideSidebar: this.layout === 'vertical' && !this.sidebar.opened,
        openSidebar: this.layout === 'vertical' && this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted() {
    this.oldLayout = this.layout
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
            key: 'layout',
            value: 'vertical'
          })
        } else {
          this.$store.dispatch('settings/changeSetting', {
            key: 'layout',
            value: this.oldLayout
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

</style>
