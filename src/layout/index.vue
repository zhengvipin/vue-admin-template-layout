<template>
  <div :class="classObj" class="agree-layout">

    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />

    <template v-if="layout === 'vertical'">
      <sidebar class="sidebar-container" />
      <div class="agree-layout-container" :class="{hasTagsView:hasTagsView}">
        <div class="agree-layout-header" :class="{'fixed-header':fixedHeader}">
          <navbar />
          <tags-view v-if="hasTagsView" />
        </div>
        <div class="agree-layout-main" :class="{'hasNewsView':hasNewsView}">
          <news-view v-if="hasNewsView" />
          <app-main class="agree-layout-main-container" />
        </div>
      </div>
    </template>

    <div v-else class="agree-layout-container" :class="{hasTagsView:hasTagsView}">
      <div class="agree-layout-header" :class="{'fixed-header':fixedHeader}">
        <topbar class="topbar-container" />
        <tags-view v-if="hasTagsView" />
      </div>
      <div class="agree-layout-main" :class="{'hasNewsView':hasNewsView}">
        <news-view v-if="hasNewsView" />
        <app-main class="agree-layout-main-container" />
      </div>
    </div>

    <el-backtop />

  </div>
</template>

<script>
import { Navbar, Sidebar, Topbar, AppMain, NewsView, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    Topbar,
    AppMain,
    NewsView,
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
      hasTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader,
      hasNewsView: state => state.settings.newsView,
      layout: state => state.settings.layout
    }),
    classObj() {
      return {
        'agree-layout-vertical': this.layout === 'vertical',
        'agree-layout-horizontal': this.layout === 'horizontal',
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
