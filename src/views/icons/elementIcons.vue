<template>
  <div class="icon-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-divider content-position="left">点击图标即可复制源码</el-divider>
      </el-col>
      <el-col :span="24">
        <el-form :inline="true" label-width="80px" @submit.native.prevent>
          <el-form-item label="图标名称">
            <el-input v-model="queryForm.title" />
          </el-form-item>
          <el-form-item label-width="0">
            <el-button native-type="submit" type="primary" @click="queryData">
              搜索
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col
        v-for="(item, index) in queryIcon"
        :key="index"
        :xs="6"
        :sm="8"
        :md="3"
        :lg="2"
        :xl="2"
      >
        <el-tooltip placement="top">
          <div slot="content">
            {{ generateIconCode(item) }}
          </div>
          <el-card
            shadow="hover"
            style="cursor: pointer"
            @click.native="handleClipboard(generateIconCode(item),$event)"
          >
            <i :class="'el-icon-' + item" />
          </el-card>
        </el-tooltip>
        <div class="icon-text">{{ item }}</div>
      </el-col>
      <el-col :span="24">
        <el-pagination
          :background="background"
          :current-page="queryForm.currentPage"
          :page-size="queryForm.pageSize"
          :page-sizes="[72, 144, 216, 288]"
          :layout="layout"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import elementIcons from '@/views/icons/element-icons'
import clipboard from '@/utils/clipboard'

export default {
  name: 'AwesomeIcon',
  data() {
    return {
      layout: 'total, sizes, prev, pager, next, jumper',
      total: 0,
      background: true,
      height: 0,
      selectRows: '',
      elementLoadingText: '正在加载...',
      queryIcon: [],
      queryForm: {
        currentPage: 1,
        pageSize: 72,
        title: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    generateIconCode(symbol) {
      return `<i class="el-icon-${symbol}" />`
    },
    handleClipboard(text, event) {
      clipboard(text, event)
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.queryForm.currentPage = val
      this.fetchData()
    },
    queryData() {
      this.queryForm.currentPage = 1
      this.fetchData()
    },
    async fetchData() {
      const { currentPage, pageSize, title } = this.queryForm
      const mockList = elementIcons.filter((item) => !(title && item.indexOf(title) < 0))
      this.queryIcon = mockList.filter((item, index) => index < pageSize * currentPage && index >= pageSize * (currentPage - 1))
      this.total = elementIcons.length
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-container {
  ::v-deep {
    .el-card{
      margin-bottom: 15px;
      .el-card__body {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center; /* 垂直居中 */
        justify-content: center; /* 水平居中 */

        svg:not(:root).svg-inline--fa {
          font-size: 18px;
          color: rgba(0, 0, 0, 0.65);
          text-align: center;
          vertical-align: middle;
          pointer-events: none;
          cursor: pointer;
        }
      }
    }
  }

  .icon-text {
    height: 30px;
    margin-top: -15px;
    overflow: hidden;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
