<template>
  <div>
    <el-calendar v-model="date" />
    <el-divider />
    <el-link class="notice-link" type="info" :underline="false">1.[重要通知]关于2020年9月月度版本光口变更的通知</el-link>
    <p class="show-more">
      <el-link type="primary">查看更多>>></el-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'WorkCalendar',
  data() {
    return {
      date: new Date()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-calendar {
  ::v-deep .el-calendar__header {
    padding: 6px 12px;

    .el-calendar__title {
      font-size: 14px;
    }
  }

  ::v-deep .el-calendar__body {
    padding: 0;

    table thead th {
      padding: 6px 0;
      font-size: 14px;
    }
  }

  ::v-deep .el-calendar-day {
    height: 26px;
    line-height: 26px;
    padding: 0;
    text-align: center;
    font-size: 12px;
  }

  ::v-deep .el-button {
    padding: 4px;
  }
}

.el-divider {
  margin: 12px 0;
}

.notice-link {
  line-height: 20px;

  ::v-deep .el-link--inner {
    font-size: 12px;
  }
}

.show-more {
  text-align: right;
  margin: 12px 0 0;
  .el-link {
    ::v-deep .el-link--inner {
      font-size: 12px;
    }
  }
}
</style>
