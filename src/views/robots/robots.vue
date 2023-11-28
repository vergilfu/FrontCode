<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-container>
      <el-main>


        <!-- <div ref="chatbox" class="chatbox">
          <div v-for="message in messages" :key="message.id" class="message">
            {{ message.content }}
          </div>
          <input v-model="newMessage" type="text" placeholder="请输入消息" @keyup.enter="sendMessage">
        </div> -->
        <div ref="chatbox">
          <p v-for="(item, index) in concatenatedString">{{ item }}</p>
        </div>

        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <el-button type="primary" @click="sendmsg"></el-button>


      </el-main>
    </el-container>
  </el-form>
</template>

<script>
import axios from 'axios'
import { constants } from 'fs'



export default {
  data() {
    return {
      activeNames: [''],
      formInline: {
        user: '',
        region: ''
      },
      concatenatedString: ['机器人的回答：'],
      input: '',
      websocket: null,
    }
  },

  created() {
    this.websocket = new WebSocket('ws://172.20.200.121:8090'); // 替换为你的WebSocket地址
    this.websocket.onmessage = (event) => {
      let data = event.data
      // 在接收到事件时，将字符串拼接到已有的字符串上
      if (data.indexOf('\n\n') !== -1 || data.indexOf('\n') !== -1) {
        const list = data.split(/\n\n|\n/);
        let totallength = this.concatenatedString.length - 1
        this.concatenatedString[totallength] += list[0]
        for (let i = 1; i < list.length; i++) {
          this.concatenatedString.push(list[i])
        }
      }
      else {
        let totallength = this.concatenatedString.length - 1
        this.concatenatedString[totallength] += data
      }
    };
  },
  mounted() {
    // 滚动到最新消息
    this.$nextTick(() => {
      this.$refs.chatbox.scrollTop = this.$refs.chatbox.scrollHeight
    })
  },


  methods: {
    sendmsg() {
      this.websocket.send(JSON.stringify(this.input))
    }
  }
}
</script>

<style scoped>
.message {
  margin-bottom: 10px;
}

input {
  width: 100%;
  padding: 10px;
}
</style>
