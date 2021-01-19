<template>
  <div>
    <div class="search-container">
      <el-input />
      <el-button type="danger">搜 索</el-button>
    </div>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="service-item-container">
          <div v-for="(item,index) in images" :key="index" class="service-item">
            <img :src="item.url" alt="item.title">
            <span v-text="item.title" />
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="my">
          <div class="my-title">
            <i class="el-icon-document-checked" />
            <span>我的</span>
          </div>
          <div class="my-content">
            <div>
              <span>待办</span>
              <span class="my-content-number">2</span>
              <span>个</span>
            </div>
            <div>
              <span>请求</span>
              <span class="my-content-number">1</span>
              <span>个</span>
            </div>
          </div>
        </div>
        <div class="joinus">
          <div class="joinus-title">
            <svg-icon icon-class="wechat" />
            <span>联系我们</span>
          </div>
          <div class="joinus-content">
            <el-link type="info" :underline="false">两地三中心ECC值班电话</el-link>
            <el-link type="info" :underline="false">数据中心人员通讯录</el-link>
            <el-link type="info" :underline="false">数据提取专岗通讯录</el-link>
            <el-link type="info" :underline="false">数据中心系统分工表</el-link>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="service-comment">
      <label> 服务评价：
        <el-rate />
      </label>
      <el-button>提交</el-button>
      <el-link type="info">我要提意见</el-link>
    </div>
  </div>
</template>

<script>
import USER_PNG from '@/assets/index_images/ServiceMenu/user.png'
import FETCH_PNG from '@/assets/index_images/ServiceMenu/fetch.png'
import FAULT_PNG from '@/assets/index_images/ServiceMenu/fault.png'
import NET_PNG from '@/assets/index_images/ServiceMenu/net.png'
import PARAM_PNG from '@/assets/index_images/ServiceMenu/param.png'
import MORE_PNG from '@/assets/index_images/ServiceMenu/more.png'

export default {
  name: 'ServiceMenu',
  data() {
    return {
      images: [
        { title: '用户提取', url: USER_PNG },
        { title: '数据提取', url: FETCH_PNG },
        { title: '参数维护', url: PARAM_PNG },
        { title: '业务差错', url: FAULT_PNG },
        { title: '网络申请', url: NET_PNG },
        { title: '网络申请', url: NET_PNG },
        { title: '网络申请', url: NET_PNG },
        { title: '网络申请', url: NET_PNG },
        { title: '网络申请', url: NET_PNG },
        { title: '网络申请', url: NET_PNG },
        { title: '网络申请', url: NET_PNG },
        { title: '更多服务', url: MORE_PNG }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.search-container {
  .el-input {
    width: 50%;

    ::v-deep .el-input__inner {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  .el-button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    ::v-deep span {
      color: #000;
    }
  }
}

.service-item-container {
  display: flex;
  flex-wrap: wrap;

  .service-item {
    box-sizing: border-box;
    width: 25%;
    text-align: center;
    margin: 8px 0;

    span {
      display: block;
      font-size: 14px;
    }
  }
}

.my {
  border: 1px solid #d3d3d3;
  padding: 6px;
  font-size: 14px;

  .my-title {
    line-height: 30px;

    i {
      color: #f44336;
      font-size: 26px;
      margin-right: 6px;
    }
  }

  .my-content {
    display: flex;
    justify-content: space-between;

    .my-content-number {
      font-size: 20px;
      margin: 0 4px;
    }
  }
}

.joinus {
  margin-top: 4px;
  border: 1px solid #d3d3d3;
  padding: 6px;
  font-size: 14px;

  .joinus-title {

    line-height: 30px;

    .svg-icon {
      color: #f44336;
      font-size: 26px;
      margin-right: 6px;
    }
  }

  .joinus-content {
    .el-link {
      display: block;
      height: 26px;
      line-height: 26px;
      font-size: 12px;
      overflow: hidden; /*内容超出后隐藏*/
      text-overflow: ellipsis; /* 超出内容显示为省略号*/
      white-space: nowrap; /*文本不进行换行*/
      &:before {
        content: '>';
        display: inline-block;
        width: 12px;
      }
    }
  }
}

.service-comment{
  margin-top: 20px;
  .el-rate{
    display: inline-block;
  }

  .el-button{
    margin: 0 20px;
  }

  ::v-deep .el-link{
    text-decoration: underline;
  }
}
</style>
