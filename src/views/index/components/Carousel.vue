<template>
  <div class="my-carousel-container">
    <el-carousel>
      <el-carousel-item v-for="(item,index) in carousels" :key="index">
        <el-image :src="item.url" fit="fill" />
        <h4>{{ item.title }}</h4>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import carousel_01 from '@/assets/index_images/Carousel/carousel_01.jpg'
import carousel_02 from '@/assets/index_images/Carousel/carousel_02.jpg'

export default {
  name: 'Carousel',
  data() {
    return {
      carousels: [
        { url: carousel_01, title: '数据中心集中采购业务专项巡视整改工作简报' },
        { url: carousel_02, title: '广发银行XX分行行长XXX一行考察XXX' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 300px;

.my-carousel-container {
  box-sizing: border-box;
  padding: 20px;
  background-color: #fff;
  height: $height;

  ::v-deep .el-carousel__container {
    height: calc(#{$height} - 40px);

    .el-image {
      width: 100%;
      height: calc(#{$height} - 70px);
    }

    h4 {
      text-align: center;
      margin: 0;
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>
