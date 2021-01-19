<template>
  <el-tabs class="top-right" tab-position="left">
    <el-tab-pane>
      <template #label>
        <el-image class="icon" :src="tab_msg"/>
        <span class="label">重要通知</span>
      </template>
      <el-link class="news_item" type="info" :underline="false">总行数据中心党支部联合肇庆分行运营科技部党支...<i>2020.10.27</i>
      </el-link>
      <el-link class="news_item" type="info" :underline="false">数据中心集中采购业务专项巡视整改工作简报(第2...<i>2020.10.13</i>
      </el-link>
      <el-link class="news_item" type="info" :underline="false">系统管理员处党支部与应用维护处党支部联合开展...<i>2020.09.01</i>
      </el-link>
      <el-link class="news_item" type="info" :underline="false">数据中心集中采购业务专项巡视整改工作简报(第2...<i>2020.10.13</i>
      </el-link>
      <el-link class="news_item" type="info" :underline="false">数据中心支部开展《中国人寿党员应知应会》知识...<i>2020.08.21</i>
      </el-link>
      <el-link class="news_item" type="info" :underline="false">数据中心开展“缅怀革命先烈，争当当代先锋”党...<i>2020.08.19</i>
      </el-link>
      <p class="show-more">
        <el-link type="primary">查看更多>>></el-link>
      </p>
    </el-tab-pane>
    <el-tab-pane>
      <template #label>
        <el-image class="icon" :src="tab_party"/>
        <span class="label">党建园地</span>
      </template>
      党建园地
    </el-tab-pane>
    <el-tab-pane>
      <template #label>
        <el-image class="icon" :src="tab_fun"/>
        <span class="label">快乐运行</span>
      </template>
      快乐运行
    </el-tab-pane>
    <el-tab-pane>
      <template #label>
        <el-image class="icon" :src="tab_guide"/>
        <span class="label">培训园地</span>
      </template>
      培训园地
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import tab_msg from '@/assets/index_images/Tabs/tab_msg.png'
import tab_party from '@/assets/index_images/Tabs/tab_party.png'
import tab_fun from '@/assets/index_images/Tabs/tab_fun.png'
import tab_guide from '@/assets/index_images/Tabs/tab_guide.png'

export default {
  name: 'Tabs',
  data() {
    return {
      tab_msg: tab_msg,
      tab_party: tab_party,
      tab_fun: tab_fun,
      tab_guide: tab_guide
    }
  }
}
</script>

<style lang="scss" scoped>
$topHeight: 300px;
$contentBg: #fff;

@mixin box {
  box-sizing: border-box;
  padding: 20px;
  background-color: $contentBg;
}

@mixin news_item($lineHeight: 46px,$underline: true) {
  display: block;
  height: $lineHeight;
  line-height: $lineHeight/2;

  &:before {
    content: '>';
    display: inline-block;
    width: 20px;
  }

  @if $underline == true {
    &:after {
      content: '';
      width: 100%;
      height: 1px;
      background-color: #e6e6e6;
      display: block;
    }
  }

  &:hover {
    &:after {
      background-color: orangered;
    }
  }
}

@mixin show_more($marginTop: 0) {
  text-align: right;
  margin: $marginTop 0 0;
}

.top-right {

  @include box;
  height: $topHeight;

  .news_item {
    @include news_item;
  }

  ::v-deep .el-tabs__active-bar {
    background-color: #f44336;
    width: 3px;
  }

  ::v-deep .el-tabs__item {
    height: 60px;
    line-height: 60px;

    .el-image {
      width: 30px;
      height: 30px;
      vertical-align: middle;
    }

    .label {
      font-size: 18px;
    }
  }

  .show-more {
    @include show_more
  }
}
</style>
