<template>
  <div class="news-view-container">
    <el-carousel
      v-if="adList"
      height="30px"
      direction="vertical"
      :autoplay="true"
      :interval="3000"
      indicator-position="none"
    >
      <el-carousel-item v-for="(item, index) in adList" :key="index">
        <el-tag type="warning">News</el-tag>
        <a target="_blank" :href="item.url">{{ item.title }}</a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { getList } from '@/api/ad'

export default {
  name: 'NewsView',
  data() {
    return {
      nodeEnv: process.env.NODE_ENV,
      adList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const { data } = await getList()
      this.adList = data
    }
  }
}
</script>
<style lang="scss" scoped>
.news-view-container {
  height: $news-view-height;
  padding-right: $base-padding;
  padding-left: $base-padding;
  margin-bottom: -$layout-main-container-margin;
  line-height: $news-view-height;
  cursor: pointer;

  a {
    color: #999;
  }
}
</style>
