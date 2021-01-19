<template>
  <div>
    <div>
      <el-link class="news_item" type="info" :underline="false">
        智能化实时营销平台建设项目获中国人民银行颁发的“银行科技发展将”
      </el-link>
      <el-link class="news_item" type="info" :underline="false">
        广东数据中心荣获上海黄金交易所颁发的“2018年度金融类会员二级系统技术支持保障工作优秀单位”称号
      </el-link>
      <el-link class="news_item" type="info" :underline="false">
        李杰同志《柜面工单流程优化项目》荣获“2019年全年标杆流程竞赛优秀奖”
      </el-link>
      <el-link class="news_item" type="info" :underline="false">
        李棋同志微课《事件应急一二三四法》荣获2019年“我是好讲师”系列大赛精品微课TOP20
      </el-link>
    </div>
    <p class="show-more">
      <el-link type="primary">查看更多>>></el-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'HoverWall'
}
</script>

<style lang="scss" scoped>
.news_item {
  display: block;
  line-height: 24px;
  font-size: 12px;

  &:before {
    content: '>';
    display: inline-block;
    width: 16px;
  }

  &:after {
    content: '';
    width: 100%;
    height: 1px;
    background-color: #e6e6e6;
    display: block;
    margin-top: 4px;
  }

  &:hover {
    &:after {
      background-color: orangered;
    }
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
