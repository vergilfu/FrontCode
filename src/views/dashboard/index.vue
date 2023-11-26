<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-container>
      <el-header style="text-align: left; font-size: 12px;height: 500px;">
        <div style="position: relative;margin-top:15px;">
          <el-carousel :interval="4000" type="card" height="450px">
            <el-carousel-item v-for="item in pictureItems" :key="item.url">
              <div>
                <img
                  style="max-width: 100%; max-height: 100%; width: auto; height: auto; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
                  :src="item.url"
                  alt="图片加载失败"
                >
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-header>

      <el-main class="horizontal-layout" style="text-align: left; padding-left: 100px;padding-left: 100px;height:380px;">

        <div style="width: 25%;height: 300px;">
          <el-card>
            <img :src="iconItems.pictureicon.url" class="card-image">
            <div class="card-content">
              <h3 class="card-title">我们的相册（浪漫时间线）</h3>
              <p class="card-text">这里展示了我们的相册哟~</p>
            </div>
          </el-card>
        </div>

        <div style="width: 25%;height: 300px;">
          <el-card>
            <img :src="iconItems.finance.url" class="card-image">
            <div class="card-content">
              <h3 class="card-title">我们的存钱罐</h3>
              <p class="card-text">一起存钱钱吧~</p>
            </div>
          </el-card>
        </div>

        <div style="width: 25%;height: 300px;">
          <el-card>
            <img :src="iconItems.roboticon.url" class="card-image">
            <div class="card-content">
              <h3 class="card-title">gpt-4.0</h3>
              <p class="card-text">给我们bb做了个机器人哟，口语陪练、写作批改等功能一应俱全，还有什么需求敲我~</p>
            </div>
          </el-card>
        </div>

      </el-main>
    </el-container>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'CardComponent',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard',
      currentDate: new Date(),
      pictureItems: [
        { url: require('@/assets/dashboard/image/1.jpg'), alt: '图片1' },
        { url: require('@/assets/dashboard/image/2.jpg'), alt: '图片2' },
        { url: require('@/assets/dashboard/image/3.jpg'), alt: '图片3' },
        { url: require('@/assets/dashboard/image/4.jpg'), alt: '图片4' },
        { url: require('@/assets/dashboard/image/5.jpg'), alt: '图片5' }
      ],
      iconItems: {
        pictureicon: { url: require('@/assets/dashboard/image/photo.jpg'), alt: '相册' },
        roboticon: { url: require('@/assets/dashboard/image/robot.jpg'), alt: '对话机器人' },
        finance: { url: require('@/assets/dashboard/image/finance.jpg'), alt: '财务' }
      }
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>

<style>
.card-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.card-content {
  padding: 10px;
}
.card-title {
  font-size: 20px;
  margin-bottom: 10px;
}
.card-text {
  font-size: 14px;
  height: 50px;
}
.horizontal-layout{
    display: flex;
    flex-direction: row;
}

.item{
    flex: 1;
    padding: 10px;
}
</style>
