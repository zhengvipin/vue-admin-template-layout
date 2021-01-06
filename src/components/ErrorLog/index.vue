<template>
  <div v-if="errorLogs.length>0">
    <el-badge :is-dot="true" style="line-height: 25px;" @click.native="dialogTableVisible=true">
      <svg-icon icon-class="bug" />
    </el-badge>

    <el-dialog :visible.sync="dialogTableVisible" width="80%" append-to-body :lock-scroll="false">
      <div slot="title">
        <span style="padding-right: 10px;">错误日志</span>
        <el-button size="mini" type="primary" icon="el-icon-delete" @click="clearAll">清空日志</el-button>
      </div>
      <el-table :data="errorLogs" border>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-alert type="error" show-icon :closable="false">
              <div v-html="formatError(props.row.err.stack)" />
            </el-alert>
          </template>
        </el-table-column>
        <el-table-column label="报错路由">
          <template slot-scope="{row}">
            <el-tag type="success">{{ row.url }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="错误信息">
          <template slot-scope="{row}">
            <el-tag type="danger">
              {{ row.err.message }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="错误描述">
          <template slot-scope="{row}">
            <el-tag type="warning">
              {{ row.vm.$vnode.tag }} error in {{ row.info }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ErrorLog',
  data() {
    return {
      dialogTableVisible: false
    }
  },
  computed: {
    errorLogs() {
      return this.$store.getters.errorLogs
    }
  },
  methods: {
    clearAll() {
      this.dialogTableVisible = false
      this.$store.dispatch('errorLog/clearErrorLog')
    },
    formatError(value) {
      if (!value) return ''
      value = value.toString()
      const atArr = value.split(/\bat\b/)
      let result = ''
      atArr.forEach((item, index) => {
        result += index > 0 ? `<p class="error-stack with-index-2em">at ${item}</p>` : `<p class="error-stack">${item}</p>`
      })
      return result
    }
  }
}
</script>

<style scoped>
.message-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  padding-right: 8px;
}

::v-deep .error-stack {
  margin: 0;
  line-height: 20px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

::v-deep .error-stack.with-index-2em {
  text-indent: 2em;
}
</style>
