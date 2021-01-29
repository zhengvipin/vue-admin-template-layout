<template>
  <div class="app-container">
    <ext-toolbar v-bind="toolbar" align="right" />
    <ext-edit-table ref="ruleTable" :data="data" :columns="columns">
      <template #operate="props">
        <el-table-column v-bind="props">
          <template slot-scope="scope">
            <el-button
              @click="handleEdit(scope.row)"
            >编辑
            </el-button>
            <el-button
              type="danger"
              @click="handleRemove(scope.$index)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </template>
    </ext-edit-table>
  </div>
</template>

<script>
import ExtEditTable from './ext-edit-table'

export default {
  components: {
    ExtEditTable
  },
  data() {
    return {
      toolbar: {
        group: true,
        buttons: [
          {
            name: '切换禁用状态',
            type: 'primary',
            handler: () => {
              this.columns.forEach(item => {
                this.$set(item, 'readonly', !item.readonly)
              })
            }
          },
          {
            name: '尝试表单校验',
            type: 'primary',
            handler: () => {
              // console.log(this.$refs['ruleTable'])
              this.$refs['ruleTable'].validate((valid) => {
                console.log(valid)
                if (valid) {
                  this.$message(JSON.stringify(this.data))
                } else {
                  console.log('error submit!!')
                  return false
                }
              })
            }
          }
        ]
      },
      data: [
        {
          id: 'A1',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 'A2',
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          id: 'A3',
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          id: 'A4',
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      columns: [
        { label: 'ID', prop: 'id' },
        { label: '日期', prop: 'date', type: 'date', required: true },
        { label: '姓名', prop: 'name', type: 'input', required: true },
        { label: '地址', prop: 'address', type: 'input', required: true },
        { label: '操作', prop: 'operate', type: 'slot' }
      ]
    }
  },
  methods: {
    handleEdit(row) {
      this.$set(row, 'edit', !row.edit)
    },
    handleRemove(index) {
      this.data.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
