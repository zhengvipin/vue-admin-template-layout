<template>
  <div class="dashboard-container">
    <el-card header="更新日志">
      <el-timeline>
        <el-timeline-item
          v-for="(activity,index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
          placement="top"
        >
          <h4>{{ activity.title }}</h4>
          <div v-html="activity.content" />
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      activities: [
        {
          timestamp: '2021/01/21 12:16',
          title: '修复 “s.readdirSync is not a function”',
          content: `
            去除 mock/index.js 中利用 node 内置 fs 模块批量加载 js 的代码,也无法使用 webpack 环境独有的 require.context 方法加载，暂时没有想到替代方法，这是由于生产包部署在 tomcat 缺乏 node 环境
          `
        },
        {
          timestamp: '2021/01/21 19:04',
          title: '优化 markdown 加载方式',
          content: `
            <ul>
             <li>抽离 loader 包 md-loader</li>
             <li>解决同一 md 中重名变量赋值覆盖 bug</li>
             <li>只在 development 环境中加载 md</li>
            </ul>
          `
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .el-timeline-item__content {
    > h4 {
      margin: 8px 0;
    }

    > div {
      line-height: 24px;

      ul {
        padding: 0 16px;
      }
    }
  }
}
</style>
