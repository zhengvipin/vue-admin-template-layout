<template>
  <div v-if="errorLogs.length>0">
    <el-badge :is-dot="true" style="line-height: 25px;" @click.native="dialogTableVisible=true">
      <svg-icon icon-class="bug" />
    </el-badge>

    <el-dialog :visible.sync="dialogTableVisible" width="90%" append-to-body :lock-scroll="false">
      <div slot="title">
        <span style="padding-right: 10px;">错误日志</span>
        <el-button size="mini" type="primary" icon="el-icon-delete" @click="clearAll">清空日志</el-button>
      </div>
      <el-table :data="errorLogs" border>
        <el-table-column type="expand">
          <template slot-scope="{row}">
            <el-alert type="error" :closable="false" class="error-alert">
              <div v-if="row.type === componentType" v-html="formatError(row.stack)" />
              <pre v-else class="error-stack" v-text="row.stack" />
            </el-alert>
          </template>
        </el-table-column>
        <el-table-column label="错误类型" width="106px">
          <template slot-scope="{row}">
            <el-tag type="info">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="报错路由">
          <template slot-scope="{row}">
            <el-alert type="success" :closable="false" class="error-alert">
              {{ row.url }}
            </el-alert>
          </template>
        </el-table-column>
        <el-table-column label="错误消息">
          <template slot-scope="{row}">
            <el-alert type="error" :closable="false" class="error-alert">
              {{ row.message }}
            </el-alert>
          </template>
        </el-table-column>
        <el-table-column label="错误提示">
          <template slot-scope="{row}">
            <el-alert type="warning" :closable="false" class="error-alert">
              {{ row.info }}
            </el-alert>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { COMPONENT } from '@/utils/handleErrorLog'

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
    componentType: COMPONENT,
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

::v-deep .error-alert {
  padding: 0;
}

::v-deep .error-alert .el-alert__description{
  margin: 2px 0;
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
