<template>
  <el-form ref="elForm" :key="randomKey" class="ext-edit-table" :model="model">
    <el-table ref="elTable" :data="data">
      <template v-for="(column,index) in columns">
        <template v-if="column.type === 'slot' || column.slotted || column.slotName">
          <slot :name="column.slotName || column.prop" v-bind="column" />
        </template>
        <el-table-column
          v-else
          :key="index"
          v-bind="column"
        >
          <template slot-scope="scope">
            <ext-form-item
              v-if="scope.row.edit"
              v-model="scope.row[column.prop]"
              :prop="'data.'+scope.$index+'.'+column.prop"
              :show-label="false"
              inline-error
              v-bind="column"
            />
            <span v-else v-html="scope.row[column.prop]" />
          </template>
        </el-table-column>
      </template>
    </el-table>
  </el-form>
</template>

<script>
export default {
  name: 'ExtEditTable',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      model: {},
      randomKey: 19921004
    }
  },
  watch: {
    data: {
      handler(data) {
        this.model = { data }
      },
      deep: true,
      immediate: true
    },
    columns: {
      handler() {
        this.randomKey = Math.max(this.randomKey + 1, 19921004)
      },
      deep: true
    }
  },
  methods: {
    validate(args) {
      this.$refs.elForm.validate(args)
    },
    validateField(args) {
      this.$refs.elForm.validateField(args)
    },
    resetFields(args) {
      this.$refs.elForm.resetFields(args)
    },
    clearValidate(args) {
      this.$refs.elForm.clearValidate(args)
    }
  }
}
</script>

<style lang="scss" scoped>
.ext-edit-table {
  ::v-deep .ext-inline-error {
    margin-bottom: 0;
  }
}
</style>
