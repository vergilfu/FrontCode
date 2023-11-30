<template>
  <div style="display: flex;  justify-content: space-between;">
    <div class="timeline">
      <ul>
        <li v-for="event in events" :key="event.id">
          <div class="event-wrapper">
            <div class="event-info">
              <h2>{{ event.title }}</h2>
              <p>{{ event.description }}</p>
            </div>
            <div class="event-image">
              <img :src="event.image" alt="Event Image">
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="countdown">
      <el-col :span="10" style="margin-top: 18px;width: 100%;">
        <el-card shadow="hover" style="width: 100%;">
          <div slot="header" class="clearfix">
            <span>要有仪式感喔</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="clickFn">添加倒计时</el-button>
          </div>
          <div style="display: flex;">
            <p style="margin: 10px;">距离一起跨年还有：</p>
            <div style="margin: 10px;"> {{ countdown }}</div>
          </div>

        </el-card>
      </el-col>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      countdown: '',
      events: [
        {
          id: 1,
          title: '事件1',
          description: '这是事件1的描述',
          image: 'https://example.com/image1.jpg'
        },
        {
          id: 2,
          title: '事件2',
          description: '这是事件2的描述',
          image: 'https://example.com/image2.jpg'
        },
        {
          id: 3,
          title: '事件3',
          description: '这是事件3的描述',
          image: 'https://example.com/image3.jpg'
        }
      ]
    }
  },
  mounted() {
    this.countdown = this.getFormattedCountdown('2023-12-31')
    setInterval(() => {
      this.countdown = this.getFormattedCountdown('2023-12-31')
    }, 1000)
  },

  methods: {
    getFormattedCountdown(date) {
      const now = moment()
      const targetDate = moment(date, 'YYYY-MM-DD')
      const diff = targetDate.diff(now)
      const duration = moment.duration(diff)
      const days = Math.floor(duration.asDays())
      const hours = duration.hours()
      const minutes = duration.minutes()
      const seconds = duration.seconds()
      return `${days}天 ${hours}小时 ${minutes}分 ${seconds}秒`
    }
  }
}

</script>

<style scoped>
.timeline {
  width: 50%;
  margin-left: 5%;
}

.countdown {
  width: 35%;
  margin-right: 5%;
  margin-left: 5%;
}

.event-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
}

.event-info {
  width: 45%;
}

.event-info h2 {
  margin: 0;
}

.event-image {
  width: 53%;
}

.event-image img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}
</style>
