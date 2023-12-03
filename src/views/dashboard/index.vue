<template >
  <div class="background">
    <el-form :inline="true" class="demo-form-inline">
      <el-container>
        <el-header style="text-align: left; font-size: 12px;height: 450px;margin-right:3%;">
          <div style="position: relative;margin-top:15px;margin-botton:15px">
            <el-carousel :interval="4000" type="card" height="430px" class="transparent-carousel">
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

        <el-main class="horizontal-layout">
          <div class="main-con">
              <div class="card-con">
                <el-card class="card-div">
                  <img :src="iconItems.pictureicon.url" class="card-image">
                  <div class="card-content">
                    <h3 class="card-title">我们的相册（浪漫时间线）</h3>
                    <p class="card-text">这里展示了我们的相册哟~</p>
                  </div>
                </el-card>
              </div>

              <div class="card-con">
                <el-card class="card-div">
                  <img :src="iconItems.finance.url" class="card-image">
                  <div class="card-content">
                    <h3 class="card-title">我们的存钱罐</h3>
                    <p class="card-text">一起存钱钱吧~</p>
                  </div>
                </el-card>
              </div>

              <div class="card-con">
                <el-card class="card-div">
                  <img :src="iconItems.roboticon.url" class="card-image">
                  <div class="card-content">
                    <h3 class="card-title">对话机器人</h3>
                    <p class="card-text">给我们bb做了个机器人哟，上传文件、写作批改、ppt等功能一应俱全，还有什么需求敲我~</p>
                  </div>
                </el-card>
              </div>

              <div class="card-con">
                <el-card class="card-div">
                  <img :src="iconItems.voice.url" class="card-image">
                  <div class="card-content">
                    <h3 class="card-title">智能语音</h3>
                    <p class="card-text">可以和GPT实时对话，锻炼英语口语哦~</p>
                  </div>
                </el-card>
              </div>

            </div>
        </el-main>
      </el-container>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import adminDashboard from "./admin";
import editorDashboard from "./editor";

export default {
  name: "CardComponent",
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: "adminDashboard",
      currentDate: new Date(),
      pictureItems: [
        { url: require("@/assets/dashboard/image/1.jpg"), alt: "图片1" },
        { url: require("@/assets/dashboard/image/2.jpg"), alt: "图片2" },
        { url: require("@/assets/dashboard/image/3.jpg"), alt: "图片3" },
        { url: require("@/assets/dashboard/image/4.jpg"), alt: "图片4" },
        { url: require("@/assets/dashboard/image/5.jpg"), alt: "图片5" }
      ],
      iconItems: {
        pictureicon: {
          url: require("@/assets/dashboard/image/photo.jpg"),
          alt: "相册"
        },
        roboticon: {
          url: require("@/assets/dashboard/image/robot.jpg"),
          alt: "对话机器人"
        },
        finance: {
          url: require("@/assets/dashboard/image/finance.jpg"),
          alt: "财务"
        },
        voice: {
          url: require("@/assets/dashboard/image/voice.jpg"),
          alt: "语音"
        }
      }
    };
  },
  computed: {
    ...mapGetters(["roles"])
  },
  created() {
    if (!this.roles.includes("admin")) {
      this.currentRole = "editorDashboard";
    }
  }
};
</script>

<style>
.transparent-carousel {
  background-color: rgba(0,0,0, 0) !important;
}

.background {
  background: url("~@/assets/dashboard/image/background2.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}

.horizontal-layout {
  height: 450px;
  width: 100%;
}

.main-con {
  margin-left: 1%;
  margin-right: 3%;
  padding:2%;
  background-color: rgba(255,255,255, 0.24);
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.37);
  display: flex;
  flex-direction: row;
  text-align: left;
}


.card-con {
  width: 20%;
  height: 300px;
  background-color: rgba(255,255,255, 0.24);
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.37);
  margin-left: 0.5%;
  margin-right: 0.5%;
  transition: 0.2s;
}
.card-con:hover {
    background-color: rgba(255,255,255, 0.5);
    transform: scale(1.1);
    box-shadow: 0px 8px 32px 0 rgba(0 ,0,0, 0.37);
    color:#fff;
}

.card-div {
  background-color: rgba(0, 0, 0, 0);
  border: none;
}

/* .card-div :hover {
  opacity: 0.8;
} */
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
  color: white;
}
.card-text {
  font-size: 14px;
  height: 50px;
  color: white;
}

.item {
  flex: 1;
  padding: 10px;
}
</style>
