<template>
  <div>
    <div class="monthly-goal">
      <div style="width: 5%;display: inline-block" />
      <div style="display: inline-block">
        <h3>每月存钱小目标</h3>
        <ul>
          <li v-for="goal in goals" :key="goal">{{ goal }}</li>
        </ul>
      </div>
    </div>
    <div class="piggy-bank" @click="shakePiggyBank">
      <img src="./piggybank.png" :class="{ 'shake': isShaking }" alt="Piggy Bank">
    </div>
    <div class="monthly-report">
      <div style="width: 5%;display: inline-block" />
      <div style="display: inline-block">
        <h3>每月支出月报</h3>
        <ul>
          <li v-for="report in reports" :key="report">{{ report }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShaking: false,
      goals: ['100 元', '200 元', '300 元'], // 使用者自定义每月存钱目标
      reports: ['50 元', '150 元', '100 元'] // 使用者自定义每月支出月报
    }
  },

  methods: {
    shakePiggyBank() {
      this.isShaking = true
      setTimeout(() => {
        this.isShaking = false
      }, 500)
    }
  }
}

</script>
<style>
.piggy-bank {
  display: inline-block;
  width: 30%;
  margin-right: 10%;
}

.shake {
  animation: shake 0.5s;
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(-5deg);
  }

  50% {
    transform: rotate(0deg);
  }

  75% {
    transform: rotate(5deg);
  }

  100% {
    transform: rotate(0deg);
  }
}

.monthly-goal {
  display: inline-block;
  width: 25%;
  height: 80%;
  margin-left: 5%;
  background-color: #ADD8E6;
}

.monthly-report {
  display: inline-block;
  width: 25%;
  height: 80%;
  background-color: #ADD8E6;

}

ul {
  padding: 0;
}

li {
  margin-bottom: 10px;
}
</style>
